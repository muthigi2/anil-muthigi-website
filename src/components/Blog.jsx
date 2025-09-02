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
    id: 'cacheblend-kv-cache-rag',
    title: "CacheBlend: Smarter KV Cache Reuse for Fast and Accurate RAG",
    date: "2025-09-02",
    summary: "When we talk about serving large language models (LLMs) efficiently, one name that always comes up is vLLM.",
  },
  {
    id: 'temporal-salesforce-streaming',
    title: "Scaling Event-Driven Systems with Temporal at Salesforce",
    date: "2024-12-10",
    summary: "How Temporal helps build resilient, observable workflows for data pipelines and AI-driven features.",
  },
  {
    id: 'competitive-programming-mindset',
    title: "What Competitive Programming Taught Me About Engineering",
    date: "2024-04-15",
    summary: "From Codeforces to real-world systems: patterns, edge cases, and iterative improvement.",
  },
  {
    id: 'dev-setup',
    title: "My Developer Setup: Tools I Actually Use",
    date: "2024-03-20",
    summary: "An honest list of tools that improve my day-to-day developer experience.",
  }
];

const contentLoaders = {
  'cacheblend-kv-cache-rag': () => import('../blogs/cacheblend.js').then(m => m.default),
  'temporal-salesforce-streaming': () => import('../blogs/temporal-salesforce-streaming.js').then(m => m.default),
  'competitive-programming-mindset': () => import('../blogs/competitive-programming-mindset.js').then(m => m.default),
  'dev-setup': () => import('../blogs/dev-setup.js').then(m => m.default),
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

  if (openPost) {
    return (
      <section style={blogSection}>
        <div className="aboutCard" style={{background:'rgba(24, 24, 27, 0.92)', border:'1px solid #23272f', borderRadius:'1rem', padding:'1.2rem'}}>
          <h2 style={titleStyle}>{openPost.title}</h2>
          <div style={{color:'#60a5fa', marginBottom:'0.8rem'}}>{openPost.date}</div>
          <div style={{whiteSpace:'pre-wrap', lineHeight:1.7}}>{postContent || 'Loading...'}</div>
          <div style={{marginTop:'1.5rem'}}>
            <button onClick={() => setOpenPostId(null)} style={{background:'#23272f', color:'#e5e7eb', border:'1px solid #333', borderRadius:8, padding:'0.6rem 1rem', cursor:'pointer'}}>← Back to posts</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={blogSection}>
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