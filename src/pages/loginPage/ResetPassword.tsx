import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // 🛠️ Ajouté ici
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Mot de passe réinitialisé.');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setMessage(data.message || 'Erreur');
    }
  };

  return (
    <main className="auth-page">
        <div className="auth-container"> 
      <h3 className="auth-title">Réinitialiser le mot de passe</h3>
    <div className=" auth-box">
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="new-password">Nouveau mot de passe</label>
        <input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label htmlFor="confirm-password">Confirmer le mot de passe</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Réinitialiser</button>
      </form>
      {message && (
        <p className={message.includes('Erreur') ? 'auth-error-message' : 'auth-success-message'}>
          {message}
        </p>
      )}
    </div>
    </div>
  </main>
  );
};

export default ResetPasswordPage;
