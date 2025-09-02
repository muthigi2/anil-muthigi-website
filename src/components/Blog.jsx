import React, { useEffect, useState } from "react";

const blogSection = {
  marginBottom: '2.5rem',
  background: 'rgba(36, 37, 42, 0.85)',
  borderRadius: '1rem',
  padding: '2rem',
  boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
  color: '#e5e7eb',
  border: '1px solid #23272f',
  transition: 'background 0.7s cubic-bezier(0.4,0,0.2,1)',
};
const titleStyle = {
  color: '#60a5fa',
  fontWeight: 700,
  fontSize: '2rem',
  letterSpacing: '0.5px',
  marginBottom: '1.5rem',
  textAlign: 'center',
};
const cardStyle = {
  background: 'rgba(24, 24, 27, 0.92)',
  borderRadius: '0.7rem',
  padding: '1.2rem',
  margin: '1rem auto',
  maxWidth: 800,
  border: '1px solid #23272f',
  color: '#e0e7ef',
  boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
  textAlign: 'left',
  cursor: 'pointer',
};

const posts = [
  {
    id: 'salesforce-internship-blog',
    title: "Salesforce Internship Blog: Building Temporal Visibility on Kubernetes",
    date: "2025-09-02",
    summary: "An intern-led journey swapping OpenSearch with self-hosted Elasticsearch for Temporal at Salesforce — architecture, challenges, and wins.",
  },
  {
    id: 'cacheblend-kv-cache-rag',
    title: "CacheBlend: Smarter KV Cache Reuse for Fast and Accurate RAG",
    date: "2025-04-23",
    summary: "When we talk about serving large language models (LLMs) efficiently, one name that always comes up is vLLM.",
  },
  {
    id: 'automated-cheque-processing',
    title: "Teaching Machines to Verify Cheques: Siamese Networks",
    date: "2020-12-01",
    summary: "A practical walkthrough of our Springer-published work on automated cheque verification using Siamese networks.",
  }
];

const contentLoaders = {
  'cacheblend-kv-cache-rag': () => import('../blogs/cacheblend.js').then(m => m.default),
  'salesforce-internship-blog': () => import('../blogs/salesforce-internship-blog.js').then(m => m.default),
  'automated-cheque-processing': () => import('../blogs/automated-cheque-processing.js').then(m => m.default),
};

