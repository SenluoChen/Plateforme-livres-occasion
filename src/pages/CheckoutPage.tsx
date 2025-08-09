import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const C_PRIMARY = "#5C7778";
const C_ACCENT = "#6B8C74";
const RADIUS = 12;


// === 共用樣式 ===
const cardTitle: React.CSSProperties = {
  marginBottom: "12px",
  color: "#5C7778",
  fontSize: "20px",
  fontWeight: 600,
};

const listItemStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #eee",
  fontSize: "15px",
};

const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // ---- Form states ----
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "paypal" | "cod">("credit");
  const [note, setNote] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState<null | { code: string; pct: number }>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    line1: "",
    city: "",
    zip: "",
    country: "France",
  });

  // ---- Helpers ----
  const currency = (n: number) => `€${n.toFixed(2)}`;

  const itemsSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + (item.prix ?? 0) * (item.quantity ?? 0), 0),
    [cart]
  );

  const discount = useMemo(() => {
    if (!couponApplied) return 0;
    return (itemsSubtotal * couponApplied.pct) / 100;
  }, [couponApplied, itemsSubtotal]);

  const shippingCost = useMemo(() => {
    if (shippingMethod === "express") return 9.9;
    // standard
    return itemsSubtotal - discount >= 35 ? 0 : 4.9;
  }, [shippingMethod, itemsSubtotal, discount]);

  const codFee = useMemo(() => (paymentMethod === "cod" ? 2.5 : 0), [paymentMethod]);

  // France books often 5.5% VAT (示範)
  const vatRate = 0.055;
  const vatBase = Math.max(itemsSubtotal - discount, 0);
  const vat = useMemo(() => vatBase * vatRate, [vatBase]);

  const total = useMemo(() => Math.max(vatBase + vat + shippingCost + codFee, 0), [
    vatBase,
    vat,
    shippingCost,
    codFee,
  ]);

  // 預估到貨：standard 3–5 天 / express 1–2 天
  const estimateDelivery = () => {
    const addDays = (d: Date, n: number) => {
      const x = new Date(d);
      x.setDate(x.getDate() + n);
      return x;
    };
    if (shippingMethod === "express") {
      const d1 = addDays(new Date(), 1);
      const d2 = addDays(new Date(), 2);
      return `${formatDate(d1)} – ${formatDate(d2)}`;
    }
    const d1 = addDays(new Date(), 3);
    const d2 = addDays(new Date(), 5);
    return `${formatDate(d1)} – ${formatDate(d2)}`;
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }).replace(".", "");

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === "WELCOME10") {
      setCouponApplied({ code, pct: 10 });
    } else {
      setCouponApplied(null);
      alert("Code promo invalide.");
    }
  };

  const isAddressValid = () =>
    address.fullName && address.phone && address.line1 && address.city && address.zip;

  const handleOrderSubmit = () => {
    if (cart.length === 0) {
      alert("Votre panier est vide.");
      return;
    }
    if (!isAddressValid()) {
      alert("Veuillez compléter les informations de livraison.");
      return;
    }
    if (!agreeTerms) {
      alert("Veuillez accepter les conditions générales de vente.");
      return;
    }
    navigate("/order-success");
  };

  // ---- UI ----
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        padding: "32px 20px",
      }}
    >
      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1200, margin: "0 auto 16px", color: "#777", fontSize: 14 }}>
        <Link to="/" style={{ color: C_PRIMARY, textDecoration: "none" }}>
          Accueil
        </Link>{" "}
        / <span>Panier</span> / <strong>Paiement & Livraison</strong>
      </div>

      {/* Title */}
      <div style={{ maxWidth: 1200, margin: "0 auto 24px" }}>
        <h1 style={{ color: C_PRIMARY, textAlign: "center", fontSize: 28, marginBottom: 6 }}>
          Paiement & Livraison
        </h1>
        <p style={{ textAlign: "center", color: "#777", margin: 0 }}>
          Vérifiez vos articles et renseignez vos informations de livraison et paiement
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 30,
          maxWidth: 1200,
          margin: "0 auto",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT */}
        <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Articles */}
          <Card>
            <h3 style={cardTitle}>Articles commandés</h3>
            {cart.length === 0 ? (
              <EmptyCart />
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {cart.map((item) => (
                  <li key={item.id} style={listItemStyle}>
                    <span>
                      {item.nom} × {item.quantity}
                    </span>
                    <span>{currency((item.prix ?? 0) * (item.quantity ?? 0))}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

{/* Address */}
<Card style={{ padding: 16, overflow: "hidden" }}>
  <h3 style={cardTitle}>Adresse de livraison</h3>

  <div className="address-grid">
    <div className="field full">
      <Input
        label="Nom complet*"
        value={address.fullName}
        onChange={(v) => setAddress({ ...address, fullName: v })}
      />
    </div>

    <div className="field">
      <Input
        label="Téléphone*"
        value={address.phone}
        onChange={(v) => setAddress({ ...address, phone: v })}
      />
    </div>

    <div className="field full">
      <Input
        label="Adresse*"
        value={address.line1}
        onChange={(v) => setAddress({ ...address, line1: v })}
      />
    </div>

    <div className="field">
      <Input
        label="Ville*"
        value={address.city}
        onChange={(v) => setAddress({ ...address, city: v })}
      />
    </div>

    <div className="field">
      <Input
        label="Code postal*"
        value={address.zip}
        onChange={(v) => setAddress({ ...address, zip: v })}
      />
    </div>

    <div className="field">
      <Input
        label="Pays"
        value={address.country}
        onChange={(v) => setAddress({ ...address, country: v })}
      />
    </div>
  </div>

  {/* 💡 關鍵樣式：避免右邊溢出 */}
  <style>{`
    .address-grid{
      display:grid;
      grid-template-columns: 1fr;
      gap:12px;
      width:100%;
      box-sizing:border-box;
    }
    @media (min-width: 768px){
      .address-grid{
        grid-template-columns: repeat(2, minmax(0,1fr)); /* 可收縮，避免被內容撐破 */
      }
    }
    .address-grid .field{
      min-width:0;                           /* 允許收縮 */
      max-width:100%;
    }
    .address-grid .field.full{
      grid-column:1 / -1;                    /* 佔滿整行 */
    }

    /* 讓任何表單容器/控制項都不超過格子寬 */
    .address-grid .field > *{
      max-width:100%;
      width:100%;
      box-sizing:border-box;
      display:block;
    }
    /* 如果你的 Input 裡包了 MUI TextField 或 InputBase，保險再限縮一次 */
    .address-grid .MuiFormControl-root,
    .address-grid .MuiInputBase-root,
    .address-grid input,
    .address-grid textarea,
    .address-grid label{
      max-width:100%;
      box-sizing:border-box;
    }
  `}</style>
</Card>



          {/* Livraison */}
          <Card>
            <h3 style={cardTitle}>Mode de livraison</h3>
            <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
              <RadioRow
                checked={shippingMethod === "standard"}
                onChange={() => setShippingMethod("standard")}
                title="Standard (3–5 jours)"
                subtitle={itemsSubtotal - discount >= 35 ? "Gratuite dès 35€" : "€4.90"}
              />
              <RadioRow
                checked={shippingMethod === "express"}
                onChange={() => setShippingMethod("express")}
                title="Express (1–2 jours)"
                subtitle="€9.90"
              />
              <small style={{ color: "#666" }}>
                Estimation de livraison : <strong>{estimateDelivery()}</strong>
              </small>
            </div>
          </Card>

          {/* Paiement */}
          <Card>
            <h3 style={cardTitle}>Mode de paiement</h3>
            <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
              <RadioRow
                checked={paymentMethod === "credit"}
                onChange={() => setPaymentMethod("credit")}
                title="Carte de crédit"
                subtitle="Visa, Mastercard"
              />
              <RadioRow
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
                title="PayPal"
                subtitle="Paiement sécurisé"
              />
              <RadioRow
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                title="Paiement à la livraison"
                subtitle="+€2.50 de frais"
              />
            </div>
          </Card>

          {/* Note */}
          <Card>
            <h3 style={cardTitle}>Remarques</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Avez-vous des demandes spécifiques ?"
              style={{
                width: "100%",
                minHeight: 100,
                marginTop: 12,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 14,
              }}
            />
          </Card>
        </div>

        {/* RIGHT */}
        <div style={{ flex: 1, position: "sticky", top: 24, alignSelf: "flex-start" }}>
          {/* Code promo */}
          <Card>
            <h3 style={cardTitle}>Code promo</h3>
            <div style={{ display: "flex", gap: 10 }}>
              <input
                placeholder="Ex: WELCOME10"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                style={inputStyle}
              />
              <button
                onClick={applyCoupon}
                style={{
                  padding: "12px 18px",
                  backgroundColor: C_ACCENT,
                  color: "white",
                  border: "none",
                  borderRadius: RADIUS,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Appliquer
              </button>
            </div>
            {couponApplied && (
              <p style={{ color: "#2e7d32", marginTop: 8 }}>
                Code <strong>{couponApplied.code}</strong> appliqué : −{couponApplied.pct}%.
              </p>
            )}
          </Card>

          {/* Summary */}
          <Card style={{ textAlign: "left" }}>
            <h3 style={{ color: C_PRIMARY, marginBottom: 12 }}>Récapitulatif</h3>
            <Row label="Sous-total" value={currency(itemsSubtotal)} />
            {discount > 0 && <Row label="Remise" value={`−${currency(discount)}`} />}
            <Row label="Frais de port" value={shippingCost === 0 ? "Gratuit" : currency(shippingCost)} />
            {paymentMethod === "cod" && <Row label="Frais COD" value={currency(codFee)} />}
            <Row label="TVA (5,5%)" value={currency(vat)} />
            <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "12px 0" }} />
            <Row label={<strong>Total</strong>} value={<strong>{currency(total)}</strong>} />
            <small style={{ color: "#666" }}>
              Livraison estimée : <strong>{estimateDelivery()}</strong>
            </small>

            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span style={{ color: "#555", fontSize: 14 }}>
                J’accepte les{" "}
                <Link to="/cgv" style={{ color: C_PRIMARY }}>
                  conditions générales de vente
                </Link>
                .
              </span>
            </div>

            <button
              onClick={handleOrderSubmit}
              disabled={
                cart.length === 0 || !isAddressValid() || !agreeTerms
              }
              style={{
                width: "100%",
                marginTop: 16,
                padding: "16px 28px",
                backgroundColor:
                  cart.length === 0 || !isAddressValid() || !agreeTerms ? "#a9b8b9" : C_ACCENT,
                color: "white",
                border: "none",
                borderRadius: RADIUS,
                cursor:
                  cart.length === 0 || !isAddressValid() || !agreeTerms ? "not-allowed" : "pointer",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Passer la commande
            </button>

            <div style={{ marginTop: 14, textAlign: "center" }}>
              <Link to="/" style={{ color: C_PRIMARY, textDecoration: "none" }}>
                Retour à l’accueil
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ marginTop: 16, display: "grid", gap: 6, color: "#666", fontSize: 13 }}>
              <span>✓ Paiement sécurisé</span>
              <span>✓ Retours sous 30 jours</span>
              <span>✓ Service client réactif</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

/* ----------------- Small UI helpers ----------------- */

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, style }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: RADIUS,
      padding: 20,
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      ...style,
    }}
  >
    {children}
  </div>
);

const Row: React.FC<{ label: React.ReactNode; value: React.ReactNode }> = ({ label, value }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "6px 0",
      color: "#333",
      fontSize: 15,
    }}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const RadioRow: React.FC<{
  checked: boolean;
  onChange: () => void;
  title: string;
  subtitle?: string;
}> = ({ checked, onChange, title, subtitle }) => (
  <label
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      borderRadius: 10,
      border: `1px solid ${checked ? C_PRIMARY : "#e0e0e0"}`,
      background: checked ? "#f1f6f6" : "#fff",
      cursor: "pointer",
    }}
  >
    <input type="radio" checked={checked} onChange={onChange} />
    <div>
      <div style={{ fontWeight: 600, color: "#333" }}>{title}</div>
      {subtitle && <div style={{ color: "#666", fontSize: 13 }}>{subtitle}</div>}
    </div>
  </label>
);

const Input: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  gridFull?: boolean;
}> = ({ label, value, onChange, gridFull }) => (
  <div style={{ gridColumn: gridFull ? "1 / -1" : "span 1" }}>
    <div style={{ color: "#555", fontSize: 14, marginBottom: 6 }}>{label}</div>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={inputStyle}
    />
  </div>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 14,
  outline: "none",
};

const EmptyCart = () => (
  <div
    style={{
      textAlign: "center",
      color: "#777",
      padding: "12px 0",
    }}
  >
    Votre panier est vide.{" "}
    <Link to="/" style={{ color: C_PRIMARY }}>
      Continuer vos achats
    </Link>
    .
  </div>
);

export default CheckoutPage;
