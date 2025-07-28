import React from 'react';
import { NavLink } from 'react-router-dom';

const sidebarStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: 220,
  background: 'linear-gradient(120deg, #10182a 60%, #181f36 100%)',
  boxShadow: '2px 0 24px #0008',
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 0',
  zIndex: 100,
};
const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: 17,
  padding: '16px 32px',
  borderRadius: 18,
  margin: '4px 12px',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  transition: 'background 0.18s, color 0.18s',
};
const activeStyle = {
  background: 'linear-gradient(120deg, #43e9e9 60%, #e94560 100%)',
  color: '#181f36',
};

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/ecoles', label: 'Écoles', icon: '🏫' },
  { to: '/utilisateurs', label: 'Utilisateurs', icon: '👤' },
  { to: '/frais', label: 'Frais', icon: '💸' },
  { to: '/paiements', label: 'Paiements', icon: '💳' },
  { to: '/parametres', label: 'Paramètres', icon: '⚙️' },
];

export default function Sidebar() {
  return (
    <nav style={sidebarStyle}>
      <div style={{fontWeight:900, fontSize:22, color:'#43e9e9', textAlign:'center', marginBottom:32, letterSpacing:1}}>Admin NTIK</div>
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}
        >
          <span style={{fontSize:20}}>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
