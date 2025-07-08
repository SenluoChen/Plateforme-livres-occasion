// src/pages/PanierPage.tsx
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const PanierPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛒 我的購物車</h2>

      {cart.length === 0 ? (
        <p>你的購物車是空的。</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cart.map((item) => (
            <li
              key={item.id}
              style={{
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <img
                src={item.image || '/book.avif'}
                alt={item.nom}
                width={80}
                height={80}
                style={{ objectFit: 'cover' }}
              />
              <div>
                <h4>{item.nom}</h4>
                <p>數量：{item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)}>❌ 移除</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link to="/">⬅️ 返回首頁</Link>
    </div>
  );
};

export default PanierPage;
