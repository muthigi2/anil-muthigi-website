import React from "react";

const fabStyle = {
  position: 'fixed',
  bottom: '2.5rem',
  right: '2.5rem',
  zIndex: 300,
  background: 'linear-gradient(135deg, #38bdf8 0%, #f472b6 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: '64px',
  height: '64px',
  boxShadow: '0 4px 32px #38bdf8aa, 0 2px 8px #000a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  animation: 'fabPop 1.2s cubic-bezier(0.4,0,0.2,1)',
};

function openMailClient(email) {
  const url = `mailto:${email}`;
  const win = window.open(url, '_self');
  if (!win) {
    window.location.href = url;
  }
}

export default function FloatingAction({ contact }) {
  return (
    <>
      <button
        style={fabStyle}
        title="Contact Me"
        onClick={() => openMailClient(contact.email)}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.12)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        ✉️
      </button>
      <style>{`
        @keyframes fabPop {
          0% { transform: scale(0.5); opacity: 0; }
          80% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
} 