
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function SchoolList() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchools();
    // eslint-disable-next-line
  }, []);

  async function fetchSchools() {
    setLoading(true);
    const { data, error } = await supabase
      .from('ecoles')
      .select('*')
      .order('created_at', { ascending: false });
    setSchools(data || []);
    setLoading(false);
  }

  // Ajout d'une école
  const [showModal, setShowModal] = useState(false);
  const [newSchool, setNewSchool] = useState({ name: '', address: '', phone: '', email: '' });
  const [adding, setAdding] = useState(false);

  async function handleAddSchool(e) {
    e.preventDefault();
    setAdding(true);
    console.log('Adding school:', JSON.stringify(newSchool, null, 2));
    const { data, error } = await supabase
      .from('ecoles')
      .insert(newSchool);
    console.log('Supabase response:', { data, error });
    if (error) {
      console.error('Error adding school:', error);
    } else if (data) {
      fetchSchools();
    }
    setAdding(false);
    setShowModal(false);
    setNewSchool({ name: '', address: '', phone: '', email: '' });
    fetchSchools();
  }

  if (loading) return <div style={{textAlign:'center',marginTop:32}}>Chargement des écoles…</div>;

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
        <h2 style={{ color: '#43e9e9', margin: 0, letterSpacing: 1, fontSize: 32 }}>Liste des Écoles</h2>
      </header>
      <main>
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:24,width:'100%'}}>
          <button style={addBtnStyle} title="Ajouter une école" onClick={()=>setShowModal(true)}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:8}}><circle cx="11" cy="11" r="11" fill="#3b82f6"/><path d="M11 6v10M6 11h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            Ajouter
          </button>
        </div>
        <div style={{overflowX: 'auto'}}>
          <table style={tableStyle}>
            <thead>
              <tr style={{background:'rgba(25,30,60,0.98)', boxShadow:'0 2px 8px #0004'}}>
                <th style={thStyle}>Nom</th>
                <th style={thStyle}>Adresse</th>
                <th style={thStyle}>Téléphone</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Date création</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schools.map(school => (
                <tr key={school.id} style={trStyle} onClick={() => navigate(`/ecoles/${school.id}`)} title="Voir la fiche de l'école" tabIndex={0} onKeyDown={e => {if(e.key==='Enter'){navigate(`/ecoles/${school.id}`)}}}>
                  <td style={{...tdStyle, cursor:'pointer', textDecoration:'underline', color:'#43e9e9', fontWeight:700}}>{school.name}</td>
                  <td style={tdStyle}>{school.address || '-'}</td>
                  <td style={tdStyle}>{school.phone || '-'}</td>
                  <td style={tdStyle}>{school.email || '-'}</td>
                  <td style={{...tdStyle, fontSize:15, color:'#3b82f6'}}>{school.created_at ? new Date(school.created_at).toLocaleDateString() : '-'}</td>
                  <td style={tdStyle}>
                    <button style={actionBtnStyle} title="Éditer" onClick={e => {e.stopPropagation();}}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="10" fill="#43e9e9"/><path d="M6 14l1.5-1.5m0 0L14 6.5a1.06 1.06 0 0 0-1.5-1.5L6 11m1.5 1.5L6 14" stroke="#10182a" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </button>
                    <button style={{...actionBtnStyle,marginLeft:8}} title="Supprimer" onClick={e => {e.stopPropagation();}}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="10" fill="#3b82f6"/><path d="M7 13l6-6m0 6l-6-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {schools.length === 0 && (
                <tr><td colSpan={6} style={{textAlign:'center',color:'#3b82f6',padding:24, fontWeight:600, fontSize:18}}>Aucune école trouvée</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Modal d'ajout d'école */}
        {showModal && (
          <div style={{
            position:'fixed',top:0,left:0,right:0,bottom:0,
            background:'rgba(20,24,40,0.85)',zIndex:99,
            display:'flex',alignItems:'center',justifyContent:'center',
          }}>
            <form onSubmit={(e) => { e.preventDefault(); console.log('Form submitted'); handleAddSchool(e); }} style={{
              background:'linear-gradient(120deg, #181f36 60%, #10182a 100%)',
              borderRadius:32,
              boxShadow:'0 8px 32px #0008',
              padding:'40px 32px',
              minWidth:340,
              display:'flex',flexDirection:'column',gap:18,
              border:'2px solid #3b82f6',
              color:'#fff',
              position:'relative',
            }}>
              <h2 style={{marginBottom:12,fontWeight:800,fontSize:22,color:'#3b82f6'}}>Ajouter une école</h2>
              <input required placeholder="Nom" value={newSchool.name} onChange={e=>setNewSchool(s=>({...s,name:e.target.value}))} style={inputStyle}/>
              <input placeholder="Adresse" value={newSchool.address} onChange={e=>setNewSchool(s=>({...s,address:e.target.value}))} style={inputStyle}/>
              <input placeholder="Téléphone" value={newSchool.phone} onChange={e=>setNewSchool(s=>({...s,phone:e.target.value}))} style={inputStyle}/>
              <input placeholder="Email" value={newSchool.email} onChange={e=>setNewSchool(s=>({...s,email:e.target.value}))} style={inputStyle}/>
              <div style={{display:'flex',justifyContent:'flex-end',gap:12,marginTop:8}}>
                <button type="button" style={{...addBtnStyle,background:'#222',color:'#fff',boxShadow:'none',padding:'10px 22px'}} onClick={()=>setShowModal(false)}>Annuler</button>
                <button type="submit" style={{...addBtnStyle,background:'#3b82f6',color:'#fff',boxShadow:'0 2px 12px #3b82f622',padding:'10px 22px'}} disabled={adding}>{adding ? 'Ajout...' : 'Ajouter'}</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  background: 'rgba(25,30,60,0.96)',
  color: '#fff',
  borderRadius: 28,
  boxShadow: '0 4px 24px #0007',
  overflow: 'hidden',
  minWidth: 600,
};
const thStyle = {
  padding: '20px 16px',
  color: '#fff',
  fontWeight: 900,
  fontSize: 18,
  borderBottom: '3px solid #3b82f6',
  textAlign: 'left',
  background: 'rgba(25,30,60,0.98)',
  letterSpacing: 0.7,
};
const tdStyle = {
  padding: '16px 14px',
  fontSize: 16,
  background: 'none',
  borderBottom: '1.5px solid #223',
  textAlign: 'center',
};
const trStyle = {
  transition: 'background 0.18s',
  cursor: 'pointer',
  background: 'none',
  borderRadius: 18,
  boxShadow: '0 1px 8px #0002',
};
const addBtnStyle = {
  background: 'linear-gradient(120deg, #3b82f6 60%, #181f36 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 28,
  padding: '14px 32px',
  fontWeight: 800,
  fontSize: 18,
  cursor: 'pointer',
  boxShadow: '0 4px 16px #3b82f644',
  transition: 'background 0.2s, box-shadow 0.2s',
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
};
const actionBtnStyle = {
  background: 'linear-gradient(120deg, #43e9e9 60%, #181f36 100%)',
  color: '#3b82f6',
  border: 'none',
  borderRadius: '50%',
  padding: 8,
  fontSize: 17,
  cursor: 'pointer',
  boxShadow: '0 2px 8px #0002',
  transition: 'background 0.18s, box-shadow 0.18s',
  outline: 'none',
  position: 'relative',
  zIndex: 1,
};

const inputStyle = {
  padding: '12px 16px',
  borderRadius: 12,
  border: '2px solid #3b82f6',
  fontSize: 16,
  background: 'rgba(25,30,60,0.98)',
  color: '#fff',
  outline: 'none',
  fontWeight: 600,
  marginBottom: 4,
  boxShadow: '0 2px 12px #0003',
  transition: 'border 0.18s, box-shadow 0.18s',
  letterSpacing: 0.5,
  width: '100%',
  boxSizing: 'border-box',
}
