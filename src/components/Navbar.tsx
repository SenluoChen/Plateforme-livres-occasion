// src/components/Navbar.tsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useState, Dispatch, SetStateAction } from "react";
import BookFilterModal from "./BookFilterModal";
import { Link } from "react-router-dom";
import { searchBooks } from "../utils/search";

export interface NavbarProps {
  recherche: string;
  setRecherche: Dispatch<SetStateAction<string>>;
  setFiltreOuvert: Dispatch<SetStateAction<boolean>>;
  onSearch: (results: any[]) => void; // ✅ 新增，用來把 LLM 結果傳給 HomePage
}

function Navbar({ recherche, setRecherche, setFiltreOuvert, onSearch }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();

 const handleSearch = async () => {
  if (!recherche.trim()) return;
  setLoading(true);

  console.log("開始搜尋:", recherche);

  const results = await searchBooks(recherche);
  console.log("搜尋結果:", results);

  onSearch(results);
  setFiltreOuvert(false);
  setLoading(false);
};

  return (
    <header className="apple-navbar">
      <nav className="navbar-content">
        <div
          style={{
            height: "80px",
            display: "flex", // ✅ 這裡加 Flex
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 5px",
          }}
        >
          {/* 左側：漢堡按鈕 + Logo + 搜尋欄 + Filter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flex: 1,
            }}
          >
            {/* 漢堡按鈕 */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                marginLeft: "-100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Menu"
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
  <div
    style={{
      position: "relative",
      flex: 1,
    }}
  >
    <input
      type="text"
      placeholder="Rechercher un livre..."
      value={recherche}
      onChange={(e) => setRecherche(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      style={{
        width: "100%",
        padding: "12px 80px 12px 18px", // 右邊留空間給按鈕
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

              {/* Filter */}
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
              marginLeft: "35px",
              marginRight: "-50px",
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
          <div style={{ padding: "10px 20px", cursor: "pointer" }}>首頁</div>
          <div style={{ padding: "10px 20px", cursor: "pointer" }}>書籍</div>
          <div style={{ padding: "10px 20px", cursor: "pointer" }}>聯絡我們</div>
        </div>
      )}

      {/* 篩選彈窗 */}
      <BookFilterModal
        open={false}
        onClose={() => setFiltreOuvert(false)}
        onApply={(f) => console.log("套用過濾", f)}
      />
    </header>
  );
}

export default Navbar;
