import React from 'react';

export default function Navbar({ user, onLogout, current, setCurrent }) {
  return (
    <nav style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#f5f5f5', padding: 12 }}>
      <span style={{ fontWeight: 'bold', fontSize: 18 }}>NTIK Admin</span>
      <button onClick={() => setCurrent('dashboard')} style={{ fontWeight: current==='dashboard'?'bold':'normal' }}>Dashboard</button>
      <button onClick={() => setCurrent('ecoles')} style={{ fontWeight: current==='ecoles'?'bold':'normal' }}>Écoles</button>
      <button onClick={() => setCurrent('paiements')} style={{ fontWeight: current==='paiements'?'bold':'normal' }}>Paiements</button>
      <button onClick={() => setCurrent('utilisateurs')} style={{ fontWeight: current==='utilisateurs'?'bold':'normal' }}>Utilisateurs</button>
      <button onClick={() => setCurrent('notifications')} style={{ fontWeight: current==='notifications'?'bold':'normal' }}>Notifications</button>
      <button onClick={() => setCurrent('parametres')} style={{ fontWeight: current==='parametres'?'bold':'normal' }}>Paramètres</button>
      <div style={{ flex: 1 }} />
      <span>{user?.email}</span>
      <button onClick={onLogout} style={{ marginLeft: 8 }}>Déconnexion</button>
    </nav>
  );
}
