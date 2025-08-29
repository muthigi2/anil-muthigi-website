import React from "react";

const aboutSection = {
  marginBottom: '2.5rem',
  background: 'rgba(36, 37, 42, 0.85)',
  borderRadius: '1rem',
  padding: '2.5rem',
  boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
  color: '#e5e7eb',
  border: '1px solid #23272f',
  textAlign: 'center',
  transition: 'background 0.7s cubic-bezier(0.4,0,0.2,1)',
};
const titleStyle = {
  marginTop: 0,
  color: '#60a5fa',
  fontWeight: 700,
  fontSize: '2rem',
  letterSpacing: '0.5px',
};
const badgeRow = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1.2rem',
  flexWrap: 'wrap',
  margin: '1.5rem 0 0.5rem 0',
};
const badge = {
  background: 'rgba(56, 189, 248, 0.13)',
  color: '#38bdf8',
  borderRadius: '1.2rem',
  padding: '0.5rem 1.2rem',
  fontWeight: 600,
  fontSize: '1.05rem',
  letterSpacing: '0.2px',
  boxShadow: '0 2px 8px #23272f44',
};
const funFactsList = {
  listStyle: 'none',
  padding: 0,
  margin: '1.2rem 0',
  color: '#a5b4fc',
  fontSize: '1.08rem',
};
const innerCard = {
  background: 'rgba(24, 24, 27, 0.92)',
  border: '1px solid #2a2f3a',
  borderRadius: '1rem',
  padding: '1.5rem'
};

export default function About({ summary, funFacts, badges }) {
  return (
    <section style={aboutSection}>
      <div className="aboutCard" style={innerCard}>
        <h2 style={titleStyle}>About Me</h2>
        <p style={{fontSize:'1.18rem', maxWidth: 700, margin: '0 auto 1.5rem auto'}}>{summary}</p>
        <div className="about-detail" style={{fontSize:'1.08rem', color:'#e0e7ef', maxWidth: 700, margin: '0 auto 1.5rem auto'}}>
          <strong>What Drives Me:</strong> <br/>
          I thrive at the intersection of AI, software engineering, and creative problem solving. My mission is to build tools and systems that empower people, automate the boring stuff, and unlock new possibilities. Whether it's a hackathon, a research project, or a late-night code sprint, I'm always looking for ways to push boundaries and learn something new.
        </div>
        <div style={badgeRow}>
          {badges && badges.map((b, i) => <span key={i} style={badge}>{b}</span>)}
        </div>
        <div style={{marginTop:'2rem'}}>
          <strong style={{color:'#60a5fa'}}>Fun Facts:</strong>
          <ul style={funFactsList}>
            {funFacts && funFacts.map((fact, i) => <li key={i}>{fact}</li>)}
          </ul>
        </div>
        <div style={{marginTop:'2rem', color:'#f472b6', fontWeight:600, fontSize:'1.1rem'}}>
          "Let's build something extraordinary together!"
        </div>
      </div>
    </section>
  );
} 