export default function Blog() {
  const [openPostId, setOpenPostId] = useState(null);
  const [postContent, setPostContent] = useState('');
  const openPost = posts.find(p => p.id === openPostId);

  useEffect(() => {
    if (!openPostId) {
      setPostContent('');
      return;
    }
    const loader = contentLoaders[openPostId];
    if (loader) {
      loader().then((content) => setPostContent(content));
    }
  }, [openPostId]);

  function renderCacheblend(content) {
    const base = import.meta.env.BASE_URL || '/';
    const imageStyle = { display:'block', margin:'1rem auto', maxWidth:'100%', borderRadius:8, border:'1px solid #23272f' };
    const headingStyle = { fontWeight:800, textDecoration:'underline', margin:'1.1rem 0 0.6rem 0', fontSize:'1.3rem' };
    const lines = content.split('\n');
    const elements = [];
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (!line.trim()) { elements.push(<div key={`br-${i}`} style={{height:8}} />); continue; }
      const lower = line.toLowerCase();
      if (
        lower.startsWith('setting the stage:') ||
        lower.startsWith('my first thought:') ||
        lower.startsWith('so what’s the right question to ask?') ||
        lower.startsWith("so what's the right question to ask?") ||
        lower.startsWith('the idea: selective kv recompute') ||
        lower.startsWith('how do we pick these bridge tokens?') ||
        lower.startsWith('system design:') ||
        lower.startsWith('what the results show') ||
        lower.startsWith('wrapping it all up')
      ) {
        elements.push(<div key={`h-${i}`} style={headingStyle}>{line}</div>);
        continue;
      }
      // Questions and quotes in italics
      if (
        line.startsWith('Question:') ||
        line.startsWith('Retrieved chunk line') ||
        line.trim().startsWith('“') || line.trim().startsWith('"')
      ) {
        elements.push(<p key={`q-${i}`} style={{margin:'0.3rem 0', fontStyle:'italic'}}>{line}</p>);
        continue;
      }

      // Numbered list for the natural question (grab next 2 non-empty lines)
      if (lower.startsWith('the natural question became:')) {
        elements.push(<div key={`txtn-${i}`} style={{margin:'0.3rem 0'}}>{line}</div>);
        const items = [];
        let j = i + 1;
        while (j < lines.length && items.length < 2) {
          if (lines[j].trim()) { items.push(lines[j]); }
          j += 1;
        }
        elements.push(
          <ol key={`olq-${i}`} style={{paddingLeft:'1.2rem', margin:'0.3rem 0'}}>
            {items.map((t, idx) => (
              <li key={`oli-${i}-${idx}`} style={{margin:'0.2rem 0'}}>{t}</li>
            ))}
          </ol>
        );
        i = j - 1;
        continue;
      }

      // Numbered list after "The paper’s evaluation highlights three big takeaways:"
      if (
        lower.startsWith('the paper’s evaluation highlights three big takeaways:') ||
        lower.startsWith("the paper's evaluation highlights three big takeaways:")
      ) {
        elements.push(<div key={`txt-${i}`} style={{margin:'0.3rem 0'}}>{line}</div>);
        const items = [];
        let j = i + 1;
        while (j < lines.length && items.length < 3) {
          if (lines[j].trim()) { items.push(lines[j]); }
          j += 1;
        }
        elements.push(
          <ol key={`ol1-${i}`} style={{paddingLeft:'1.2rem', margin:'0.3rem 0'}}>
            {items.map((t, idx) => (
              <li key={`oli1-${i}-${idx}`} style={{margin:'0.2rem 0'}}>{t}</li>
            ))}
          </ol>
        );
        i = j - 1;
        continue;
      }

      // Numbered list for the three-step filtering scheme (capture 3 steps)
      if (lower.startsWith('start with the hkvd set from layer 1.')) {
        const items = [line];
        let j = i + 1;
        while (j < lines.length && items.length < 3) {
          if (lines[j].trim()) { items.push(lines[j]); }
          j += 1;
        }
        elements.push(
          <ol key={`ol2-${i}`} style={{paddingLeft:'1.2rem', margin:'0.3rem 0'}}>
            {items.map((t, idx) => (
              <li key={`oli2-${i}-${idx}`} style={{margin:'0.2rem 0'}}>{t}</li>
            ))}
          </ol>
        );
        i = j - 1;
        continue;
      }

      // Emphasis for select lines
      if (
        lower.startsWith('let’s rewind for a moment.') ||
        lower.startsWith("let's rewind for a moment.") ||
        lower.startsWith('this is huge:') ||
        lower.startsWith('that’s a beautiful systems-meets-ml insight:') ||
        lower.startsWith("that's a beautiful systems-meets-ml insight:")
      ) {
        elements.push(<p key={`it-${i}`} style={{margin:'0.3rem 0', fontStyle:'italic'}}>{line}</p>);
        continue;
      }

      if (line.startsWith('[placeholder:')) {
        if (line.includes('how Q/K/V are produced')) {
          elements.push(<img key={`img-${i}`} src={`${base}Cacheblendwhatiskvcache.png`} alt="CacheBlend QKV" style={imageStyle} />);
          continue;
        }
        if (line.includes('prefix caching') || line.includes('non-prefix reuse')) {
          elements.push(<img key={`img-${i}`} src={`${base}CacheblendKvReuse.png`} alt="CacheBlend KV Reuse" style={imageStyle} />);
          continue;
        }
        if (line.includes('Do we need to recompute KV')) {
          elements.push(<img key={`img-${i}`} src={`${base}CacheblendSelectiveRecompute.png`} alt="CacheBlend Selective Recompute" style={imageStyle} />);
          continue;
        }
        if (line.includes('pipeline timeline')) {
          // Show end-to-end diagram first, then pipeline timeline
          elements.push(<img key={`img-${i}-a`} src={`${base}CacheblendSystemDesign2.png`} alt="CacheBlend End-to-End" style={imageStyle} />);
          elements.push(<img key={`img-${i}-b`} src={`${base}CacheblendSystemDesign.png`} alt="CacheBlend Pipeline" style={imageStyle} />);
          continue;
        }
        if (line.includes('evaluation charts')) {
          elements.push(<img key={`img-${i}-1`} src={`${base}CacheblendEvaluation-1.png`} alt="CacheBlend Evaluation 1" style={imageStyle} />);
          elements.push(<img key={`img-${i}-2`} src={`${base}CacheblendEvaluation-2.png`} alt="CacheBlend Evaluation 2" style={imageStyle} />);
          continue;
        }
        if (line.includes('final end-to-end diagram')) { continue; }
        // Unknown placeholder -> skip
        continue;
      }
      elements.push(<p key={`p-${i}`} style={{margin:'0.3rem 0'}}>{line}</p>);
    }
    return elements;
  }

  function renderSalesforce(content) {
    const base = import.meta.env.BASE_URL || '/';
    const imageStyle = { display:'block', margin:'0.75rem auto', maxWidth:'65%', borderRadius:8, border:'1px solid #23272f' };
    const headingStyle = { fontWeight:800, textDecoration:'underline', margin:'1.1rem 0 0.6rem 0', fontSize:'1.25rem' };
    const lines = content.split('\n');
    const elements = [];
    let insertedPhoto = false;
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (!line.trim()) { elements.push(<div key={`s-br-${i}`} style={{height:8}} />); continue; }
      const lower = line.toLowerCase();

      if (
        lower.startsWith('scaling temporal visibility') ||
        lower.startsWith('why replace opensearch') ||
        lower.startsWith('architecture overview') ||
        lower.startsWith('helm-driven deployment') ||
        lower.includes('temporal integration') ||
        lower.startsWith('key challenges') ||
        lower.startsWith('outcomes') ||
        lower.includes('lessons learned') ||
        lower.startsWith('looking forward')
      ) {
        elements.push(<div key={`s-h-${i}`} style={headingStyle}>{line}</div>);
        // Section rendering strategies
        const isListSection = lower.startsWith('outcomes') || lower.startsWith('key challenges');
        const isParagraphSection = lower.startsWith('helm-driven deployment') || lower.includes('temporal integration');

        if (isListSection || isParagraphSection) {
          const items = [];
          let j = i + 1;
          while (j < lines.length) {
            const cand = (lines[j] || '').trim();
            const cl = cand.toLowerCase();
            if (!cand) { j += 1; continue; }
            const isNextHeading = cl.startsWith('outcomes') || cl.startsWith('key challenges') || cl.includes('temporal integration') || cl.startsWith('helm-driven deployment') || cl.startsWith('architecture overview') || cl.startsWith('lessons learned') || cl.startsWith('looking forward') || cl.startsWith('why replace opensearch') || cl.startsWith('scaling temporal visibility');
            if (isNextHeading) break;
            const isIntroLine = cand.endsWith(':');
            if (isParagraphSection) {
              // Keep intro line; drop only the ConfigMaps line
              if (!cl.startsWith('configmaps & secrets')) {
                items.push(cand);
              }
            } else {
              if (!isIntroLine) {
                items.push(cand);
              }
            }
            j += 1;
          }
          if (items.length) {
            if (isParagraphSection) {
              const intro = (items[0] || '').replace(/\s+$/,'');
              const rest = items.slice(1).map(t => t.replace(/^[-–—]\s*/, '').replace(/\s*[.;]\s*$/, ''));
              const restText = rest.join('; ');
              const para = restText ? `${intro} ${restText}.` : intro;
              elements.push(<p key={`s-sec-p-${i}`} style={{margin:'0.3rem 0'}}>{para}</p>);
            } else {
              elements.push(
                <ol key={`s-sec-${i}`} style={{paddingLeft:'1.2rem', margin:'0.3rem 0', listStyleType:'decimal'}}>
                  {items.map((t, idx) => (<li key={`s-sec-li-${i}-${idx}`} style={{margin:'0.2rem 0'}}>{t}</li>))}
                </ol>
              );
            }
            i = j - 1;
          }
        }
        continue;
      }

      // Italicize the label line (and show photo before it)
      if (lower.startsWith('my internship project:')) {
        if (!insertedPhoto) {
          elements.push(<img key={`s-img-int`} src={`${base}SalesforceInternship.jpeg`} alt="Salesforce Internship" style={imageStyle} />);
          insertedPhoto = true;
        }
        elements.push(<p key={`s-mip-${i}`} style={{fontStyle:'italic', margin:'0.3rem 0'}}>{line}</p>);
        continue;
      }

      // Add spacing before this subheading-like line
      if (lower.startsWith('each tier had:')) {
        elements.push(<div key={`s-sp-${i}`} style={{height:8}} />);
        elements.push(<p key={`s-et-${i}`} style={{margin:'0.3rem 0'}}>{line}</p>);
        continue;
      }

      // Photo is handled at the label line to control exact placement

      // Numbered lists in constraint section
      if (lower.startsWith('vendor lock-in') || lower.startsWith('limited tuning') || lower.startsWith('cost & efficiency') || lower.startsWith('integration flexibility')) {
        const items = [];
        let j = i;
        while (j < lines.length) {
          const cand = (lines[j] || '').trim();
          const cl = cand.toLowerCase();
          if (!cand) { j += 1; continue; }
          if (cl.startsWith('vendor lock-in') || cl.startsWith('limited tuning') || cl.startsWith('cost & efficiency') || cl.startsWith('integration flexibility')) { items.push(cand); j += 1; continue; }
          break;
        }
        elements.push(
          <ol key={`s-why-${i}`} style={{paddingLeft:'1.2rem', margin:'0.3rem 0', listStyleType:'decimal'}}>
            {items.map((t, idx) => (<li key={`s-why-li-${i}-${idx}`} style={{margin:'0.2rem 0'}}>{t}</li>))}
          </ol>
        );
        i = j - 1;
        continue;
      }

      // Architecture roles list
      if (lower.startsWith('master nodes') || lower.startsWith('data nodes') || lower.startsWith('coordinator nodes')) {
        const items = [];
        let j = i;
        while (j < lines.length) {
          const cand = (lines[j] || '').trim();
          const cl = cand.toLowerCase();
          if (!cand) { j += 1; continue; }
          if (cl.startsWith('master nodes') || cl.startsWith('data nodes') || cl.startsWith('coordinator nodes')) { items.push(cand); j += 1; continue; }
          break;
        }
        elements.push(
          <ol key={`s-roles-${i}`} style={{paddingLeft:'1.2rem', margin:'0.3rem 0', listStyleType:'decimal'}}>
            {items.map((t, idx) => (<li key={`s-roles-li-${i}-${idx}`} style={{margin:'0.2rem 0'}}>{t}</li>))}
          </ol>
        );
        i = j - 1; continue;
      }

      // Bullet-like infra components -> ordered list
      if (lower.startsWith('persistentvolumeclaims') || lower.startsWith('headless services') || lower.startsWith('configmaps & secrets')) {
        const items = [];
        let j = i;
        while (j < lines.length) {
          const cand = (lines[j] || '').trim();
          const cl = cand.toLowerCase();
          if (!cand) { j += 1; continue; }
          if (cl.startsWith('persistentvolumeclaims') || cl.startsWith('headless services') || cl.startsWith('configmaps & secrets')) { items.push(cand); j += 1; continue; }
          break;
        }
        elements.push(
          <ol key={`s-infra-${i}`} style={{paddingLeft:'1.2rem', margin:'0.3rem 0', listStyleType:'decimal'}}>
            {items.map((t, idx) => (<li key={`s-infra-li-${i}-${idx}`} style={{margin:'0.2rem 0'}}>{t}</li>))}
          </ol>
        );
        i = j - 1; continue;
      }

      // (Handled numbered sections at heading time)

      // Lessons learned list
      if (lower.startsWith('kubernetes + stateful workloads') || lower.startsWith('secret management at scale') || lower.startsWith('search system tuning') || lower.startsWith('observability is non-negotiable')) {
        const items = [];
        let j = i;
        while (j < lines.length) {
          const cand = (lines[j] || '').trim();
          const cl = cand.toLowerCase();
          if (!cand) { j += 1; continue; }
          if (cl.startsWith('kubernetes + stateful workloads') || cl.startsWith('secret management at scale') || cl.startsWith('search system tuning') || cl.startsWith('observability is non-negotiable')) { items.push(cand); j += 1; continue; }
          break;
        }
        elements.push(
          <ol key={`s-lessons-${i}`} style={{paddingLeft:'1.2rem', margin:'0.3rem 0', listStyleType:'decimal'}}>
            {items.map((t, idx) => (<li key={`s-lessons-li-${i}-${idx}`} style={{margin:'0.2rem 0'}}>{t}</li>))}
          </ol>
        );
        i = j - 1; continue;
      }

      // Italicize emphasis lines
      if (lower.startsWith('this wasn’t smooth sailing') || lower.startsWith('this wasn\’t smooth sailing') || lower.startsWith('most importantly')) {
        elements.push(<p key={`s-it-${i}`} style={{fontStyle:'italic', margin:'0.3rem 0'}}>{line}</p>);
        continue;
      }

      // Merge contiguous lines into one paragraph for better flow
      let para = line;
      let j = i + 1;
      while (j < lines.length) {
        const nxt = lines[j];
        const nl = (nxt || '').toLowerCase();
        const isBreak = !nxt.trim() || nxt.startsWith('[') ||
          nl.startsWith('scaling temporal visibility') || nl.startsWith('why replace opensearch') || nl.startsWith('architecture overview') || nl.startsWith('helm-driven deployment') || nl.includes('temporal integration') || nl.startsWith('key challenges') || nl.startsWith('outcomes') || nl.includes('lessons learned') || nl.startsWith('looking forward') ||
          nl.startsWith('vendor lock-in') || nl.startsWith('limited tuning') || nl.startsWith('cost & efficiency') || nl.startsWith('integration flexibility') ||
          nl.startsWith('master nodes') || nl.startsWith('data nodes') || nl.startsWith('coordinator nodes') ||
          nl.startsWith('persistentvolumeclaims') || nl.startsWith('headless services') || nl.startsWith('configmaps & secrets') ||
          nl.startsWith('kubernetes + stateful workloads') || nl.startsWith('secret management at scale') || nl.startsWith('search system tuning') || nl.startsWith('observability is non-negotiable');
        if (isBreak) break;
        para += ' ' + nxt.trim();
        j += 1;
      }
      elements.push(<p key={`s-p2-${i}`} style={{margin:'0.3rem 0'}}>{para}</p>);
      i = j - 1;
    }
    return elements;
  }
  function renderCheque(content) {
    const base = import.meta.env.BASE_URL || '/';
    const imageStyle = { display:'block', margin:'1rem auto', maxWidth:'100%', borderRadius:8, border:'1px solid #23272f' };
    const headingStyle = { fontWeight:800, textDecoration:'underline', margin:'1.1rem 0 0.6rem 0', fontSize:'1.25rem' };
    const lines = content.split('\n');
    const elements = [];
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (!line.trim()) { elements.push(<div key={`cbr-${i}`} style={{height:8}} />); continue; }
      const lower = line.toLowerCase();

      if (
        lower.startsWith('teaching machines') ||
        lower.startsWith('why cheque verification?') ||
        lower.startsWith('siamese networks:') ||
        lower.startsWith('our system pipeline') ||
        lower.startsWith('why siamese worked so well') ||
        lower.startsWith('results in practice') ||
        lower.startsWith('reflections') ||
        lower.startsWith('closing thoughts')
      ) {
        elements.push(<div key={`ch-${i}`} style={headingStyle}>{line}</div>);
        continue;
      }

      // Convert the three-item list (with blank lines between) into a single ordered list
      if (lower === 'time-consuming' || lower === 'error-prone' || lower === 'vulnerable to fraud') {
        const itemSet = new Set(['time-consuming','error-prone','vulnerable to fraud']);
        const items = [];
        let j = i;
        while (j < lines.length) {
          const candidate = (lines[j] || '').trim();
          const candLower = candidate.toLowerCase();
          if (!candidate) { j += 1; continue; } // skip blank lines
          if (itemSet.has(candLower)) { items.push(candidate); j += 1; continue; }
          break;
        }
        elements.push(
          <ol key={`col-why-${i}`} style={{paddingLeft:'1.2rem', margin:'0.3rem 0', listStyleType:'decimal'}}>
            {items.map((t, idx) => (<li key={`coli-${i}-${idx}`} style={{margin:'0.2rem 0'}}>{t}</li>))}
          </ol>
        );
        i = j - 1;
        continue;
      }

      if (lower.startsWith('data extraction:')) {
        const items = [line, lines[i+1], lines[i+2], lines[i+3]];
        elements.push(
          <ol key={`col-pipe-${i}`} style={{paddingLeft:'1.2rem', margin:'0.3rem 0', listStyleType:'decimal'}}>
            {items.filter(Boolean).map((t, idx) => (<li key={`coli2-${i}-${idx}`} style={{margin:'0.2rem 0'}}>{t}</li>))}
          </ol>
        );
        i += 3;
        continue;
      }

      // Numbered list for results section
      if (lower.startsWith('our experiments showed that:')) {
        elements.push(<div key={`cex-${i}`} style={{margin:'0.3rem 0'}}>{line}</div>);
        const items = [];
        let j = i + 1;
        while (j < lines.length && items.length < 3) {
          if (lines[j].trim()) { items.push(lines[j]); }
          j += 1;
        }
        elements.push(
          <ol key={`col-res-${i}`} style={{paddingLeft:'1.2rem', margin:'0.3rem 0', listStyleType:'decimal'}}>
            {items.map((t, idx) => (<li key={`colri-${i}-${idx}`} style={{margin:'0.2rem 0'}}>{t}</li>))}
          </ol>
        );
        i = j - 1;
        continue;
      }

      // Images for placeholders
      if (line.startsWith('[placeholder:')) {
        if (line.includes('Siamese Network')) {
          elements.push(<img key={`cimg-${i}`} src={`${base}SignatureVerificationDesign.png`} alt="Siamese Network" style={imageStyle} />);
          continue;
        }
        if (line.includes('pipeline diagram')) {
          elements.push(<img key={`cimg2-${i}`} src={`${base}SignatureVerificationExtractingChequeDetails.png`} alt="Cheque Pipeline" style={imageStyle} />);
          continue;
        }
        if (line.includes('evaluation table')) {
          elements.push(<img key={`cimg3-${i}`} src={`${base}SignatureVerificationComparisonBetweenModels.png`} alt="Evaluation" style={imageStyle} />);
          continue;
        }
        continue;
      }

      elements.push(<p key={`cp-${i}`} style={{margin:'0.3rem 0'}}>{line}</p>);
    }
    return elements;
  }

  if (openPost) {
    return (
      <section style={{...blogSection, maxWidth:'100%'}}>
        <div className="aboutCard" style={{background:'rgba(24, 24, 27, 0.92)', border:'1px solid #23272f', borderRadius:'1rem', padding:'1.2rem'}}>
          <h2 style={titleStyle}>{openPost.title}</h2>
          <div style={{textAlign:'right', fontStyle:'italic', color:'#60a5fa', marginBottom:'0.8rem'}}>Date: {openPost.date}</div>
          <div style={{lineHeight:1.7, textAlign:'left', maxWidth:900, margin:'0 auto'}}>
            {openPostId === 'cacheblend-kv-cache-rag' && renderCacheblend(postContent)}
            {openPostId === 'automated-cheque-processing' && renderCheque(postContent)}
            {openPostId === 'salesforce-internship-blog' && renderSalesforce(postContent)}
            {openPostId !== 'cacheblend-kv-cache-rag' && openPostId !== 'automated-cheque-processing' && openPostId !== 'salesforce-internship-blog' && (
              <div style={{whiteSpace:'pre-wrap'}}>{postContent || 'Loading...'}</div>
            )}
          </div>
          <div style={{marginTop:'1.5rem'}}>
            <button onClick={() => setOpenPostId(null)} style={{background:'#23272f', color:'#e5e7eb', border:'1px solid #333', borderRadius:8, padding:'0.6rem 1rem', cursor:'pointer'}}>← Back to posts</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{...blogSection, maxWidth:'100%'}}>
      <h2 style={titleStyle}>Blog & Notes</h2>
      {posts.map((post) => (
        <div key={post.id} className="projectCard" style={cardStyle} onClick={() => setOpenPostId(post.id)}>
          <div style={{fontWeight:700, fontSize:'1.1rem', color:'#a5b4fc', textDecoration:'underline'}}>{post.title}</div>
          <div style={{fontSize:'0.95rem', color:'#60a5fa', marginBottom:4}}>{post.date}</div>
          <div>{post.summary}</div>
        </div>
      ))}
      <div style={{marginTop:'1.5rem', color:'#38bdf8'}}>More posts coming soon...</div>
    </section>
  );
} 