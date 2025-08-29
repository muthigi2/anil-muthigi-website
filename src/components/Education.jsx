import React from "react";

const sectionStyle = { marginBottom: '2.5rem' };
const titleStyle = { color: '#60a5fa', fontWeight: 700, fontSize: '2rem', letterSpacing: '0.5px', textAlign: 'center', marginBottom: '2rem' };
const schoolCard = {
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

export default function Education({ education }) {
  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>Education</h2>
      {education.map((ed, i) => (
        <div key={i} className="schoolCard" style={schoolCard}>
          <span style={iconStyle}>{ed.icon}</span>
          <div style={{fontWeight:700, fontSize:'1.25rem', color:'#a5b4fc'}}>{ed.school}</div>
          <div style={{fontSize:'1.1rem', margin:'0.2rem 0 0.7rem 0'}}>{ed.degree}</div>
          <div style={{color:'#60a5fa', fontWeight:600}}>{ed.dates}</div>
          {ed.gpa && <div style={{color:'#f472b6', fontWeight:600}}>GPA: {ed.gpa}</div>}
          <div style={{margin:'1.2rem 0', color:'#e0e7ef'}}>{ed.desc}</div>
          <div style={highlightBox}>
            {i === 0 ? '📚 Coursework: CS 411 Databases, CS 441 Applied ML, CS 598 Topics in Data Managment' : '👥 Activities: ACM student chapter; 🧠 competitive programming & systems projects'}
          </div>
        </div>
      ))}
    </section>
  );
} 