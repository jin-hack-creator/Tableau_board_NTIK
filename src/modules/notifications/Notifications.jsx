import React from 'react';

export default function Notifications() {
  return (
    <div style={{
      background: 'linear-gradient(120deg, #181f36 60%, #10182a 100%)',
      borderRadius: 32,
      boxShadow: '0 8px 32px #0008',
      padding: '40px',
      color: '#fff',
      border: '2px solid #e94560',
      marginBottom: 32,
      minHeight: 200,
    }}>
      <h2 style={{color:'#e94560',fontWeight:800,fontSize:24,marginBottom:18}}>Notifications</h2>
      <div style={{fontSize:17, color:'#aaa'}}>Aucune notification pour le moment.</div>
    </div>
  );
}
