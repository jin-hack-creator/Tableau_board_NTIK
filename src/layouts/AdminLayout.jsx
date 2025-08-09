import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AppHeader from '../components/AppHeader';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', background: '#10182a' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        <AppHeader />
        <main style={{ 
          padding: '20px', 
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          { }
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
