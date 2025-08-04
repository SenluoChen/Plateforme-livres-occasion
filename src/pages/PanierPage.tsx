import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

const PanierPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart(); // ✅ 需要在 Context 增加 updateQuantity
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.prix ?? 0) * (item.quantity ?? 0),
    0
  );

return (
  <div
    style={{
      background: "linear-gradient(135deg, #649a8b, #8BB88B)",
      minHeight: "100vh",
      padding: "60px 20px",
    }}
  >
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "36px",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "50px",
          color: "white", // ✅ 標題字體改白色以對比背景
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
              borderRadius: "24px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
            }}
          >
            <p
              style={{
                fontSize: "22px",
                color: "#6e6e73",
                marginBottom: "35px",
              }}
            >
              Votre panier est vide.
            </p>
            <Link
              to="/"
              style={{
                display: "inline-block",
                padding: "16px 32px",
                background:
                  "linear-gradient(135deg, #6B8C74 0%, #8BB88B 100%)",
                color: "white",
                borderRadius: "980px",
                textDecoration: "none",
                fontSize: "17px",
                fontWeight: 600,
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              Retour à l'accueil
            </Link>
          </div>
        ) : (
          <div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {cart.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    marginBottom: "24px",
                    background: "white",
                    borderRadius: "20px",
                    boxShadow: "0 6px 25px rgba(0,0,0,0.06)",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-3px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  {/* 商品資訊 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      flex: 1,
                    }}
                  >
                    <img
                      src={item.image || "/book.avif"}
                      alt={item.nom}
                      width={100}
                      height={100}
                      style={{
                        objectFit: "cover",
                        borderRadius: "16px",
                        border: "1px solid #eee",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          margin: "0 0 8px 0",
                          fontSize: "18px",
                          color: "#1d1d1f",
                        }}
                      >
                        {item.nom}
                      </h4>
                      <p
                        style={{
                          margin: "0 0 6px 0",
                          color: "#6e6e73",
                          fontSize: "14px",
                        }}
                      >
                        Prix unitaire : €{item.prix}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 700,
                          color: "#0071e3",
                          fontSize: "18px",
                        }}
                      >
                        Sous-total : €{(item.prix ?? 0) * (item.quantity ?? 0)}
                      </p>
                    </div>
                  </div>

                  {/* 數量調整區 */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity ?? 1) - 1)}
                      disabled={(item.quantity ?? 1) <= 1}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "#6B8C74",
                        color: "white",
                        fontSize: "18px",
                        cursor: "pointer",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: "16px", fontWeight: 600 }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity ?? 1) + 1)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "#6B8C74",
                        color: "white",
                        fontSize: "18px",
                        cursor: "pointer",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* 移除按鈕 */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      padding: "10px 18px",
                      background: "linear-gradient(135deg, #C94F4F, #E36C6C)",
                      color: "white",
                      border: "none",
                      borderRadius: "980px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 600,
                      marginLeft: "20px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>

            {/* Total + Checkout */}
            <div
              style={{
                marginTop: "40px",
                padding: "35px",
                background: "white",
                borderRadius: "24px",
                boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "24px",
                  color: "#1d1d1f",
                  fontWeight: 700,
                }}
              >
                Total : €{totalPrice.toFixed(2)}
              </h3>
              <button
                onClick={() => navigate("/checkout")}
                style={{
                  padding: "16px 36px",
                  background: "linear-gradient(135deg, #6B8C74, #8BB88B)",
                  color: "white",
                  border: "none",
                  borderRadius: "980px",
                  cursor: "pointer",
                  fontSize: "17px",
                  fontWeight: 600,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                Passer à la caisse
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanierPage;
