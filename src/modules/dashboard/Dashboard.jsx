import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEcoles: 0,
    abonnementsActifs: 0,
    abonnementsInactifs: 0,
    paiementsRecents: [],
    alertes: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      
      const { count: totalEcoles } = await supabase
        .from('ecoles')
        .select('*', { count: 'exact', head: true });
      
      const { count: abonnementsActifs } = await supabase
        .from('ecoles')
        .select('*', { count: 'exact', head: true })
        .eq('abonnement_statut', 'actif');
      const { count: abonnementsInactifs } = await supabase
        .from('ecoles')
        .select('*', { count: 'exact', head: true })
        .eq('abonnement_statut', 'inactif');
      
      const { data: paiementsRecents } = await supabase
        .from('paiements')
        .select('*')
        .order('date_paiement', { ascending: false })
        .limit(5);
    
      const { data: alertes } = await supabase
        .from('alertes')
        .select('*')
        .order('date', { ascending: false })
        .limit(5);
      setStats({
        totalEcoles: totalEcoles || 0,
        abonnementsActifs: abonnementsActifs || 0,
        abonnementsInactifs: abonnementsInactifs || 0,
        paiementsRecents: paiementsRecents || [],
        alertes: alertes || []
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) return <div style={{textAlign:'center',marginTop:64}}>Chargement du tableau de bord…</div>;

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
        <h2 style={{ color: '#3b82f6', margin: 0, letterSpacing: 1, fontSize: 32 }}>Tableau de bord NTIK</h2>
      </header>
      <main>
        <div style={{
          display: 'flex',
          gap: 32,
          marginBottom: 40,
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%'
        }}>
          <div style={{
            background: '#181f36',
            borderRadius: 16,
            padding: '32px 40px',
            minWidth: 220,
            flex: '1 1 220px',
            boxShadow: '0 2px 12px #0004',
            border: '1.5px solid #223',
            textAlign: 'center',
            margin: '0 0 16px 0',
          }}>
            <strong style={{ color: '#3b82f6', fontSize: 18 }}>Écoles totales</strong>
            <div style={{ fontSize: 40, fontWeight: 700, marginTop: 10 }}>{stats.totalEcoles}</div>
          </div>
          <div style={{
            background: '#181f36',
            borderRadius: 16,
            padding: '32px 40px',
            minWidth: 220,
            flex: '1 1 220px',
            boxShadow: '0 2px 12px #0004',
            border: '1.5px solid #223',
            textAlign: 'center',
            margin: '0 0 16px 0',
          }}>
            <strong style={{ color: '#43e9e9', fontSize: 18 }}>Abonnements actifs</strong>
            <div style={{ fontSize: 40, fontWeight: 700, marginTop: 10 }}>{stats.abonnementsActifs}</div>
          </div>
          <div style={{
            background: '#181f36',
            borderRadius: 16,
            padding: '32px 40px',
            minWidth: 220,
            flex: '1 1 220px',
            boxShadow: '0 2px 12px #0004',
            border: '1.5px solid #223',
            textAlign: 'center',
            margin: '0 0 16px 0',
          }}>
            <strong style={{ color: '#ff6a88', fontSize: 18 }}>Abonnements inactifs</strong>
            <div style={{ fontSize: 40, fontWeight: 700, marginTop: 10 }}>{stats.abonnementsInactifs}</div>
          </div>
        </div>
        <div style={{
          width: '100%',
          background:'#181f36',
          borderRadius:14,
          padding:32,
          boxShadow:'0 2px 8px #0002',
          border:'1.5px solid #223',
          marginBottom: 32,
          maxWidth: 900,
          margin: 'auto'
        }}>
          <h3 style={{ color: '#3b82f6', marginBottom: 16, fontSize: 22 }}>Paiements récents</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {stats.paiementsRecents.map((p, i) => (
              <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #223', color:'#fff', fontSize: 17 }}>
                <span style={{ color: '#43e9e9', fontWeight: 600 }}>{p.ecole_nom}</span> — <span style={{ color: '#3b82f6' }}>{p.montant} €</span> le <span style={{ color: '#aaa' }}>{p.date_paiement}</span>
              </li>
            ))}
            {stats.paiementsRecents.length === 0 && <li style={{color:'#888'}}>Aucun paiement récent</li>}
          </ul>
        </div>
        <div style={{
          width: '100%',
          background:'#181f36',
          borderRadius:14,
          padding:32,
          boxShadow:'0 2px 8px #0002',
          border:'1.5px solid #223',
          maxWidth: 900,
          margin: 'auto'
        }}>
          <h3 style={{ color: '#3b82f6', marginBottom: 16, fontSize: 22 }}>Alertes</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {stats.alertes.map((a, i) => (
              <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #223', color:'#fff', fontSize: 17 }}>
                <span style={{ color: '#ff6a88', fontWeight: 600 }}>{a.type}</span> — <span>{a.message}</span>
              </li>
            ))}
            {stats.alertes.length === 0 && <li style={{color:'#888'}}>Aucune alerte</li>}
          </ul>
        </div>
      </main>
    </div>
  );
}
