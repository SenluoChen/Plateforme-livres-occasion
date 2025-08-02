// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import PanierPage from './pages/PanierPage';   // ✅ 引入購物車頁面
import CheckoutPage from './pages/CheckoutPage'; // ✅ 引入結帳頁面
import { CartProvider } from './contexts/CartContext';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* 首頁 */}
          <Route path="/" element={<HomePage />} />

          {/* 商品詳情頁 */}
          <Route path="/produit/:id" element={<ProductDetail />} />

          {/* 購物車頁面 */}
          <Route path="/panier" element={<PanierPage />} />

          {/* 結帳頁面 */}
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
