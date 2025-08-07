

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './Login.css';

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
    <div className="login-container">
      <form
        onSubmit={showForgot ? handleForgot : handleSubmit}
        className="login-form"
        aria-label={showForgot ? 'Formulaire de réinitialisation' : 'Formulaire de connexion'}
      >
        <div className="login-header">
          <img src="/vite.svg" alt="Logo" className="login-logo" />
          <h2 className="login-title">Espace Admin</h2>
          <span className="login-subtitle">Connexion sécurisée</span>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="form-input"
            autoFocus
            autoComplete="username"
            aria-label="Email"
          />
        </div>
        {!showForgot && (
          <div className="form-group">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="form-input"
              autoComplete="current-password"
              aria-label="Mot de passe"
            />
          </div>
        )}
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        {resetSent && <div className="form-info">Lien de réinitialisation envoyé !</div>}
        <button
          type="submit"
          disabled={loading}
          className="submit-button"
          aria-busy={loading}
        >
          {showForgot ? (loading ? 'Envoi...' : 'Réinitialiser') : (loading ? 'Connexion...' : 'Se connecter')}
        </button>
        <div className="forgot-password-container">
          {!showForgot ? (
            <button
              type="button"
              onClick={() => { setShowForgot(true); setError(''); setResetSent(false); }}
              className="forgot-password-button"
            >
              Mot de passe oublié ?
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { setShowForgot(false); setError(''); setResetSent(false); }}
              className="back-to-login-button"
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
