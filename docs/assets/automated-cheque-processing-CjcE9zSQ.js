const e=`Teaching Machines to Verify Cheques: My Journey with Siamese Networks

A while back, I had the chance to publish my first research paper: “Automated Cheque Processing Through Data Verification and Siamese Networks.” It was presented at MCMI 2020 and later published in Springer’s Lecture Notes in Electrical Engineering .

In this blog, I want to walk you through that work — why we did it, the technical guts of how it works, and what I learned while building it. Think of this as me retelling the paper in a way that’s less “academic journal” and more “grab a coffee and let’s talk deep learning.”

Why cheque verification?

Even in an increasingly digital world, cheques are still widely used for transactions. But manual verification is:

Time-consuming

Error-prone

Vulnerable to fraud

We wanted to automate this process — both to speed things up and to reduce risk. But cheque verification isn’t just about OCR’ing numbers. You’ve got to handle handwriting, noisy backgrounds, mismatched fonts, and in some cases even tampering.

That’s where machine learning comes in.

Siamese Networks: One-shot learning for the rescue

The classic problem in cheque processing is: how do you know if the handwritten signature, amount in words, or cheque ID matches what it’s supposed to?

You can’t just train a classifier on every possible person’s handwriting — there are millions of people and infinite handwriting variations. Instead, you need a way for the model to say: “Are these two samples the same or not?”

That’s exactly what Siamese Networks do.

[placeholder: diagram of Siamese Network — two identical CNNs feeding into a similarity score]

A Siamese Network consists of two identical subnetworks (same weights, same architecture). Each input goes through its subnetwork, and at the end, you compute a distance metric (like Euclidean distance) between the embeddings. If the embeddings are close, the samples match; if far apart, they don’t.

This approach is perfect for one-shot learning tasks: the network doesn’t need to see every possible example of a person’s handwriting — it just needs to learn a good embedding space where “same” pairs cluster together and “different” pairs spread apart.

Our system pipeline

We designed an end-to-end pipeline for automated cheque verification:

Data extraction: The cheque image is segmented into key regions — cheque number, account number, amount, signature, etc.

Feature embedding: Each segment is processed through a Siamese CNN to get embeddings.

Verification: Embeddings are compared against stored authentic samples. If the similarity score crosses a threshold, it’s accepted; otherwise flagged.

Data validation: Cross-checks are done with database records (like account number matching transaction records).

[placeholder: pipeline diagram — cheque → segmentation → Siamese network → verification → database check]

Why Siamese worked so well

The biggest win with Siamese networks was generalization. We didn’t need to train separate classifiers for every person or every account. Instead, the model learned a generic notion of “similarity” in handwriting and printed fields.

Another insight: by combining Siamese verification with database validation, we reduced both false positives and false negatives. Even if handwriting was ambiguous, the data validation layer caught inconsistencies.

Results in practice

Our experiments showed that:

The Siamese model achieved strong accuracy in distinguishing genuine vs forged/altered cheques.

The hybrid approach (ML + rule-based verification) made the system robust.

Processing time dropped dramatically compared to manual checks, making this approach viable for bulk cheque processing.

[placeholder: evaluation table — accuracy, precision, recall comparisons]

Reflections

Looking back, what I find exciting is that this work was an early example of applied deep learning for real-world banking workflows. It wasn’t just a cool model — it was about saving time, reducing fraud, and making financial transactions safer.

Also, it got me hooked on the power of representation learning. Siamese networks, and more broadly contrastive learning, have exploded since then — powering everything from face verification to modern foundation models.

For me, cheque verification was just the beginning.

Closing thoughts

If there’s one lesson from this project, it’s this: sometimes, the smartest solution isn’t to build a huge dataset and brute-force a classifier. Sometimes, the key is to frame the problem differently — here, as a similarity learning problem instead of a classification one.

That simple reframing let us build a system that was scalable, accurate, and practical. And it set me on the path of exploring deep learning more seriously.`;export{e as default};
