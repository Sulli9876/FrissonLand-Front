import React, { useState } from 'react';
import { API_BASE_URL } from '../../../config'; // Modifie ce chemin selon ton projet

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormMessage('');

    // Vérification de base
    if (!name || !email || !subject || !message) {
      setFormError('Tous les champs sont requis.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (response.ok) {
        setFormMessage('Votre message a bien été envoyé !');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        const data = await response.json();
        setFormError(data.message || 'Une erreur est survenue lors de l’envoi du message.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setFormError('Erreur serveur, veuillez réessayer plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
    <h1 className="contact-title">Contactez-nous</h1>
    <div className="contact-content">
      <aside className="contact-info">
        <h2>Informations de Contact</h2>
        <p>
          Pour toute question ou besoin d’assistance, n’hésitez pas à nous contacter via le formulaire ou par e-mail.
        </p>
        <p><strong>Adresse :</strong></p>
        <p>ZombieLand S.A.S.</p> 
        <p>123 Rue de l'Apocalypse</p>
        <p>666 Enfer</p> 
        <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
        <p><strong>Email :</strong> <a href="mailto:contact@zombieland.fr">contact@zombieland.fr</a></p>
      </aside>
  
      <section className="contact-form-wrapper">
        <h2>Formulaire de Contact</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Adresse e-mail :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="subject">Objet :</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <label htmlFor="message">Message :</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi...' : 'Envoyer'}
          </button>

          {/* Messages d'erreur ou de succès */}
          {formError && <p className="error-message">{formError}</p>}
          {formMessage && <p className="success-message">{formMessage}</p>}
          </form>
    </section>
  </div>
</main>
  );
};

export default ContactPage;
