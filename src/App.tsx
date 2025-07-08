// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './contexts/CartContext';


function App() {
  return (
    <CartProvider>
      <Router>
    
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
         gap
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
