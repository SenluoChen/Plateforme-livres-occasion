// src/components/Navbar.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import BookFilterModal from "./BookFilterModal";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const navigate = useNavigate();
  const { cart } = useCart();

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
          {/* 左側：Logo + 漢堡按鈕 + 搜尋欄 + Filter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flex: 1,
            }}
          >
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

            {/* 漢堡按鈕 */}
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

              {/* Filter */}
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
          <div style={{ padding: "10px 20px", cursor: "pointer" }}>🏠 首頁</div>
          <div style={{ padding: "10px 20px", cursor: "pointer" }}>🛍 書籍</div>
          <div style={{ padding: "10px 20px", cursor: "pointer" }}>📞 聯絡我們</div>
        </div>
      )}

      <BookFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(f) => console.log("套用過濾", f)}
      />
    </header>
  );
}

export default Navbar;
