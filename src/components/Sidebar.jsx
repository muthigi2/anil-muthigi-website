import React, { useState } from "react";

const sidebarStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '180px',
  background: 'rgba(24, 24, 27, 0.92)',
  backdropFilter: 'blur(12px)',
  boxShadow: '2px 0 16px rgba(0,0,0,0.25)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '2rem 0.5rem',
  zIndex: 200,
  borderRight: '1px solid #23272f',
  gap: '1.2rem',
};
const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.7rem',
  padding: '0.6rem 1.2rem',
  borderRadius: '0.6rem',
  color: '#a5b4fc',
  fontWeight: 600,
  fontSize: '1.08rem',
  cursor: 'pointer',
  transition: 'background 0.18s, color 0.18s',
};
const activeItemStyle = {
  ...itemStyle,
  background: 'rgba(56, 189, 248, 0.13)',
  color: '#38bdf8',
};
const iconStyle = {
  fontSize: '1.2rem',
  marginRight: '0.1rem',
};

const actions = [
  { id: 'home', icon: '🏠', label: 'Home', action: (setCurrentSection) => setCurrentSection('about') },
  { id: 'resume', icon: '📄', label: 'Resume', action: (setCurrentSection) => setCurrentSection('about') },
  { id: 'contact', icon: '✉️', label: 'Contact', action: (setCurrentSection) => setCurrentSection('contact') },
  { id: 'github', icon: '🐙', label: 'GitHub', action: () => window.open('https://github.com/muthigi2', '_blank') },
  { id: 'linkedin', icon: '🔗', label: 'LinkedIn', action: () => window.open('https://www.linkedin.com/in/anil-muthigi-06aaa7198/', '_blank') },
];

export default function Sidebar({ currentSection, setCurrentSection }) {
  const [lightTheme, setLightTheme] = useState(false);

  function toggleTheme() {
    setLightTheme((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }
      return next;
    });
  }

  return (
    <aside style={sidebarStyle}>
      {actions.map((a) => (
        <div
          key={a.id}
          title={a.label}
          style={a.id === currentSection ? activeItemStyle : itemStyle}
          onClick={() => a.action(setCurrentSection)}
          onMouseOver={e => e.currentTarget.style.color = '#38bdf8'}
          onMouseOut={e => e.currentTarget.style.color = a.id === currentSection ? '#38bdf8' : '#a5b4fc'}
        >
          <span style={iconStyle}>{a.icon}</span>
          <span>{a.label}</span>
        </div>
      ))}
      <div
        key="theme"
        title="Theme"
        style={itemStyle}
        onClick={toggleTheme}
        onMouseOver={e => e.currentTarget.style.color = '#38bdf8'}
        onMouseOut={e => e.currentTarget.style.color = '#a5b4fc'}
      >
        <span style={iconStyle}>🌓</span>
        <span>{lightTheme ? 'Dark Mode' : 'Light Mode'}</span>
      </div>
    </aside>
  );
} 