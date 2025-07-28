import React from 'react';

export default function AppHeader() {
  return (
    <header style={{
      width: '100%',
      background: 'linear-gradient(90deg, #10182a 60%, #181f36 100%)',
      padding: '0 0 0 0',
      minHeight: 64,
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 2px 12px #0004',
      borderBottom: '2px solid #e94560',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{display:'flex',alignItems:'center',gap:16,marginLeft:32}}>
        <div style={{width:40,height:40,borderRadius:'50%',background:'#e94560',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:900,fontSize:22,boxShadow:'0 2px 8px #e9456022'}}>N</div>
        <span style={{fontWeight:700,fontSize:22,letterSpacing:1,color:'#fff'}}>NTIK Admin Panel</span>
      </div>
    </header>
  );
}
