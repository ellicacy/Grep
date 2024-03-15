import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios-client';

export default function TestMailSuivi() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER')));

  const handleUserChange = () => {
    setUser(localStorage.getItem('USER'));
  };

  useEffect(() => {
    window.addEventListener('storage', handleUserChange);
    return () => {
      window.removeEventListener('storage', handleUserChange);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Contenu du mail généré dans le code
    const content = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.4; font-size: 0.9em; max-width: 800px; margin: 0 auto;">
    <div style="background-color: #2FAF94; padding: 20px; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; color: #fff;">Sparkling Events</h1>
    </div>
    <p>Bonjour,</p>
    <p>Nous espérons que votre événement s'est bien passé. Pour nous aider à améliorer nos services, nous vous invitons à laisser un avis sur les prestations que vous avez choisies lors de votre événement :</p>
    <ul style="list-style-type: none; padding: 0;">
        <li><a href="https://www.example.com/review?prestation=1" target="_blank" style="color: #2FAF94; text-decoration: none; display: inline-block; background-color: #f2f2f2; padding: 10px 15px; margin-bottom: 10px; border-radius: 5px;">Laissez un avis sur le buffet chinois</a></li>
        <li><a href="https://www.example.com/review?prestation=2" target="_blank" style="color: #2FAF94; text-decoration: none; display: inline-block; background-color: #f2f2f2; padding: 10px 15px; margin-bottom: 10px; border-radius: 5px;">Laissez un avis sur la prestation de Petusia la Diva</a></li>
        <li><a href="https://www.example.com/review?prestation=3" target="_blank" style="color: #2FAF94; text-decoration: none; display: inline-block; background-color: #f2f2f2; padding: 10px 15px; margin-bottom: 10px; border-radius: 5px;">Laissez un avis sur le DJ Vandetta</a></li>
    </ul>
    <p>Merci de votre confiance et à bientôt sur Sparkling Events !</p>
    <div style="font-size: 0.8em; text-align: center; margin-top: 30px;">
    <p>Visitez notre site web pour plus d'informations : <a href="https://sparkling-events.ch" target="_blank" style="color: #2FAF94; text-decoration: none;">sparkling-events.ch</a></p>
</div>
</div>
`;

const data = {
  email,
  subject,
  content,
  user_id: user.idPersonne,
  user_surname: user.personneNom,
  user_name: user.personnePrenom,
  user_email: user.personneLogin,
};

try {
  const response = await axiosClient.post('/testMailSuivi', data);
  if (response.status === 200) {
    setMessage({
      type: 'success',
      text: 'Le mail de suivi a été envoyé avec succès.',
    });
  } else {
    setMessage({
      type: 'error',
      text: "Erreur lors de l'envoi du mail de suivi.",
    });
  }
} catch (error) {
  setMessage({
    type: 'error',
    text: "Erreur lors de l'envoi du mail de suivi.",
  });
}
};

return (
<div>
  {user && <p>Connecté en tant qu'utilisateur n°{user.idPersonne}</p>}
  {user && <p>Email de l'utilisateur : {user.personneLogin}</p>}

  <h2>Envoyer un mail de suivi</h2>
  <form onSubmit={handleSubmit}>
    <label htmlFor="email">Adresse e-mail :</label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <label htmlFor="subject">Sujet :</label>
    <input
      type="text"
      id="subject"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
      required
    />
    <button type="submit">Envoyer le mail de suivi</button>
  </form>
  {message && (
    <p
      className={
        message.type === 'success' ? 'success-message' : 'error-message'
      }
    >
      {message.text}
    </p>
  )}
</div>
);
}
