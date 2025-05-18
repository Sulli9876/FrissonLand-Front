import React, { useState } from 'react';
import { API_BASE_URL } from '../../../config';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail : email }),
    });

    const data = await res.json();
    setMessage(data.message || 'Un e-mail a été envoyé si le compte existe.');
  };

  return (
    <main className="auth-page">
      <div className="auth-container auth-box">
        <h3 className="auth-title">Réinitialisation du mot de passe</h3>
        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Envoyer un lien</button>
        </form>
        {message && (
          <p className={message.includes('Erreur') ? 'auth-error-message' : 'auth-success-message'}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
