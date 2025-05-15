import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Votre message a été envoyé !');
  };

  return (
    <main >
      <div className='contact'>
        <h1>Contactez-nous</h1>
        <p>
          Pour toute question ou besoin d’assistance, n’hésitez pas à nous contacter via le formulaire ci-dessous ou par e-mail. Nous sommes là pour vous aider à rendre votre expérience à ZombieLand aussi excitante et agréable que possible.
        </p>
        <h2>Informations de Contact</h2>
        <p><strong>Adresse :</strong> ZombieLand S.A.S., 123 Rue de l'Apocalypse, 666 Enfer</p>
        <p><strong>Numéro de téléphone :</strong> +33 1 23 45 67 89</p>
        <p><strong>Adresse e-mail :</strong> <a href="mailto:contact@zombieland.fr">contact@zombieland.fr</a></p>
        <h2>Formulaire de Contact</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;