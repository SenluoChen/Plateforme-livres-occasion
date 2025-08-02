// src/pages/PanierPage.tsx
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom'; // ✅ pour naviguer

const PanierPage = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + ((item.prix ?? 0) * (item.quantity ?? 0)),
    0
  );

  return (


    
    <div
      style={{
        backgroundColor: '#f5f5f7',
        minHeight: '100vh',
        padding: '40px 20px',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '40px',
            color: '#1d1d1f',
          }}
        >
          🛒 Mon Panier
        </h2>

        {cart.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            }}
          >
            <p style={{ fontSize: '20px', color: '#6e6e73', marginBottom: '30px' }}>
              Votre panier est vide.
            </p>
            <Link
              to="/"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                backgroundColor: '#5C7778',
                color: 'white',
                borderRadius: '980px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              ⬅ Retour à l'accueil
            </Link>
          </div>
        ) : (
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {cart.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    marginBottom: '20px',
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <img
                      src={item.image || '/book.avif'}
                      alt={item.nom}
                      width={90}
                      height={90}
                      style={{
                        objectFit: 'cover',
                        borderRadius: '16px',
                        border: '1px solid #eee',
                      }}
                    />
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1d1d1f' }}>
                        {item.nom}
                      </h4>
                      <p style={{ margin: '0 0 4px 0', color: '#6e6e73' }}>
                        Quantité : {item.quantity}
                      </p>
                      <p style={{ margin: 0, fontWeight: 600, color: '#0071e3', fontSize: '17px' }}>
                        €{(item.prix ?? 0) * (item.quantity ?? 0)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#6B8C74',
                      color: 'white',
                      border: 'none',
                      borderRadius: '980px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>

            <div
              style={{
                marginTop: '30px',
                padding: '30px',
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '22px', color: '#1d1d1f' }}>
                Total : €{totalPrice.toFixed(2)}
              </h3>
              <button
                onClick={() => navigate('/checkout')}
                style={{
                  padding: '14px 28px',
                  backgroundColor: '#6B8C74',
                  color: 'white',
                  border: 'none',
                  borderRadius: '980px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                Passer à la caisse
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanierPage;
