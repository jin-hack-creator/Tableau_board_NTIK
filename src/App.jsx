import { useEffect, useState } from 'react';
import Login from './Login.jsx';


import Sidebar from './Sidebar';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const [current, setCurrent] = useState('dashboard');
  const user = { email: 'admin@ntik.local' };
  const handleLogout = () => {};
  return (
    <BrowserRouter>
      <div style={{display:'flex', minHeight:'100vh', background:'#10182a'}}>
        <Sidebar />
        <main style={{marginLeft:220, flex:1, padding:'32px 0 0 0', minHeight:'100vh', background:'linear-gradient(120deg, #10182a 60%, #181f36 100%)'}}>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
