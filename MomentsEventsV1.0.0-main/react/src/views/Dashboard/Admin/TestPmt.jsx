import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios-client';
import { useSelector } from 'react-redux';
import { forEach } from 'lodash';

export default function TestPmt() {

  const panier = useSelector((state) => state.panier);
  const [presta, setPresta] = useState('');
  // const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [cart, setCart] = useState([]); // Ajoutez un état pour le panier
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER')));
  const [description, setDescription] = useState(panier.descriptionEvenement);
  const [prestations, setPrestations] = useState(panier.packPrestation);
  const [packPresta, setPackPresta] = useState(panier.packPanier);
  const [packs, setPacks] = useState(panier.packPanier);



  const handleUserChange = () => {
    setUser(localStorage.getItem('USER'))
  }
  
  useEffect(() => {
    window.addEventListener('storage', handleUserChange)
    return () => {
      window.removeEventListener('storage', handleUserChange)
    }
  }, [])

  const addToCart = () => {
  //console.log(prestations)
  const cartItems = prestations.map((presta) => {
    console.log(presta)
    const desc = presta.description;
    const prix = presta.prix_type_facturation;
    return { presta: presta.nom, desc, prix };
  });
  setCart([...cart, ...cartItems]);
    console.log('CART =')
    console.log(cart)
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleSubmitPmt = (e) => {
    e.preventDefault();
  
    const produits = cart.map((item) => ({
      nom: item.presta,
      desc: item.desc,
      prix: item.prix
    }));
  
    const data = {
      panier,
      packPresta,
      idPersonne: user.idPersonne,
      personneNom: user.personneNom,
      personnePrenom: user.personnePrenom,
      personneLogin: user.personneLogin,
      personneRue: user.clientRue,
      personneCodePostal: user.clientCodePostal,
      personneVille: user.clientVille,
      personneNaissance: user.personneDateNaissance
    };

  
    axiosClient.post('/testPmt', data)
      .then(({ data }) => {
        console.log(data);
        const url = data;
        // window.location.href = url
      })
      .catch(({ e }) => {
        // Handle error
      });
  };

  return (
    <div style={{ padding: '0 20px' }}>
      {user && <p>Connecté en tant qu'utilisateur n°{user.idPersonne}</p>}
      {user && <p>Email de l'utilisateur : {user.personneLogin}</p>} 

      {/* Affichez les éléments du panier */}
      <div>
        <h2>Panier</h2>
        {cart.map((item, index) => (
          <div key={index}>
            <p>{item.presta} - {item.desc} - {item.prix} CHF</p>
            <button onClick={() => removeFromCart(index)}>Supprimer</button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitPmt}>
        <input type="text" placeholder='Entrer le nom de la prestation' name='presta' value={presta} onChange={e=>setPresta(e.target.value)}/>
        <input type="text" placeholder='Entrer la description de la prestation' name='description' value={description} onChange={e=>setDescription(e.target.value)} />
        <input type="number" placeholder='Entrer le prix de la prestation' name='prix' value={prix} onChange={e=>setPrix(e.target.value)} />
        <br />
        {/* Ajoutez un bouton pour ajouter des éléments au panier */}
        <button type="button" onClick={addToCart}>Ajouter au panier</button>
        <br />
        <input type="submit" value={'Soumettre le paiement'} />
      </form>
    </div>
  )
}