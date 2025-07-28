import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function Frais() {
  const [frais, setFrais] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFrais() {
      setLoading(true);
      const { data } = await supabase.from('frais').select('*');
      setFrais(data || []);
      setLoading(false);
    }
    fetchFrais();
  }, []);

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
      <h2 style={{color:'#e94560',fontWeight:800,fontSize:24,marginBottom:18}}>Frais</h2>
      {loading ? (
        <div style={{fontSize:17, color:'#aaa'}}>Chargement…</div>
      ) : frais.length === 0 ? (
        <div style={{fontSize:17, color:'#aaa'}}>Aucun frais trouvé.</div>
      ) : (
        <table style={{width:'100%',background:'#10182a',borderRadius:12,boxShadow:'0 2px 8px #0003',color:'#fff',fontSize:16}}>
          <thead>
            <tr style={{color:'#e94560',fontWeight:700}}>
              <th style={{padding:'8px'}}>Libellé</th>
              <th style={{padding:'8px'}}>Montant</th>
              <th style={{padding:'8px'}}>École</th>
            </tr>
          </thead>
          <tbody>
            {frais.map(f => (
              <tr key={f.id}>
                <td style={{padding:'8px'}}>{f.label}</td>
                <td style={{padding:'8px'}}>{f.montant} FCFA</td>
                <td style={{padding:'8px'}}>{f.school_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
