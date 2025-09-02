import React from "react";

const sectionStyle = {
  marginBottom: '2.5rem',
  background: 'rgba(36, 37, 42, 0.85)',
  borderRadius: '1rem',
  padding: '1.8rem',
  boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
  color: '#e5e7eb',
  border: '1px solid #23272f',
  transition: 'background 0.7s cubic-bezier(0.4,0,0.2,1)'
};
const titleStyle = { color: '#60a5fa', fontWeight: 700, fontSize: '1.6rem', letterSpacing: '0.5px', textAlign: 'center', marginBottom: '1.2rem' };
const listStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '0.8rem',
  maxWidth: 700,
  margin: '0 auto'
};
const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'rgba(24, 24, 27, 0.92)',
  border: '1px solid #2a2f3a',
  borderRadius: '0.7rem',
  padding: '0.8rem 1rem'
};
const leftStyle = { display: 'flex', alignItems: 'center', gap: '0.7rem', color: '#a5b4fc', fontWeight: 600 };
const linkStyle = { color: '#38bdf8', textDecoration: 'underline', fontWeight: 600 };

export default function Contact({ contact }) {
  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>Contact</h2>
      <div style={listStyle}>
        <div className="contact-row" style={rowStyle}>
          <div className="left-label" style={leftStyle}><span>Cell</span></div>
          <a style={linkStyle} href={`tel:${contact.phone}`} aria-label="Call mobile">{contact.phone}</a>
        </div>
        <div className="contact-row" style={rowStyle}>
          <div className="left-label" style={leftStyle}><span>Email</span></div>
          <a style={linkStyle} href={`mailto:${contact.email}`} aria-label="Send email">{contact.email}</a>
        </div>
        <div className="contact-row" style={rowStyle}>
          <div className="left-label" style={leftStyle}><span>LinkedIn</span></div>
          <a style={linkStyle} href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn">View</a>
        </div>
        <div className="contact-row" style={rowStyle}>
          <div className="left-label" style={leftStyle}><span>Instagram</span></div>
          <a style={linkStyle} href="https://www.instagram.com/anilmuthigi/" target="_blank" rel="noopener noreferrer" aria-label="Open Instagram">@anilmuthigi</a>
        </div>
      </div>
    </section>
  );
} 