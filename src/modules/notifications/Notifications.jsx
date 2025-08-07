import React from 'react';

export default function Notifications() {
  return (
    <div style={{
      width: '100%',
      maxWidth: 1200,
      color: '#fff'
    }}>
      <header style={{
        background: '#181f36',
        padding: '24px 0 8px 0',
        textAlign: 'center',
        boxShadow: '0 2px 12px #0004',
        borderBottom: '1.5px solid #223',
        borderRadius: '16px',
        marginBottom: '40px'
      }}>
        <h2 style={{ color: '#3b82f6', margin: 0, letterSpacing: 1, fontSize: 32 }}>Notifications</h2>
      </header>
      <main>
        <div style={{fontSize:17, color:'#aaa', textAlign: 'center'}}>Aucune notification pour le moment.</div>
      </main>
    </div>
  );
}
