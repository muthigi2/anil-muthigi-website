import React, { useState } from "react";

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
    id: 'temporal-salesforce-streaming',
    title: "Scaling Event-Driven Systems with Temporal at Salesforce",
    date: "2024-12-10",
    summary: "How Temporal helps build resilient, observable workflows for data pipelines and AI-driven features.",
    content: `Temporal is an open source workflow orchestration platform that lets you write durable, long-running workflows in code.
At Salesforce, we needed fault-tolerant orchestration for data pipelines and Copilot actions. Temporal gave us:
- Durable retries with backoff for flaky downstream services
- Clear separation of concerns between activities and workflows
- Great observability into workflow history for debugging
We used Temporal to coordinate Kafka → Flink → Spark pipelines, with workflow steps for validation, enrichment, and downstream fanout. For Copilot actions, Temporal helped sequence model prompts, human-in-the-loop approvals, and final delivery.
Key takeaway: Temporal's 'code as state machine' model beats cron+queues for complex, stateful tasks.`,
  },
  {
    id: 'competitive-programming-mindset',
    title: "What Competitive Programming Taught Me About Engineering",
    date: "2024-04-15",
    summary: "From Codeforces to real-world systems: patterns, edge cases, and iterative improvement.",
    content: `Competitive programming trains sharp instincts for constraints, edge cases, and fast iteration.
On the job, the same skills help design efficient systems, reason about bottlenecks, and simplify complex logic.
Three habits that stuck with me:
1) Model first, code second; 2) Name invariants and test them; 3) Prefer clear O() over clever hacks.`,
  },
  {
    id: 'dev-setup',
    title: "My Developer Setup: Tools I Actually Use",
    date: "2024-03-20",
    summary: "An honest list of tools that improve my day-to-day developer experience.",
    content: `A minimal setup that scales with projects: VS Code + sensible extensions, a few shell aliases, Docker for parity, and a makefile for repeatable tasks.
Bonus: Git hooks for lint/test, and a lightweight docs site for team onboarding.`,
  }
];

export default function Blog() {
  const [openPostId, setOpenPostId] = useState(null);
  const openPost = posts.find(p => p.id === openPostId);

  if (openPost) {
    return (
      <section style={blogSection}>
        <div className="aboutCard" style={{background:'rgba(24, 24, 27, 0.92)', border:'1px solid #23272f', borderRadius:'1rem', padding:'1.2rem'}}>
          <h2 style={titleStyle}>{openPost.title}</h2>
          <div style={{color:'#60a5fa', marginBottom:'0.8rem'}}>{openPost.date}</div>
          <div style={{whiteSpace:'pre-wrap', lineHeight:1.7}}>{openPost.content}</div>
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