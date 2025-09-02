const e=`This blog is adapted from a presentation I gave in my CS 598: Hot Topics in Data Management class at UIUC, where I dove into the CacheBlend paper — a fascinating approach to reducing time-to-first-token in RAG systems by rethinking KV cache reuse.

When we talk about serving large language models (LLMs) efficiently, one name that always comes up is vLLM. It’s an engine built on the idea that GPUs are precious and memory should never go to waste. But when I started looking at how RAG (retrieval-augmented generation) workloads behave, I realized that memory wasn’t the only bottleneck. Time-to-first-token (TTFT) — the delay before you see the first generated word — can be just as painful. And the culprit is often something hiding in plain sight: the KV cache.

Setting the stage: RAG and KV caches

Let’s rewind for a moment.

RAG works by stuffing your query and a bunch of retrieved document chunks into the LLM prompt, so the model can reason over external knowledge. It’s powerful, but prompts can easily blow up to thousands of tokens.

Now, every transformer layer stores keys and values (KV) for every token it sees. That way, when the model generates the next token, it can attend back without recomputing everything. This KV cache is the reason generation is efficient. But it’s big. Really big. In a 30B-parameter model, each token’s KV can be nearly a megabyte. Multiply that by a couple thousand tokens, and suddenly a single request is hogging gigabytes of memory.

[placeholder: diagram showing how Q/K/V are produced per token, with KV stored in the cache]

So far so good: we need KV caches to make autoregressive generation work. But in RAG, the prefill phase (processing the entire input before the first output token) becomes the real headache. For long inputs, prefill can eat seconds of compute, and users sit staring at a blank screen waiting for the first word. That’s TTFT, and it’s where the pain shows.

My first thought: why not reuse KV?

If the model has already computed the KV for a document chunk once, why recompute it every time? In RAG, the same chunks show up in multiple queries. It feels obvious: cache the cache. Store the KV for those chunks, and just plug them back in later. Problem solved, right?

Well… not quite.

The problem is that attention is layered. The KV at layer 2 isn’t independent — it’s built from the outputs of attention in layer 1. If I paste a cached chunk’s KV into a new context, I’m pretending that chunk never needed to attend to the query or the other chunks that came before it. Cross-attention vanishes.

Here’s an example:

Question: “How did the French Revolution affect peasants?”

Retrieved chunk line (cached): “The French Revolution significantly affected the peasants by abolishing feudal dues and redistributing land.”

If I reuse the cached KV blindly, the model might output:

“The French Revolution affected the peasants. The French Revolution significantly affected the peasants by abolishing feudal dues and redistributing land.”

Notice what happened? It simply parrots the cached chunk, treating it as if it lives in isolation. The answer looks fine on the surface but doesn’t actually connect back to the question being asked.

But if the KV cache were recomputed while attending to the query, the answer could instead look like:

“The French Revolution affected peasants by abolishing feudal dues and redistributing land, which gave them more economic independence and political voice.”

Now the answer is cohesive — it merges the question and the chunk into a meaningful response. That’s what proper cross-attention buys us, and it’s exactly what blind KV reuse destroys.

[placeholder: diagram contrasting prefix caching (safe) vs non-prefix reuse (breaks cross-attention because layer dependencies are ignored)]

So what’s the right question to ask?

The natural question became:

Do I really need to recompute all tokens in all layers to recover quality?

Or can I get away with recomputing just enough to restore the cross-attention I lost?

That’s where the key insight behind CacheBlend comes in.

The idea: selective KV recompute

Instead of choosing between two extremes — full reuse (fast but wrong) and full recompute (slow but right) — CacheBlend picks the middle ground: selective recompute.

Here’s how it works. Not every token in a chunk is equally important. A small subset of “bridge tokens” are the ones that need to cross-attend strongly to the query or earlier chunks. If I recompute just those tokens in the new context, they get updated KV values that “carry” context into the chunk. Once those are in place, the rest of the tokens can safely reuse cached values without losing information.

This is huge: by recomputing only ~5–18% of tokens, CacheBlend preserves almost the same output quality as if it had recomputed everything.

[placeholder: diagram showing gradual filtering — recompute a small subset of tokens per layer, reuse the rest]

How do we pick these bridge tokens?

Naively, to identify the high KV deviation (HKVD) tokens, you’d have to first run a full recompute of every layer to measure which tokens’ KVs diverge the most. But that completely defeats the purpose — you’d already be paying the full recompute cost!

The trick is this: CacheBlend does a full KV recompute for only the first layer. That’s the one time we pay the full price. From that layer, we identify the HKVD tokens — the tokens whose cached KVs deviate most from what a full recompute would produce.

And here’s the insight: tokens with the highest deviations on one layer are very likely to stay the highest-deviation tokens on the next layer too. In other words, “important” tokens remain important across layers.

That means we don’t need to do full recompute at every step. Instead, CacheBlend applies a gradual filtering scheme:

Start with the HKVD set from layer 1.

On each new layer, recompute only a percentage of those, narrowing it down further.

By the top layers, you’re recomputing just a tiny fraction of tokens, but they’re the ones that really matter.

This avoids expensive recompute everywhere while still preserving the critical cross-attention links.

[placeholder: diagram “Do we need to recompute KV for most tokens? In all layers??” with gradual filtering highlighted]

System design: hiding recompute with clever pipelining

Even if I’m recomputing just a few tokens, it still adds some latency. The clever trick CacheBlend uses is to hide that recompute under I/O.

Here’s the idea: while the model is recomputing HKVD tokens for layer ℓ, the system is simultaneously streaming the cached KV for layer ℓ+1 from storage (CPU memory or even SSD) into GPU memory. If the recompute finishes before the I/O is done, the delay is effectively invisible.

This introduces a new knob: the recompute ratio. If I recompute too few tokens, quality drops. If I recompute too many, the pipeline stalls because recompute now takes longer than the I/O. The sweet spot depends on the storage device (GPU vs CPU vs SSD) and the LLM’s size (larger models take longer per token, which actually gives more room to hide I/O).

That’s a beautiful systems-meets-ML insight: you’re not just choosing recompute ratio for accuracy, but also to balance with your storage throughput.

[placeholder: diagram showing CacheBlend pipeline timeline — recompute overlapping with KV load, with “best recompute ratio” annotated]

What the results show

The paper’s evaluation highlights three big takeaways:

TTFT drops by 2–3×. The first token shows up much faster compared to full recompute.

Throughput increases by 2.8–5×. GPUs can serve way more RAG queries per second.

Quality barely changes. Metrics like F1 and Rouge-L are almost identical to full recompute — but far, far better than full reuse, which just ignores cross-attention.

And these improvements hold across models of different sizes and across different RAG setups (varying number of chunks and chunk lengths). That shows the approach is robust, not a one-off trick.

[placeholder: evaluation charts comparing TTFT and quality across baselines vs CacheBlend]

Wrapping it all up

Here’s how I’d sum up CacheBlend in one line: reuse cached knowledge anywhere in the prompt by recomputing just enough tokens to restore cross-attention — then hide even that recompute under I/O.

For RAG, that’s a game-changer. It means answers arrive faster, GPUs handle more queries, and users don’t suffer through broken, context-blind generations. And all it took was rethinking what really needs to be recomputed, and when.

Sometimes the best optimizations come from realizing you don’t need to do everything — just the parts that actually matter.

[placeholder: final end-to-end diagram — query + retrieved chunks → cache lookup → selective recompute → pipeline → fast generation]`;export{e as default};
