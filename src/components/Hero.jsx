import React, { useEffect, useRef, useState } from "react";

const heroSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  marginBottom: '2rem',
  background: 'rgba(24, 24, 27, 0.85)',
  borderRadius: '1.2rem',
  boxShadow: '0 4px 32px 0 rgba(0,0,0,0.55)',
  padding: '2rem 2rem 2rem 1.5rem',
  border: '1.5px solid #23272f',
  position: 'relative',
  overflow: 'hidden',
};
const profileImg = {
  width: '140px',
  height: '140px',
  borderRadius: '50%',
  boxShadow: '0 0 32px 4px #38bdf8, 0 8px 32px 0 rgba(0,0,0,0.45)',
  border: '4px solid #23272f',
  objectFit: 'cover',
  background: '#18181b',
  transition: 'box-shadow 0.4s',
};
const nameStyle = {
  fontSize: '2.5rem',
  fontWeight: 800,
  margin: 0,
  background: 'linear-gradient(90deg, #a5b4fc, #38bdf8, #f472b6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'fadeInText 1.2s cubic-bezier(0.4,0,0.2,1)',
};
const taglineStyle = {
  fontSize: '1.2rem',
  color: '#38bdf8',
  fontWeight: 600,
  marginTop: '0.5rem',
  minHeight: '1.5em',
  letterSpacing: '0.5px',
  textShadow: '0 2px 16px #000a',
  fontFamily: 'Fira Mono, monospace',
};
const contactStyle = {
  marginTop: '0.5rem',
  fontSize: '1rem',
  color: '#a1a1aa',
};

// Robust typewriter hook (index-based, bulletproof, two useEffects)
function useTypewriter(text, speed = 45) {
  const [index, setIndex] = useState(0);

  // Reset index when text changes
  useEffect(() => {
    setIndex(0);
  }, [text]);

  // Increment index to animate typing
  useEffect(() => {
    if (!text || typeof text !== 'string' || !text.trim()) return;
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [text, index, speed]);

  return text ? text.slice(0, index) : "";
}

export default function Hero({ name, imageUrl, contact, tagline }) {
  // Only use tagline if it's a non-empty string
  const safeTagline = (typeof tagline === 'string' && tagline.trim()) ? tagline.trim() : '';
  const typedTagline = useTypewriter(safeTagline);
  const showCursor = safeTagline && typedTagline.length > 0 && typedTagline.length < safeTagline.length;
  return (
    <section style={heroSection}>
      <img src={imageUrl} alt={name} style={profileImg} />
      <div>
        <h1 style={nameStyle}>{name}</h1>
        {safeTagline && (
          <div style={taglineStyle}>
            {typedTagline}
            {showCursor && <span style={{color:'#f472b6', fontWeight:700}}>|</span>}
          </div>
        )}
        <div style={contactStyle}>
          <div>📍 {contact.location}</div>
          <div>📧 <a href={`mailto:${contact.email}`} style={{color:'#38bdf8'}}>{contact.email}</a></div>
          <div>🔗 <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a></div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInText {
          from { opacity: 0; letter-spacing: 0.2em; }
          to { opacity: 1; letter-spacing: 0.5px; }
        }
      `}</style>
    </section>
  );
} 