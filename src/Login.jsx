import { supabase } from './supabaseClient';
import { useState } from 'react';

export default function Login() {
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // On construit l'email à partir du nom d'admin
    const email = `${adminName}@gmail.com`;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #10182a 60%, #1a2236 100%)',
      padding: '0 8px'
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          background: '#181f36',
          borderRadius: 16,
          boxShadow: '0 4px 32px #0008',
          padding: '32px 20px',
          width: '100%',
          maxWidth: 350,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          border: '1.5px solid #223',
        }}
      >
        <h2 style={{
          color: '#e94560',
          textAlign: 'center',
          marginBottom: 8,
          letterSpacing: 1
        }}>Connexion Admin NTIK</h2>
        <input
          type="text"
          placeholder="Nom d'administrateur"
          value={adminName}
          onChange={e => setAdminName(e.target.value)}
          required
          autoCapitalize="off"
          autoCorrect="off"
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            border: '1.5px solid #223',
            background: '#10182a',
            color: '#f3f6fa',
            fontSize: 16,
            outline: 'none',
            marginBottom: 0
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            border: '1.5px solid #223',
            background: '#10182a',
            color: '#f3f6fa',
            fontSize: 16,
            outline: 'none',
            marginBottom: 0
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#e94560cc' : 'linear-gradient(90deg, #e94560 60%, #ff6a88 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 0',
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px #e9456022',
            transition: 'background 0.2s',
            marginTop: 8
          }}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
        {error && <div style={{ color: '#ff6a88', marginTop: 8, textAlign: 'center' }}>{error}</div>}
      </form>
    </div>
  );
}
