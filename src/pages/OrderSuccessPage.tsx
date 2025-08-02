import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>✅ Commande réussie !</h2>
      <p>Merci pour votre achat.</p>
      <Link to="/" style={{ color: '#5C7778', fontWeight: 'bold' }}>
        Retour à l’accueil
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
