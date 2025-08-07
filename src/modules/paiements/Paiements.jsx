import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function Paiements() {
  const [paiements, setPaiements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPaiements() {
      setLoading(true);
      const { data } = await supabase.from('paiements').select('*');
      setPaiements(data || []);
      setLoading(false);
    }
    fetchPaiements();
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
        <h2 style={{ color: '#3b82f6', margin: 0, letterSpacing: 1, fontSize: 32 }}>Gestion des Paiements</h2>
      </header>
      <main>
        {loading ? (
          <div style={{fontSize:17, color:'#aaa', textAlign: 'center'}}>Chargement…</div>
        ) : paiements.length === 0 ? (
          <div style={{fontSize:17, color:'#aaa', textAlign: 'center'}}>Aucun paiement trouvé.</div>
        ) : (
          <table style={{width:'100%',background:'#10182a',borderRadius:12,boxShadow:'0 2px 8px #0003',color:'#fff',fontSize:16}}>
            <thead>
              <tr style={{color:'#3b82f6',fontWeight:700}}>
                <th style={{padding:'8px', textAlign: 'center'}}>Trimestre</th>
                <th style={{padding:'8px', textAlign: 'center'}}>Montant</th>
                <th style={{padding:'8px', textAlign: 'center'}}>Statut</th>
                <th style={{padding:'8px', textAlign: 'center'}}>Date</th>
                <th style={{padding:'8px', textAlign: 'center'}}>École</th>
              </tr>
            </thead>
            <tbody>
              {paiements.map(p => (
                <tr key={p.id}>
                  <td style={{padding:'8px', textAlign: 'center'}}>{p.trimestre}</td>
                  <td style={{padding:'8px', textAlign: 'center'}}>{p.montant} FCFA</td>
                  <td style={{padding:'8px', textAlign: 'center'}}>{p.statut}</td>
                  <td style={{padding:'8px', textAlign: 'center'}}>{p.date_paiement ? new Date(p.date_paiement).toLocaleDateString() : '—'}</td>
                  <td style={{padding:'8px', textAlign: 'center'}}>{p.school_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
