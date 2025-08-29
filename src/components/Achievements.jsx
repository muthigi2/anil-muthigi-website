import React from "react";

const sectionStyle = { marginBottom: '2.5rem' };
const titleStyle = { color: '#60a5fa', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '0.5px', textAlign: 'center' };
const cardStyle = {
  background: 'rgba(36, 37, 42, 0.85)',
  borderRadius: '1rem',
  padding: '1.2rem',
  border: '1px solid #23272f',
  color: '#e0e7ef',
  boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
  textAlign: 'center',
};

export default function Achievements({ achievements }) {
  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>Achievements</h2>
      <div className="aboutCard" style={cardStyle}>
        <ul style={{listStyle:'none', padding:0, margin:0}}>
          {achievements.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </div>
    </section>
  );
} 