// src/components/Navbar.tsx
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useState, Dispatch, SetStateAction } from "react";
import BookFilterModal from "./BookFilterModal";
import CatalogModal from "./CatalogModal";            // 目錄典籍彈窗
import { livres } from "../data/livres";              // catalog 資料
import { searchBooks } from "../utils/search";

export interface NavbarProps {
  recherche: string;
  setRecherche: Dispatch<SetStateAction<string>>;
  setFiltreOuvert: Dispatch<SetStateAction<boolean>>;
  onSearch: (results: any[]) => void;
}

function Navbar({ recherche, setRecherche, setFiltreOuvert, onSearch }: NavbarProps) {
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);     // Filter 彈窗
  const [catalogOpen, setCatalogOpen] = useState(false);   // Catalogue 彈窗

  const navigate = useNavigate();
  const { cart } = useCart();

  const handleSearch = async () => {
    if (!recherche.trim()) return;
    setLoading(true);
    const results = await searchBooks(recherche);
    onSearch(results);
    setFiltreOuvert(false);
    setFilterOpen(false);
    setLoading(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);

  return (
    <header className="apple-navbar">
      <nav className="navbar-content">
        <div
          style={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 5px",
          }}
        >
{/* 左側：Catalogue 按鈕（取代原漢堡） + Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0px",
              flex: 1,
              marginLeft : "-110px"
            }}
          >

{/* Catalogue 按鈕（白色漢堡圖案） */}
<button
  onClick={() => setCatalogOpen(true)}
  style={{
    backgroundColor: "#649a8b",
    border: "none",
    color: "#fff",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    transition: "all 0.25s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight : "15px"

  }}
  onMouseOver={(e) => {
    e.currentTarget.style.backgroundColor = "#528377";
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.18)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.backgroundColor = "#649a8b";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
  }}
  title="Catalogue"
>
  {/* 白色漢堡圖示 */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
</button>



            {/* Logo */}
            <Link to="/" style={{ display: "block" }}>
              <img
                src="/ChatGPT Image 2 août 2025, 01_05_13.png"
                alt="reLivre"
                style={{
                  display: "block",
                  height: "200px",
                  width: "auto",
                  objectFit: "contain",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
              />
            </Link>

            {/* 搜尋欄 + Filter */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flex: 1,
              }}
            >
              <div style={{ position: "relative", flex: 1 }}>
                <input
                  type="text"
                  placeholder="Rechercher un livre..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  style={{
                    width: "100%",
                    padding: "12px 80px 12px 18px",
                    borderRadius: "22px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                    height: "48px",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "#649a8b",
                    color: "white",
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    height: "36px",
                  }}
                >
                  {loading ? "Recherche..." : "Chercher"}
                </button>
              </div>

              {/* Filter 按鈕 */}
              <button
                onClick={() => {
                  setFiltreOuvert(true); // 舊 API：通知外層
                  setFilterOpen(true);   // 新：實際開彈窗
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
                title="Filtrer"
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
              marginLeft: "25px",
              marginRight: "-50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Panier"
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

            {cartCount > 0 && (
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
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* 篩選彈窗 */}
      <BookFilterModal
        open={filterOpen}
        onClose={() => {
          setFilterOpen(false);
          setFiltreOuvert(false);
        }}
        onApply={(filters) => {
          console.log("套用過濾", filters);
          setFilterOpen(false);
          setFiltreOuvert(false);
        }}
      />

      {/* 目錄典籍彈窗 */}
      <CatalogModal
        open={catalogOpen}
        onClose={() => setCatalogOpen(false)}
        livres={livres}
      />
    </header>
  );
}

export default Navbar;
