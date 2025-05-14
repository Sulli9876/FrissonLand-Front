// LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail: loginEmail, password: loginPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
        window.location.reload();
      } else {
        setLoginError(data.message || 'Erreur de connexion');
      }
    } catch (error) {
      console.error(error);
      setLoginError('Erreur de connexion');
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <h3>Connexion</h3>
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />

            <button type="submit">Se connecter</button>
            {loginError && <p className="auth-error-message">{loginError}</p>}
          </form>

          <div className="auth-redirect">
          <p className="separator">ou : </p>
          <div className="google-button-wrapper">
          <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    const res = await fetch(`${API_BASE_URL}/auth/loginGoogle`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: credentialResponse.credential }),
                    });

                    const data = await res.json();

                    if (res.ok) {
                    localStorage.setItem('token', data.token);
                    navigate('/');
                    window.location.reload();
                    } else {
                    setLoginError(data.message || 'Erreur Google');
                    }
                }}
                onError={() => {
                    setLoginError('Connexion Google échouée');
                }}
                />
            </div>
            <p>Vous n'avez pas de compte ?</p>
            <button onClick={() => navigate('/register')}>S'inscrire</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
