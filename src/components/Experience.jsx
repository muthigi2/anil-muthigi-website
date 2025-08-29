import React from "react";

const sectionStyle = { marginBottom: '2.5rem' };
const titleStyle = { color: '#60a5fa', fontWeight: 700, fontSize: '2rem', letterSpacing: '0.5px', textAlign: 'center', marginBottom: '2rem' };
const jobCard = {
  marginBottom: '2.2rem',
  background: 'rgba(40, 44, 52, 0.92)',
  borderRadius: '1.2rem',
  padding: '2rem',
  border: '1px solid #23272f',
  color: '#e0e7ef',
  boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
  textAlign: 'left',
  maxWidth: 700,
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative',
};
const iconStyle = {
  fontSize: '2.2rem',
  position: 'absolute',
  top: 24,
  right: 32,
  opacity: 0.18,
};
const highlightBox = {
  background: 'rgba(56, 189, 248, 0.13)',
  color: '#38bdf8',
  borderRadius: '0.8rem',
  padding: '0.7rem 1.2rem',
  fontWeight: 600,
  fontSize: '1.05rem',
  marginTop: '1.2rem',
  marginBottom: '0.5rem',
  boxShadow: '0 2px 8px #23272f44',
};
const bulletList = {
  margin: '1.2rem 0 0.5rem 0',
  paddingLeft: '1.2rem',
  color: '#a5b4fc',
  fontSize: '1.08rem',
};

const creativeSummaries = [
  // New first entry for Temporal internship (San Francisco)
  "In San Francisco, I focused on observability and orchestration for Temporal-powered systems—standing up Kubernetes-backed Elasticsearch, hardening configuration with Vault, and automating lifecycles so teams ship confidently.",
  "At Salesforce, I dove into the world of real-time data, building pipelines that powered smarter sales and happier customers. My favorite part? Collaborating with brilliant minds and seeing my code make a real impact on global teams.",
  "As an intern at Salesforce, I got my hands dirty with Apache Flink, transforming batch jobs into lightning-fast streaming systems. I learned how to scale, optimize, and keep things running even when the data storm hit!",
  "Goldman Sachs was my playground for performance tuning. I profiled, tested, and squeezed every millisecond out of Java apps, all while learning the art of cloud resource optimization.",
  "At Instadapp, I bridged the world of DeFi and analytics, building middleware and deploying subgraphs to make blockchain data accessible and actionable.",
  "At Crio.do, I automated the boring stuff—CI/CD, testing, and problem creation—so my team could focus on what really matters: building great learning experiences."
];
const highlights = [
  // New highlight for Temporal internship
  "🧭 Orchestration win: Temporal visibility on K8s with zero‑downtime rollout and stronger security via Vault.",
  "🚀 Biggest Impact: My Copilot action is now used by 1000+ sales teams worldwide!",
  "⚡ Favorite Project: Migrating to real-time streaming and seeing latency drop from minutes to seconds.",
  "🏅 Proud Moment: Reduced latency by 20% and got a shoutout from my manager!",
  "🔗 Fun Fact: My subgraphs are still powering dashboards for DeFi users.",
  "🧑‍💻 Built a Python tool that's now part of the onboarding process."
];

export default function Experience({ experience }) {
  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>Experience</h2>
      {experience.map((job, i) => (
        <div key={i} className="jobCard" style={jobCard}>
          <span style={iconStyle}>{job.icon}</span>
          <div style={{fontWeight:700, fontSize:'1.25rem', color:'#a5b4fc'}}>{job.title} <span style={{color:'#38bdf8'}}>@ {job.company}</span></div>
          <div style={{color:'#f472b6', fontWeight:600, margin:'0.2rem 0 0.7rem 0'}}>{job.dates}{job.location ? ` • ${job.location}` : ''}</div>
          <div style={{margin:'1.2rem 0', color:'#e0e7ef', fontSize:'1.08rem'}}>{creativeSummaries[i]}</div>
          <ul style={bulletList}>
            {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
          </ul>
          <div style={highlightBox}>{highlights[i]}</div>
        </div>
      ))}
    </section>
  );
} 