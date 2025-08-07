import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CheckoutPage = () => {
  const { cart } = useCart();
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [note, setNote] = useState('');
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + ((item.prix ?? 0) * (item.quantity ?? 0)),
    0
  );

  const handleOrderSubmit = () => {
    navigate('/order-success');
  };

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px'
    }}>
      {/* 頁面標題 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 30px' }}>
        <h1 style={{ color: '#5C7778', textAlign: 'center', fontSize: '32px', marginBottom: '8px' }}>
          Paiement & Livraison
        </h1>
        <p style={{ textAlign: 'center', color: '#777' }}>
          Vérifiez vos articles et choisissez votre mode de livraison et de paiement
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* 左側主要區域 */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* 購物車商品 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>Articles commandés</h3>
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#777' }}>Votre panier est vide.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {cart.map((item) => (
                  <li key={item.id} style={listItemStyle}>
                    <span>{item.nom} × {item.quantity}</span>
                    <span>€{((item.prix ?? 0) * (item.quantity ?? 0)).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 配送方式 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>Mode de livraison</h3>
            <div style={{ marginTop: '10px' }}>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  value="standard"
                  checked={shippingMethod === 'standard'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                /> Livraison standard (3-5 jours)
              </label>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  value="express"
                  checked={shippingMethod === 'express'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                /> Livraison express (1-2 jours)
              </label>
            </div>
          </div>

          {/* 備註 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>Remarques</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Avez-vous des demandes spécifiques ?"
              style={{
                width: '100%',
                minHeight: '100px',
                marginTop: '12px',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            />
          </div>
        </div>

        {/* 右側摘要與付款 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* 付款方式 */}
          <div style={cardStyle}>
            <h3 style={cardTitle}>Mode de paiement</h3>
            <div style={{ marginTop: '10px' }}>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  value="credit"
                  checked={paymentMethod === 'credit'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                /> Carte de crédit
              </label>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                /> PayPal
              </label>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                /> Paiement à la livraison
              </label>
            </div>
          </div>

          {/* 總額與按鈕 */}
          <div style={{ ...cardStyle, textAlign: 'center' }}>
            <h3 style={{ color: '#5C7778', marginBottom: '15px' }}>
              Montant total : €{totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={handleOrderSubmit}
              style={{
                width: '100%',
                padding: '16px 28px',
                backgroundColor: '#6B8C74',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Passer la commande
            </button>
            <div style={{ marginTop: '20px' }}>
              <Link to="/" style={{ color: '#5C7778', textDecoration: 'none' }}>Retour à l’accueil</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 共用樣式
const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

const cardTitle: React.CSSProperties = {
  marginBottom: '12px',
  color: '#5C7778',
  fontSize: '20px',
  fontWeight: 600
};

const listItemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px 0',
  borderBottom: '1px solid #eee',
  fontSize: '15px',
};

const radioLabelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '15px',
  color: '#444'
};

export default CheckoutPage;
