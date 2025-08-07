import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

const PanierPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const [recherche, setRecherche] = useState("");
  const [filtreOuvert, setFiltreOuvert] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.prix ?? 0) * (item.quantity ?? 0),
    0
  );

  return (
    <>
      {/* ✅ 導航列 */}
      <Navbar
        recherche={recherche}
        setRecherche={setRecherche}
        setFiltreOuvert={setFiltreOuvert}
        onSearch={setSearchResults}
      />

      <div
        style={{
          backgroundColor: "#f7f8fa",
          minHeight: "100vh",
          padding: "40px 20px",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 800,
              marginBottom: "30px",
              color: "#333",
            }}
          >
            Mon Panier
          </h2>

          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "100px 30px",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  color: "#6e6e73",
                  marginBottom: "30px",
                }}
              >
                Votre panier est vide.
              </p>
              <Link
                to="/"
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  backgroundColor: "#649a8b",
                  color: "white",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Continuer mes achats
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "30px",
                alignItems: "start",
              }}
            >
              {/* 左側：商品列表 */}
              <div>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      padding: "20px",
                      marginBottom: "20px",
                      background: "white",
                      borderRadius: "12px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    {/* 商品圖片 */}
                    <img
                      src={item.image || "/book.avif"}
                      alt={item.nom}
                      width={100}
                      height={100}
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #eee",
                      }}
                    />

                    {/* 商品資訊 */}
                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          margin: "0 0 8px 0",
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "#333",
                        }}
                      >
                        {item.nom}
                      </h4>
                      <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                        Prix : €{item.prix?.toFixed(2)}
                      </p>
                      <p
                        style={{
                          margin: "4px 0 0 0",
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#649a8b",
                        }}
                      >
                        Sous-total : €
                        {((item.prix ?? 0) * (item.quantity ?? 0)).toFixed(2)}
                      </p>
                    </div>

                    {/* 數量控制 */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginRight: "10px",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity ?? 1) - 1)
                        }
                        disabled={(item.quantity ?? 1) <= 1}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          background: "white",
                          fontSize: "18px",
                          cursor:
                            (item.quantity ?? 1) <= 1 ? "not-allowed" : "pointer",
                        }}
                      >
                        –
                      </button>
                      <span style={{ fontSize: "16px", fontWeight: 600 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity ?? 1) + 1)
                        }
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          background: "white",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* 移除按鈕 */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        padding: "8px 14px",
                        backgroundColor: "#ff5c5c",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Retirer
                    </button>
                  </div>
                ))}
              </div>

              {/* 右側：總價 & 結帳 */}
              <div
                style={{
                  background: "white",
                  padding: "30px 25px",
                  borderRadius: "12px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                  position: "sticky",
                  top: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    marginBottom: "20px",
                    color: "#333",
                  }}
                >
                  Récapitulatif
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                    fontSize: "16px",
                  }}
                >
                  <span>Total articles :</span>
                  <span>{cart.length}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#649a8b",
                    marginBottom: "25px",
                  }}
                >
                  <span>Total :</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  style={{
                    width: "100%",
                    padding: "14px",
                    backgroundColor: "#649a8b",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Passer à la caisse
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PanierPage;
