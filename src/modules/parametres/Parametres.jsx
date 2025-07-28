import React from 'react';

export default function Parametres() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: 320,
      width: '100%',
      marginBottom: 32,
    }}>
      <div style={{
        background: 'linear-gradient(120deg, #181f36 60%, #10182a 100%)',
        borderRadius: 36,
        boxShadow: '0 12px 48px #000a',
        padding: '48px 40px',
        color: '#fff',
        border: '2.5px solid #43e9e9',
        minWidth: 340,
        maxWidth: 480,
        width: '100%',
        position: 'relative',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          marginBottom: 24,
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#43e9e9"/>
            <path d="M10 18v-4a6 6 0 0 1 12 0v4" stroke="#181f36" strokeWidth="2.2" strokeLinecap="round"/>
            <rect x="12" y="20" width="8" height="4" rx="2" fill="#181f36"/>
          </svg>
          <h2 style={{color:'#43e9e9',fontWeight:900,fontSize:26,letterSpacing:1}}>Paramètres</h2>
        </div>
        <div style={{
          fontSize:18,
          color:'#aaa',
          fontWeight:600,
          marginBottom: 8,
        }}>
          Configuration à venir.<br/>
          <span style={{fontSize:15, color:'#43e9e9'}}>Personnalisez votre panneau d’administration ici prochainement.</span>
        </div>
      </div>
    </div>
  );
}
