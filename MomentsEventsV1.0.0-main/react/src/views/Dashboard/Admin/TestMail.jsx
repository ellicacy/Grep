import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios-client';

export default function TestMail() {
  const [email, setEmail] = useState(user.personneLogin);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER')));
  const [description, setDescription] = useState(panier.descriptionEvenement);
  const [prestations, setPrestations] = useState(panier.packPrestation);
  const [packs, setPacks] = useState(panier.packPanier);


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
      const response = await axiosClient.post('/testMail', data);
      if (response.status === 200) {
        setMessage({
          type: 'success',
          text: 'Le mail de test a été envoyé avec succès.',
        });
      } else {
        setMessage({
          type: 'error',
          text: "Erreur lors de l'envoi du mail de test.",
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: "Erreur lors de l'envoi du mail de test.",
      });
    }
  };

  return (
    <div>
      {user && <p>Connecté en tant qu'utilisateur n°{user.idPersonne}</p>}
      {user && <p>Email de l'utilisateur : {user.personneLogin}</p>}

      <h2>Envoyer un mail de test</h2>
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
        <label htmlFor="content">Contenu du mail :</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Envoyer le mail de test</button>
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