import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function Utilisateurs() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const { data } = await supabase.from('users').select('*');
      setUsers(data || []);
      setLoading(false);
    }
    fetchUsers();
  }, []);

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
        <h2 style={{ color: '#43e9e9', margin: 0, letterSpacing: 1, fontSize: 32 }}>Gestion des Utilisateurs</h2>
      </header>
      <main>
        {loading ? (
          <div style={{fontSize:17, color:'#aaa', textAlign: 'center'}}>Chargement…</div>
        ) : users.length === 0 ? (
          <div style={{fontSize:17, color:'#aaa', textAlign: 'center'}}>Aucun utilisateur trouvé.</div>
        ) : (
          <table style={{width:'100%',background:'#10182a',borderRadius:12,boxShadow:'0 2px 8px #0003',color:'#fff',fontSize:16}}>
            <thead>
              <tr style={{color:'#43e9e9',fontWeight:700}}>
                <th style={{padding:'8px'}}>Nom</th>
                <th style={{padding:'8px'}}>Email</th>
                <th style={{padding:'8px'}}>Rôle</th>
                <th style={{padding:'8px'}}>École</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td style={{padding:'8px'}}>{u.name}</td>
                  <td style={{padding:'8px'}}>{u.email}</td>
                  <td style={{padding:'8px'}}>{u.role}</td>
                  <td style={{padding:'8px'}}>{u.school_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
