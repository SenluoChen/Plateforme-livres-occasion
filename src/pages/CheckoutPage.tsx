import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom'; 

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
    navigate('/order-success'); // ✅ 跳轉
  };

  return (
    <div style={{
      background: '#f5f5f5',
      padding: '40px 20px',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        display: 'flex',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        
        {/* 左側 - 訂單商品與寄送資訊 */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 訂單商品 */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#5C7778' }}>🛒 Articles commandés</h3>
            {cart.length === 0 ? (
              <p>Votre panier est vide.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {cart.map((item) => (
                  <li key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #eee',
                    padding: '10px 0'
                  }}>
                    <span>{item.nom} × {item.quantity}</span>
                    <span>€{((item.prix ?? 0) * (item.quantity ?? 0)).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
            <h3 style={{ textAlign: 'right', marginTop: '10px', color: '#5C7778' }}>
              Total：€{totalPrice.toFixed(2)}
            </h3>
          </div>

          {/* 寄送資訊與備註 */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#5C7778' }}>📦 Mode de livraison</h3>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              <input
                type="radio"
                value="standard"
                checked={shippingMethod === 'standard'}
                onChange={(e) => setShippingMethod(e.target.value)}
              /> Livraison standard (3-5 jours)
            </label>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              <input
                type="radio"
                value="express"
                checked={shippingMethod === 'express'}
                onChange={(e) => setShippingMethod(e.target.value)}
              /> Livraison express (1-2 jours)
            </label>

            <h3 style={{ marginTop: '20px', color: '#5C7778' }}>Remarques</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Avez-vous des demandes spécifiques ?"
              style={{
                width: '100%',
                minHeight: '80px',
                marginTop: '8px',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>
        </div>

        {/* 右側 - 付款與總額 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 付款方式 */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#5C7778' }}>💳 Mode de paiement</h3>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              <input
                type="radio"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> Carte de crédit
            </label>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> PayPal
            </label>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> Paiement à la livraison
            </label>
          </div>

          {/* 金額與下單按鈕 */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            textAlign: 'right'
          }}>
            <h3 style={{ color: '#5C7778' }}>Montant total : €{totalPrice.toFixed(2)}</h3>
            <button
              onClick={handleOrderSubmit}
              style={{
                width: '100%',
                padding: '14px 28px',
                backgroundColor: '#6B8C74',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 600,
                marginTop: '10px'
              }}
            >
              Passer la commande
            </button>



            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Link to="/" style={{ color: '#5C7778', textDecoration: 'none' }}>⬅ Retour à l’accueil</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
