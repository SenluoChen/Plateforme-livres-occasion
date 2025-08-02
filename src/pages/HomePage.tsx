import { useState } from "react";
import "../App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import BookFilterModal from "../components/BookFilterModal";
import BannerCarousel from "../components/BannerCarousel";

type Livre = {
  id: number;
  titre: string;
  categorie: string;
  image: string;
  prix: number;
  condition: "Neuf" | "Occasion";
  langue: string;
  stock: number;
  description: string;
};

const livres: Livre[] = [
  { id: 1, titre: "Les Misérables", categorie: "Roman", image: "/71RIGNIOssL._SL1500_.jpg", prix: 12, condition: "Occasion", langue: "Français", stock: 3, description: "Chef-d'œuvre de Victor Hugo." },
  { id: 2, titre: "Harry Potter et la Coupe de Feu", categorie: "Fantasy", image: "harry-potter-goblet.jpg", prix: 25, condition: "Neuf", langue: "Français", stock: 5, description: "Aventures magiques." },
  { id: 3, titre: "Le Petit Prince", categorie: "Enfants", image: "le-petit-prince.jpg", prix: 8, condition: "Occasion", langue: "Français", stock: 2, description: "Conte philosophique intemporel." },
  { id: 4, titre: "Introduction to Quantum Physics", categorie: "Science", image: "quantum-physics.jpg", prix: 15, condition: "Occasion", langue: "Anglais", stock: 4, description: "Bases de la physique quantique." },
  { id: 5, titre: "La Peste", categorie: "Roman", image: "la-peste.jpg", prix: 18, condition: "Occasion", langue: "Français", stock: 1, description: "Roman d'Albert Camus." },
  { id: 6, titre: "La Peste", categorie: "Roman", image: "la-peste.jpg", prix: 18, condition: "Occasion", langue: "Français", stock: 1, description: "Roman d'Albert Camus." },
];

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [filtreCategorie] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const livresFiltres = livres.filter((l) => {
    const matchCategorie = !filtreCategorie || l.categorie === filtreCategorie;
    const matchSearch = l.titre.toLowerCase().includes(recherche.toLowerCase());
    const matchAdvanced =
      (!filters.categorie || l.categorie === filters.categorie) &&
      (!filters.minPrice || l.prix >= filters.minPrice) &&
      (!filters.maxPrice || l.prix <= filters.maxPrice) &&
      (!filters.condition || l.condition === filters.condition);
    return matchCategorie && matchSearch && matchAdvanced;
  });

  return (
    <>
      <header className="apple-navbar">
        <nav className="navbar-content">
          <div
            style={{
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "0 5px"
            }}
          >
            {/* 左側：Logo + 搜尋欄 + Filter */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flex: 1,
              }}
            >
              {/* LOGO */}
              <img
                src="/ChatGPT Image 2 août 2025, 01_05_13.png"
                alt="reLivre"
                style={{
                  display: "block",
                  height: "200px",
                  width: "auto",
                  objectFit: "contain",
                  marginLeft: "-100px",
                }}
              />

              {/* 目錄（漢堡按鈕） */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "28px",
                  lineHeight: "1",
                }}
              >
                ☰
              </button>

              {/* 搜尋欄 + Filter */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  flex: 1,
                }}
              >
                <input
                  type="text"
                  placeholder="Rechercher un livre..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "12px 18px",
                    borderRadius: "20px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                    height: "48px",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  onClick={() => setFilterOpen(true)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="auto"
                    fill="#ffffffff"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 4h18v2l-7 7v5l-4 2v-7l-7-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 右側：購物車 */}
            <button
              onClick={() => navigate("/panier")}
              style={{
                position: "relative",
                padding: "10px 16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: "#649a8b",
                marginLeft: "20px",
                marginRight: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="auto"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cart.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "#fff",
                    color: "#649a8b",
                    borderRadius: "999px",
                    padding: "2px 7px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <div className="app-container" style={{ display: "flex", alignItems: "center" }}>
        {/* 下拉選單 */}
        {menuOpen && (
          <div
            className="dropdown-menu"
            style={{
              position: "absolute",
              top: "80px",
              left: "20px",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "10px 0",
              zIndex: 1000,
            }}
          >
            <div onClick={() => setMenuOpen(false)} style={{ padding: "10px 20px", cursor: "pointer" }}>🏠 首頁</div>
            <div onClick={() => setMenuOpen(false)} style={{ padding: "10px 20px", cursor: "pointer" }}>🛍 書籍</div>
            <div onClick={() => setMenuOpen(false)} style={{ padding: "10px 20px", cursor: "pointer" }}>📞 聯絡我們</div>
          </div>
        )}

        <div className="shop-area">
          {/* ✅ 輪播圖 */}
          <div className="app-container" style={{ display: "flex", alignItems: "center", backgroundColor: "white", padding: 30,marginLeft: "-500px" }}>
            <BannerCarousel />
          </div>


          {/* 產品列表 */}
          <div className="product-grid">
            {livresFiltres.map((l) => (
              <div key={l.id} className="product-card">
                <Link to={`/produit/${l.id}`}>
                  <img src={l.image} alt={l.titre} />
                  <h4>{l.titre}</h4>
                  <p>{l.prix} € · {l.condition}</p>
                </Link>
                <button
                  onClick={() =>
                    addToCart({ id: l.id, nom: l.titre, categorie: l.categorie, image: l.image })
                  }
                >
                  🛒 加入購物車
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BookFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(f) => setFilters(f)}
      />
    </>
  );
}

export default HomePage;
