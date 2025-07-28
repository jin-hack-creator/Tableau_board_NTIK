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
      background: 'linear-gradient(120deg, #181f36 60%, #10182a 100%)',
      borderRadius: 32,
      boxShadow: '0 8px 32px #0008',
      padding: '40px',
      color: '#fff',
      border: '2px solid #43e9e9',
      marginBottom: 32,
      minHeight: 200,
    }}>
      <h2 style={{color:'#43e9e9',fontWeight:800,fontSize:24,marginBottom:18}}>Utilisateurs</h2>
      {loading ? (
        <div style={{fontSize:17, color:'#aaa'}}>Chargement…</div>
      ) : users.length === 0 ? (
        <div style={{fontSize:17, color:'#aaa'}}>Aucun utilisateur trouvé.</div>
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
    </div>
  );
}
