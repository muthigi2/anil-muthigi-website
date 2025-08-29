import React, { useState } from "react";

const navStyle = {
  position: 'sticky',
  top: 0,
  zIndex: 100,
  width: '100%',
  background: 'rgba(24, 24, 27, 0.85)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 2px 16px rgba(0,0,0,0.25)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.7rem 1.2rem',
  borderBottom: '1px solid #23272f',
};
const ulStyle = {
  display: 'flex',
  gap: '2.0rem',
  listStyle: 'none',
  margin: 0,
  padding: 0,
};
const linkStyle = {
  color: '#a5b4fc',
  fontWeight: 600,
  fontSize: '1.05rem',
  letterSpacing: '0.5px',
  textDecoration: 'none',
  transition: 'color 0.2s',
  cursor: 'pointer',
  padding: '0.2rem 0.5rem',
  borderRadius: '0.3rem',
};
const activeLinkStyle = {
  ...linkStyle,
  color: '#38bdf8',
  background: 'rgba(56, 189, 248, 0.13)',
};

const sections = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

const toggleStyle = {
  background: 'rgba(36,37,42,0.9)',
  color: '#e5e7eb',
  border: '1px solid #333',
  borderRadius: '999px',
  padding: '0.3rem 0.8rem',
  cursor: 'pointer',
  fontWeight: 600,
};

export default function Navbar({ currentSection, setCurrentSection }) {
  const [light, setLight] = useState(true);
  function toggleTheme() {
    setLight(prev => {
      const next = !prev;
      if (next) document.body.classList.add('light-theme');
      else document.body.classList.remove('light-theme');
      return next;
    });
  }

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        {sections.map((s) => (
          <li key={s.id}>
            <span
              style={currentSection === s.id ? activeLinkStyle : linkStyle}
              onClick={() => setCurrentSection(s.id)}
              onMouseOver={e => e.target.style.color = '#38bdf8'}
              onMouseOut={e => e.target.style.color = currentSection === s.id ? '#38bdf8' : '#a5b4fc'}
            >
              {s.label}
            </span>
          </li>
        ))}
      </ul>
      <button style={toggleStyle} onClick={toggleTheme}>{light ? '🌙 Dark' : '☀️ Light'}</button>
    </nav>
  );
} 