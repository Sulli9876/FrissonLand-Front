// RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
import { GoogleLogin } from '@react-oauth/google';



const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [signupFirstname, setSignupFirstname] = useState('');
  const [signupLastname, setSignupLastname] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  const [loginError, setLoginError] = useState('');


  const validateForm = () => {
    if (!signupFirstname || !signupLastname ||  !signupEmail || !signupPassword || !signupConfirmPassword) {
      setSignupError('Tous les champs sont requis.');
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupEmail)) {
      setSignupError('Adresse email invalide.');
      return false;
    }
  
    if (signupPassword.length < 8) {
      setSignupError('Le mot de passe doit contenir au moins 8 caractères.');
      return false;
    }
  
    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Les mots de passe ne correspondent pas.');
      return false;
    }
  
    return true;
  };
  
  const handleSignupSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSignupError('');
    setSignupSuccess('');

    if (!validateForm()) {
        return;
      }
    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            first_name: signupFirstname.trim(),
            last_name: signupLastname.trim(),
          mail: signupEmail,
          password: signupPassword,
          role: 'user',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSignupSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      } else {
        setSignupError(data.message || "Erreur d'inscription");
      }
    } catch (error) {
      console.error('Erreur d’inscription :', error);
      setSignupError("Erreur d'inscription");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <h3>Inscription</h3>
          <form onSubmit={handleSignupSubmit} className="auth-form">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              id="firstname"
              value={signupFirstname}
              onChange={(e) => setSignupFirstname(e.target.value)}
              required
            />

            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              id="lastname"
              value={signupLastname}
              onChange={(e) => setSignupLastname(e.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              value={signupConfirmPassword}
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
              required
            />
                {signupError && <p className="auth-error-message">{signupError}</p>}
            <button type="submit">S'inscrire</button>

            {signupSuccess && <p className="auth-success-message">{signupSuccess}</p>}
          </form>
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
      </div>
    </main>
  );
};

export default RegisterPage;
