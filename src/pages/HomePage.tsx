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

function PageAccueil() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [filtreCategorie] = useState("");
  const [filtreOuvert, setFiltreOuvert] = useState(false);
  const [filtres, setFiltres] = useState<any>({});
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const livresFiltres = livres.filter((l) => {
    const correspondCategorie = !filtreCategorie || l.categorie === filtreCategorie;
    const correspondRecherche = l.titre.toLowerCase().includes(recherche.toLowerCase());
    const correspondFiltreAvance =
      (!filtres.categorie || l.categorie === filtres.categorie) &&
      (!filtres.minPrice || l.prix >= filtres.minPrice) &&
      (!filtres.maxPrice || l.prix <= filtres.maxPrice) &&
      (!filtres.condition || l.condition === filtres.condition);
    return correspondCategorie && correspondRecherche && correspondFiltreAvance;
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
              padding: "0"
            }}
          >
 <div style={{ display: "flex", alignItems: "center", gap: "10px",marginLeft: "-100px" }}>
  {/* Bouton menu (hamburger) */}

<button
  onClick={() => setMenuOuvert(!menuOuvert)}
  style={{
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "28px",
    lineHeight: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
</button>

  {/* LOGO */}
  <img
    src="/ChatGPT Image 2 août 2025, 01_05_13.png"
    alt="reLivre"
    style={{
      display: "block",
      height: "200px",
      width: "auto",
      objectFit: "contain",
      marginRight: "50px"
      
    }}
  />
</div>


            {/* Gauche : Logo + Recherche + Filtre */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flex: 1,
              }}

        
            >

    
     
        
              {/* Barre de recherche + Filtre */}
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
    padding: "12px 20px",
    borderRadius: "24px",
    border: "1px solid #ddd",
    fontSize: "16px",
    height: "46px",
    boxSizing: "border-box",
    outline: "none",
    backgroundColor: "#fff",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  }}
  onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(100,154,139,0.2)")}
  onBlur={(e) => (e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)")}
/>
                <button
                  onClick={() => setFiltreOuvert(true)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                     marginLeft: "10px"
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

            {/* Droite : Panier */}
            <button
              onClick={() => navigate("/panier")}
              style={{
                position: "relative",
                padding: "10px 16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: "#649a8b",
                marginLeft: "40px",
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
        {/* Menu déroulant */}
        {menuOuvert && (
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
            <div onClick={() => setMenuOuvert(false)} style={{ padding: "10px 20px", cursor: "pointer" }}>Accueil</div>
            <div onClick={() => setMenuOuvert(false)} style={{ padding: "10px 20px", cursor: "pointer" }}>Livres</div>
            <div onClick={() => setMenuOuvert(false)} style={{ padding: "10px 20px", cursor: "pointer" }}>Contactez-nous</div>
          </div>
        )}

        <div className="shop-area">
          {/* ✅ Carrousel */}
          <div className="app-container" style={{ display: "flex", alignItems: "center", backgroundColor: "white", padding: 30, marginLeft: "-500px" }}>
            <BannerCarousel />
          </div>

    

      {/* Liste des produits */}
<div
  className="product-grid"
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "20px",
    padding: "20px 0",
  }}
>
  {livresFiltres.map((l) => (
    <div
      key={l.id}
      className="product-card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        height: "300px", // 固定高度
      }}
    >
      <Link
        to={`/produit/${l.id}`}
        style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
      >
        <img
          src={l.image}
          alt={l.titre}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
        <h4 style={{ fontSize: "14px", margin: "4px 0" }}>{l.titre}</h4>
        <p style={{ color: "#555", fontSize: "13px" }}>
          {l.prix} € · {l.condition}
        </p>
      </Link>

      <button
        onClick={() =>
          addToCart({
            id: l.id,
            nom: l.titre,
            categorie: l.categorie,
            image: l.image,
            prix: l.prix,
          })
        }
        style={{
          backgroundColor: "#649a8b",
          color: "white",
          padding: "10px 16px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          transition: "background 0.3s",
          marginTop: "auto", // 把按鈕推到底
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#649a8b")}
      >
        Ajouter au panier
      </button>
 
              </div>
            ))}
          </div>
        </div>
      </div>

      <BookFilterModal
        open={filtreOuvert}
        onClose={() => setFiltreOuvert(false)}
        onApply={(f) => setFiltres(f)}
      />
    </>
  );
}

export default PageAccueil;
