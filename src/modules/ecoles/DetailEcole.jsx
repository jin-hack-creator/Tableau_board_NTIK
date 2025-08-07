export default function DetailEcole() {
  const [showPaiementModal, setShowPaiementModal] = useState(false);
  const [newPaiement, setNewPaiement] = useState({ trimestre: '', montant: '', statut: 'payé', date_paiement: '' });
  const [addingPaiement, setAddingPaiement] = useState(false);
  const [showFraisModal, setShowFraisModal] = useState(false);
  const [newFrais, setNewFrais] = useState({ label: '', montant: '' });
  const [addingFrais, setAddingFrais] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'directeur' });
  const [addingUser, setAddingUser] = useState(false);
  const { id } = useParams();
  const [ecole, setEcole] = useState(null);
  const [users, setUsers] = useState([]);
  const [frais, setFrais] = useState([]);
  const [paiements, setPaiements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: ecoleData } = await supabase.from('schools').select('*').eq('id', id).single();
      let statut = ecoleData?.status;
      const { data: paiementsData } = await supabase.from('paiements').select('*').eq('school_id', id);
      if (paiementsData && paiementsData.some(p => p.statut === 'retard')) {
        if (statut !== 'bloqué') {
          await supabase.from('schools').update({ status: 'bloqué' }).eq('id', id);
          statut = 'bloqué';
        }
      }
      setEcole({ ...ecoleData, status: statut });

      const { data: usersData } = await supabase.from('users').select('*').eq('school_id', id);
      setUsers(usersData || []);

      const { data: fraisData } = await supabase.from('frais').select('*').eq('school_id', id);
      setFrais(fraisData || []);
      setPaiements(paiementsData || []);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  async function handleBlock() {
    setUpdating(true);
    await supabase.from('schools').update({ status: 'bloqué' }).eq('id', id);
    setEcole(e => ({ ...e, status: 'bloqué' }));
    setUpdating(false);
  }
  async function handleUnblock() {
    setUpdating(true);
    await supabase.from('schools').update({ status: 'actif' }).eq('id', id);
    setEcole(e => ({ ...e, status: 'actif' }));
    setUpdating(false);
  }

  if (loading) return <div style={{textAlign:'center',marginTop:32}}>Chargement…</div>;
  if (!ecole) return <div style={{textAlign:'center',marginTop:32,color:'#3b82f6'}}>École introuvable</div>;

  return (
    <div style={{
      maxWidth: 1100,
      margin: '0 auto',
      background: 'linear-gradient(120deg, #181f36 60%, #10182a 100%)',
      borderRadius: 36,
      boxShadow: '0 12px 48px #000a',
      padding: '48px 40px',
      color: '#fff',
      border: '2.5px solid #3b82f6',
      marginTop: 32,
    }}>
      <h2 style={{color:'#3b82f6',fontWeight:900,fontSize:28,letterSpacing:1,marginBottom:24}}>Fiche École</h2>
      <div style={{display:'flex',gap:32,flexWrap:'wrap'}}>
        <section style={{flex:2,minWidth:320}}>
          <h3 style={{color:'#43e9e9',fontWeight:800,fontSize:20,marginBottom:12}}>Informations générales</h3>
          <div style={{fontSize:17,marginBottom:8}}><b>Nom :</b> {ecole.name}</div>
          <div style={{fontSize:17,marginBottom:8}}><b>Adresse :</b> {ecole.address || '-'}</div>
          <div style={{fontSize:17,marginBottom:8}}><b>Téléphone :</b> {ecole.phone || '-'}</div>
          <div style={{fontSize:17,marginBottom:8}}><b>Email :</b> {ecole.email || '-'}</div>
          <div style={{fontSize:17,marginBottom:8}}><b>Statut :</b> <span style={{color:'#fff',background:ecole.status==='bloqué'?'#3b82f6':'#43e9e9',borderRadius:8,padding:'2px 10px',fontWeight:700}}>{ecole.status==='bloqué'?'Bloqué':'Actif'}</span></div>
        </section>
        <section style={{flex:3,minWidth:320}}>
          <h3 style={{color:'#43e9e9',fontWeight:800,fontSize:20,marginBottom:12}}>Utilisateurs liés</h3>
          {users.length === 0 && <div style={{color:'#aaa',fontSize:16}}>Aucun utilisateur lié</div>}
          {users.map(user => (
            <div key={user.id} style={{background:'#10182a',borderRadius:12,padding:16,marginBottom:12}}>
              <div style={{fontWeight:700}}>{user.name} <span style={{color:'#43e9e9',fontWeight:600}}>({user.role})</span></div>
              <div style={{fontSize:15}}>Email : {user.email}</div>
              <div style={{fontSize:15}}>Mot de passe : ********</div>
            </div>
          ))}
          <button
            style={{background:'#43e9e9',color:'#181f36',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:700,fontSize:16,marginTop:8,cursor:'pointer'}}
            onClick={()=>setShowUserModal(true)}
          >Ajouter un utilisateur</button>
      {/* Modal ajout utilisateur */}
      {showUserModal && (
        <div style={{
          position:'fixed',top:0,left:0,right:0,bottom:0,
          background:'rgba(20,24,40,0.85)',zIndex:99,
          display:'flex',alignItems:'center',justifyContent:'center',
        }}>
          <form onSubmit={async e => {
            e.preventDefault();
            setAddingUser(true);
            await supabase.from('users').insert([{ ...newUser, school_id: id }]);
            setAddingUser(false);
            setShowUserModal(false);
            setNewUser({ name: '', email: '', password: '', role: 'directeur' });
            // Rafraîchir la liste
            const { data: usersData } = await supabase.from('users').select('*').eq('school_id', id);
            setUsers(usersData || []);
          }} style={{
            background:'linear-gradient(120deg, #181f36 60%, #10182a 100%)',
            borderRadius:32,
            boxShadow:'0 8px 32px #0008',
            padding:'40px 32px',
            minWidth:340,
            display:'flex',flexDirection:'column',gap:18,
            border:'2px solid #43e9e9',
            color:'#fff',
            position:'relative',
          }}>
            <h2 style={{marginBottom:12,fontWeight:800,fontSize:22,color:'#43e9e9'}}>Nouvel utilisateur</h2>
            <input required placeholder="Nom" value={newUser.name} onChange={e=>setNewUser(s=>({...s,name:e.target.value}))} style={{padding:'12px 16px',borderRadius:18,border:'1.5px solid #43e9e9',fontSize:16,background:'#181f36',color:'#fff',outline:'none',fontWeight:600,marginBottom:2,boxShadow:'0 1px 6px #0002',transition:'border 0.18s'}}/>
            <input required type="email" placeholder="Email" value={newUser.email} onChange={e=>setNewUser(s=>({...s,email:e.target.value}))} style={{padding:'12px 16px',borderRadius:18,border:'1.5px solid #43e9e9',fontSize:16,background:'#181f36',color:'#fff',outline:'none',fontWeight:600,marginBottom:2,boxShadow:'0 1px 6px #0002',transition:'border 0.18s'}}/>
            <input required placeholder="Mot de passe" value={newUser.password} onChange={e=>setNewUser(s=>({...s,password:e.target.value}))} style={{padding:'12px 16px',borderRadius:18,border:'1.5px solid #43e9e9',fontSize:16,background:'#181f36',color:'#fff',outline:'none',fontWeight:600,marginBottom:2,boxShadow:'0 1px 6px #0002',transition:'border 0.18s'}}/>
            <select value={newUser.role} onChange={e=>setNewUser(s=>({...s,role:e.target.value}))} style={{padding:'12px 16px',borderRadius:18,border:'1.5px solid #43e9e9',fontSize:16,background:'#181f36',color:'#fff',outline:'none',fontWeight:600,marginBottom:2}}>
              <option value="directeur">Directeur</option>
              <option value="comptable">Comptable</option>
              <option value="employé">Employé</option>
            </select>
            <div style={{display:'flex',justifyContent:'flex-end',gap:12,marginTop:8}}>
              <button type="button" style={{background:'#222',color:'#fff',border:'none',borderRadius:18,padding:'10px 22px',fontWeight:700,fontSize:16,boxShadow:'none'}} onClick={()=>setShowUserModal(false)}>Annuler</button>
              <button type="submit" style={{background:'#43e9e9',color:'#181f36',border:'none',borderRadius:18,padding:'10px 22px',fontWeight:700,fontSize:16,boxShadow:'0 2px 12px #43e9e922'}} disabled={addingUser}>{addingUser ? 'Ajout...' : 'Ajouter'}</button>
            </div>
          </form>
        </div>
      )}
        </section>
      </div>
      {/* Les sections Frais et Paiements restent à rendre dynamiques */}
      <div style={{display:'flex',gap:32,marginTop:32,flexWrap:'wrap'}}>
        <section style={{flex:2,minWidth:320}}>
          <h3 style={{color:'#43e9e9',fontWeight:800,fontSize:20,marginBottom:12}}>Frais définis</h3>
          <ul style={{fontSize:17,paddingLeft:18}}>
            {frais.length === 0 && <li style={{color:'#aaa'}}>Aucun frais défini</li>}
            {frais.map(f => (
              <li key={f.id}>{f.label} : {f.montant} FCFA</li>
            ))}
          </ul>
          <button
            style={{background:'#3b82f6',color:'#fff',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:700,fontSize:16,marginTop:8,cursor:'pointer'}}
            onClick={()=>setShowFraisModal(true)}
          >Ajouter un frais</button>
      {/* Modal ajout frais */}
      {showFraisModal && (
        <div style={{
          position:'fixed',top:0,left:0,right:0,bottom:0,
          background:'rgba(20,24,40,0.85)',zIndex:99,
          display:'flex',alignItems:'center',justifyContent:'center',
        }}>
          <form onSubmit={async e => {
            e.preventDefault();
            setAddingFrais(true);
            await supabase.from('frais').insert([{ ...newFrais, school_id: id }]);
            setAddingFrais(false);
            setShowFraisModal(false);
            setNewFrais({ label: '', montant: '' });
            // Rafraîchir la liste
            const { data: fraisData } = await supabase.from('frais').select('*').eq('school_id', id);
            setFrais(fraisData || []);
          }} style={{
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
            <h2 style={{marginBottom:12,fontWeight:800,fontSize:22,color:'#3b82f6'}}>Nouveau frais</h2>
            <input required placeholder="Libellé" value={newFrais.label} onChange={e=>setNewFrais(s=>({...s,label:e.target.value}))} style={{padding:'12px 16px',borderRadius:18,border:'1.5px solid #3b82f6',fontSize:16,background:'#181f36',color:'#fff',outline:'none',fontWeight:600,marginBottom:2,boxShadow:'0 1px 6px #0002',transition:'border 0.18s'}}/>
            <input required type="number" placeholder="Montant (FCFA)" value={newFrais.montant} onChange={e=>setNewFrais(s=>({...s,montant:e.target.value}))} style={{padding:'12px 16px',borderRadius:18,border:'1.5px solid #3b82f6',fontSize:16,background:'#181f36',color:'#fff',outline:'none',fontWeight:600,marginBottom:2,boxShadow:'0 1px 6px #0002',transition:'border 0.18s'}}/>
            <div style={{display:'flex',justifyContent:'flex-end',gap:12,marginTop:8}}>
              <button type="button" style={{background:'#222',color:'#fff',border:'none',borderRadius:18,padding:'10px 22px',fontWeight:700,fontSize:16,boxShadow:'none'}} onClick={()=>setShowFraisModal(false)}>Annuler</button>
              <button type="submit" style={{background:'#3b82f6',color:'#fff',border:'none',borderRadius:18,padding:'10px 22px',fontWeight:700,fontSize:16,boxShadow:'0 2px 12px #3b82f622'}} disabled={addingFrais}>{addingFrais ? 'Ajout...' : 'Ajouter'}</button>
            </div>
          </form>
        </div>
      )}
        </section>
        <section style={{flex:3,minWidth:320}}>
          <h3 style={{color:'#43e9e9',fontWeight:800,fontSize:20,marginBottom:12}}>Historique des paiements</h3>
          <button
            style={{background:'#43e9e9',color:'#181f36',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:700,fontSize:16,marginBottom:12,cursor:'pointer'}}
            onClick={()=>setShowPaiementModal(true)}
          >Ajouter un paiement</button>
          <table style={{width:'100%',background:'#10182a',borderRadius:12,boxShadow:'0 2px 8px #0003',color:'#fff',fontSize:16}}>
      {/* Modal ajout paiement */}
      {showPaiementModal && (
        <div style={{
          position:'fixed',top:0,left:0,right:0,bottom:0,
          background:'rgba(20,24,40,0.85)',zIndex:99,
          display:'flex',alignItems:'center',justifyContent:'center',
        }}>
          <form onSubmit={async e => {
            e.preventDefault();
            setAddingPaiement(true);
            await supabase.from('paiements').insert([{ ...newPaiement, school_id: id }]);
            setAddingPaiement(false);
            setShowPaiementModal(false);
            setNewPaiement({ trimestre: '', montant: '', statut: 'payé', date_paiement: '' });
            // Rafraîchir la liste
            const { data: paiementsData } = await supabase.from('paiements').select('*').eq('school_id', id);
            setPaiements(paiementsData || []);
          }} style={{
            background:'linear-gradient(120deg, #181f36 60%, #10182a 100%)',
            borderRadius:32,
            boxShadow:'0 8px 32px #0008',
            padding:'40px 32px',
            minWidth:340,
            display:'flex',flexDirection:'column',gap:18,
            border:'2px solid #43e9e9',
            color:'#fff',
            position:'relative',
          }}>
            <h2 style={{marginBottom:12,fontWeight:800,fontSize:22,color:'#43e9e9'}}>Nouveau paiement</h2>
            <input required placeholder="Trimestre" value={newPaiement.trimestre} onChange={e=>setNewPaiement(s=>({...s,trimestre:e.target.value}))} style={{padding:'12px 16px',borderRadius:18,border:'1.5px solid #43e9e9',fontSize:16,background:'#181f36',color:'#fff',outline:'none',fontWeight:600,marginBottom:2,boxShadow:'0 1px 6px #0002',transition:'border 0.18s'}}/>
            <input required type="number" placeholder="Montant (FCFA)" value={newPaiement.montant} onChange={e=>setNewPaiement(s=>({...s,montant:e.target.value}))} style={{padding:'12px 16px',borderRadius:18,border:'1.5px solid #43e9e9',fontSize:16,background:'#181f36',color:'#fff',outline:'none',fontWeight:600,marginBottom:2,boxShadow:'0 1px 6px #0002',transition:'border 0.18s'}}/>
            <select value={newPaiement.statut} onChange={e=>setNewPaiement(s=>({...s,statut:e.target.value}))} style={{padding:'12px 16px',borderRadius:18,border:'1.5px solid #43e9e9',fontSize:16,background:'#181f36',color:'#fff',outline:'none',fontWeight:600,marginBottom:2}}>
              <option value="payé">Payé</option>
              <option value="retard">En retard</option>
            </select>
            <input type="date" placeholder="Date de paiement" value={newPaiement.date_paiement} onChange={e=>setNewPaiement(s=>({...s,date_paiement:e.target.value}))} style={{padding:'12px 16px',borderRadius:18,border:'1.5px solid #43e9e9',fontSize:16,background:'#181f36',color:'#fff',outline:'none',fontWeight:600,marginBottom:2,boxShadow:'0 1px 6px #0002',transition:'border 0.18s'}}/>
            <div style={{display:'flex',justifyContent:'flex-end',gap:12,marginTop:8}}>
              <button type="button" style={{background:'#222',color:'#fff',border:'none',borderRadius:18,padding:'10px 22px',fontWeight:700,fontSize:16,boxShadow:'none'}} onClick={()=>setShowPaiementModal(false)}>Annuler</button>
              <button type="submit" style={{background:'#43e9e9',color:'#181f36',border:'none',borderRadius:18,padding:'10px 22px',fontWeight:700,fontSize:16,boxShadow:'0 2px 12px #43e9e922'}} disabled={addingPaiement}>{addingPaiement ? 'Ajout...' : 'Ajouter'}</button>
            </div>
          </form>
        </div>
      )}
            <thead>
              <tr style={{color:'#43e9e9',fontWeight:700}}>
                <th style={{padding:'8px'}}>Trimestre</th>
                <th style={{padding:'8px'}}>Montant</th>
                <th style={{padding:'8px'}}>Statut</th>
                <th style={{padding:'8px'}}>Date</th>
              </tr>
            </thead>
            <tbody>
              {paiements.length === 0 && (
                <tr><td colSpan={4} style={{textAlign:'center',color:'#aaa',padding:16}}>Aucun paiement enregistré</td></tr>
              )}
              {paiements.map(p => (
                <tr key={p.id}>
                  <td style={{padding:'8px'}}>{p.trimestre || '-'}</td>
                  <td style={{padding:'8px'}}>{p.montant} FCFA</td>
                  <td style={{padding:'8px'}}>
                    <span style={{background:p.statut==='payé'?'#43e9e9':'#3b82f6',color:p.statut==='payé'?'#181f36':'#fff',borderRadius:8,padding:'2px 10px',fontWeight:700}}>
                      {p.statut==='payé'?'Payé':(p.statut==='retard'?'En retard':p.statut)}
                    </span>
                  </td>
                  <td style={{padding:'8px'}}>{p.date_paiement ? new Date(p.date_paiement).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <div style={{marginTop:32,display:'flex',gap:18,justifyContent:'flex-end'}}>
        <button
          style={{background:'#3b82f6',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:800,fontSize:17,cursor:'pointer',opacity:ecole.status==='bloqué'?0.5:1}}
          onClick={handleBlock}
          disabled={ecole.status==='bloqué'||updating}
        >Bloquer l’accès</button>
        <button
          style={{background:'#43e9e9',color:'#181f36',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:800,fontSize:17,cursor:'pointer',opacity:ecole.status!=='bloqué'?0.5:1}}
          onClick={handleUnblock}
          disabled={ecole.status!=='bloqué'||updating}
        >Débloquer</button>
      </div>
    </div>
  );
}
