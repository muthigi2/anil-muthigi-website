import React from "react";

const sectionStyle = { marginBottom: '2.5rem' };
const titleStyle = { color: '#60a5fa', fontWeight: 700, fontSize: '2rem', letterSpacing: '0.5px', textAlign: 'center', marginBottom: '2rem' };
const projectCard = {
  marginBottom: '2.2rem',
  background: 'rgba(36, 37, 42, 0.92)',
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
const linkStyle = { color: '#38bdf8', textDecoration: 'underline', fontWeight: 600 };

const creativeSummaries = [
  "Low-Latency Messaging System is a lock-free C++ engine with a shared-memory ring buffer and async HTTP/WebSocket endpoints via Boost.Asio/Beast. It ships with a React UI for monitoring and stress tests, and focuses on predictable latency and throughput.",
  "Automated Cheque Processing was my first foray into real-world AI for finance. I designed a deep learning system that could read, verify, and process cheques with minimal human intervention. The project was published and is now inspiring other banks to automate their workflows.",
  "GAN-based Content Censorship was a wild ride into the world of generative AI. I built a model that could intelligently mask and refill explicit content in images, making the internet a safer place—one pixel at a time!",
  "Literary Text Oracle is my love letter to language modeling. I trained an LSTM to predict the next word in literary texts, exploring the boundaries of creativity and computation."
];
const highlights = [
  "⚡ Performance: Single-host throughput improved via shared-memory transport and zero-copy paths.",
  "🏦 Impact: Helped banks reduce manual cheque processing by 80%.",
  "🖼️ Challenge: Training GANs is hard! But seeing the model inpaint images was pure magic.",
  "📚 Fun Fact: The model once predicted the ending of a story before I finished writing it!"
];

export default function Projects({ projects }) {
  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>Projects</h2>
      {projects.map((p, i) => {
        const summary = creativeSummaries[i] || (p.desc || "");
        const hl = highlights[i] || "";
        return (
          <div key={i} className="projectCard" style={projectCard}>
            <span style={iconStyle}>{p.icon}</span>
            <div style={{fontWeight:700, fontSize:'1.25rem', color:'#a5b4fc'}}>{p.title} <span style={{color:'#60a5fa'}}>({p.tech})</span></div>
            {summary && <div style={{margin:'1.2rem 0', color:'#e0e7ef', fontSize:'1.08rem'}}>{summary}</div>}
            {p.desc && <div style={{margin:'0.7rem 0 1.2rem 0', color:'#e0e7ef'}}>{p.desc}</div>}
            {p.link && <a style={linkStyle} href={p.link} target="_blank" rel="noopener noreferrer">View Project</a>}
            {hl && <div style={highlightBox}>{hl}</div>}
          </div>
        );
      })}
    </section>
  );
} 