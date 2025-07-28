import { useState } from 'react';
import '../App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

type Produit = {
  id: number;
  nom: string;
  categorie: string;
  image: string;
};

const produits: Produit[] = [
  { id: 1, nom: "1", categorie: "手機", image: "71RIGNIOssL._SL1500_.jpg" },
  { id: 2, nom: "3", categorie: "手機", image: "" },
  { id: 3, nom: "2", categorie: "手機", image: "" },
  { id: 4, nom: "4", categorie: "手機", image: "" },

];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [recherche, setRecherche] = useState('');
  const [filtreCategorie, setFiltreCategorie] = useState('全部');
  const navigate = useNavigate();

  const { addToCart, cart } = useCart(); // ✅ 使用全局購物車

  const handleOptionClick = (option: string) => {
    console.log(`你點擊了：${option}`);
    setMenuOpen(false);
  };

  const produitsFiltres = produits.filter(p =>
    (filtreCategorie === "全部" || p.categorie === filtreCategorie) &&
    p.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <>
      {/* 🍎 Apple-style Navbar */}
      <header className="apple-navbar">
        <nav className="navbar-content">
          <div className="nav-logo"></div>
          <div className="nav-icons">
            <div className="filter-bar">
              <input
                type="text"
                placeholder="search..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
              <select
                value={filtreCategorie}
                onChange={(e) => setFiltreCategorie(e.target.value)}
              >
                <option value="全部">全部</option>
                <option value="手機">手機</option>
                <option value="電腦">電腦</option>
              </select>
            </div>

            {/* 🛒 購物車按鈕 */}
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
              🛒 ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          </div>
        </nav>
      </header>

      {/* 🔽 Shopee-style App Container */}
      <div className="app-container">
        {/* 🔽 隱藏式目錄按鈕 */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="menu-button">
          目錄
        </button>
        {menuOpen && (
          <div className="dropdown-menu">
            <div onClick={() => handleOptionClick("首頁")}>🏠 首頁</div>
            <div onClick={() => handleOptionClick("商品")}>🛍 商品</div>
            <div onClick={() => handleOptionClick("聯絡我們")}>📞 聯絡我們</div>
          </div>
        )}




        {/* 🛍 商店區域 */}
        <div className="shop-area">
          <div className="banner">
            <img src="/book.avif" alt="大廣告牆" />
          </div>

          

          <div className="product-grid">
            {produitsFiltres.map((p, index) => (
              <div key={index} className="product-card">
                
                <Link to={`/produit/${p.id}`}>
                  <img src={p.image} alt={p.nom} />
                  <h4>{p.nom}</h4>
                </Link>
                
                <button onClick={() => addToCart(p)}>🛒 加入購物車</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
