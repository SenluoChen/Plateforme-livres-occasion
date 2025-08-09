// src/components/CartButton.tsx
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // ← 用全局購物車狀態

const CartButton = () => {
  const navigate = useNavigate();
  const { cart } = useCart(); // ← 這才是目前的購物車清單！

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={() => navigate('/panier')}
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        padding: '10px 16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        zIndex: 1000,
        backgroundColor: '#eee',
      }}
    >
      🛒 ({totalCount})
    </button>
  );
};

export default CartButton;
