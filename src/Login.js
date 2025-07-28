

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Connexion réussie !');
      setTimeout(() => navigate('/'), 800);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setError('');
    setResetSent(false);
    if (!email) {
      setError('Veuillez entrer votre email pour réinitialiser.');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setError(error.message);
    } else {
      setResetSent(true);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg,#e0e7ff 0%,#f5f6fa 100%)' }}>
      <form
        onSubmit={showForgot ? handleForgot : handleSubmit}
        style={{ background: '#fff', padding: 36, borderRadius: 16, boxShadow: '0 4px 32px rgba(0,0,0,0.10)', minWidth: 350, maxWidth: 400 }}
        aria-label={showForgot ? 'Formulaire de réinitialisation' : 'Formulaire de connexion'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <img src="/vite.svg" alt="Logo" style={{ width: 56, marginBottom: 8 }} />
          <h2 style={{ color: '#1a237e', fontWeight: 700, fontSize: 26, margin: 0 }}>Espace Admin</h2>
          <span style={{ color: '#555', fontSize: 15, marginTop: 2 }}>Connexion sécurisée</span>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 8, color: '#333', fontWeight: 500 }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #c7d0e1', fontSize: 15 }}
            autoFocus
            autoComplete="username"
            aria-label="Email"
          />
        </div>
        {!showForgot && (
          <div style={{ marginBottom: 18 }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: 8, color: '#333', fontWeight: 500 }}>Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #c7d0e1', fontSize: 15 }}
              autoComplete="current-password"
              aria-label="Mot de passe"
            />
          </div>
        )}
        {error && <div style={{ color: 'red', marginBottom: 14, fontSize: 15 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 14, fontSize: 15 }}>{success}</div>}
        {resetSent && <div style={{ color: '#0057d9', marginBottom: 14, fontSize: 15 }}>Lien de réinitialisation envoyé !</div>}
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: 13, borderRadius: 8, background: '#1a237e', color: '#fff', border: 'none', fontWeight: 600, fontSize: 17, marginBottom: 8, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 2px 8px rgba(26,35,126,0.08)' }}
          aria-busy={loading}
        >
          {showForgot ? (loading ? 'Envoi...' : 'Réinitialiser') : (loading ? 'Connexion...' : 'Se connecter')}
        </button>
        <div style={{ textAlign: 'center', marginTop: 6 }}>
          {!showForgot ? (
            <button
              type="button"
              onClick={() => { setShowForgot(true); setError(''); setResetSent(false); }}
              style={{ background: 'none', border: 'none', color: '#0057d9', textDecoration: 'underline', cursor: 'pointer', fontSize: 15 }}
            >
              Mot de passe oublié ?
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { setShowForgot(false); setError(''); setResetSent(false); }}
              style={{ background: 'none', border: 'none', color: '#1a237e', textDecoration: 'underline', cursor: 'pointer', fontSize: 15 }}
            >
              Retour à la connexion
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
