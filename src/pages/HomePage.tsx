// src/pages/HomePage.tsx
import { useMemo, useDeferredValue, useEffect,useState } from "react";
import "../App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import BookFilterModal from "../components/BookFilterModal";
import BannerCarousel from "../components/BannerCarousel";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { livres } from "../data/livres";
import ProductCarousel from "../components/ProductCarousel";
import { Product } from "../contexts/CartContext";
import { ReactNode } from "react";






export default function HomePage() {
  const [recherche, setRecherche] = useState("");
  const [filtreCategorie, setFiltreCategorie] = useState("");
  const [filtreOuvert, setFiltreOuvert] = useState(false);
  const [filtres, setFiltres] = useState<any>({});
  const [searchResults, setSearchResults] = useState(livres);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const deferredResults = useDeferredValue(searchResults);
  const deferredFiltreCategorie = useDeferredValue(filtreCategorie);
  const deferredFiltres = useDeferredValue(filtres);
  const [slideIndex, setSlideIndex] = useState(0);



  // ——— Helpers ———
  const avgFromAvis = (avis: { note: number }[] = []) =>
    avis.length ? avis.reduce((s, a) => s + (a.note ?? 0), 0) / avis.length : 0;

  // 類別 chips（依數量排序，最多 8）
  const categories = useMemo(() => {
    const map = new Map<string, number>();
    searchResults.forEach((l) => map.set(l.categorie, (map.get(l.categorie) ?? 0) + 1));
    return Array.from(map.entries())
      .map(([cat, count]) => ({ cat, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [searchResults]);

  

// 取代你原本的 livresFiltres 定義
const livresFiltres = useMemo(() => {
  return deferredResults.filter((l) => {
    const matchCat = !deferredFiltreCategorie || l.categorie === deferredFiltreCategorie;
    const matchAdv =
      (!deferredFiltres.categorie || l.categorie === deferredFiltres.categorie) &&
      (!deferredFiltres.minPrice || l.prix >= deferredFiltres.minPrice) &&
      (!deferredFiltres.maxPrice || l.prix <= deferredFiltres.maxPrice) &&
      (!deferredFiltres.condition || l.condition === deferredFiltres.condition);
    return matchCat && matchAdv;
  });
}, [deferredResults, deferredFiltreCategorie, deferredFiltres]);

useEffect(() => {
  const ids = livresFiltres.map(x => x.id).join(",");
  setSlideIndex(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [livresFiltres.map(x => x.id).join(",")]);

  // 2) 轉 Product[]
  const toProducts = (list: typeof livres) =>
    list.map<Product>((l) => ({
      id: l.id,
      nom: l.titre,
      categorie: l.categorie,
      image: l.image,
      prix: l.prix ?? 0,
    }));

  // 區段資料：熱賣 / 新品
  const bestSellersProducts: Product[] = useMemo(() => {
    const sorted = [...livresFiltres].sort((a, b) => {
      const bc = b.avis.length - a.avis.length;
      if (bc !== 0) return bc;
      return avgFromAvis(b.avis) - avgFromAvis(a.avis);
    });
    return toProducts(sorted);
  }, [livresFiltres]);

  const newArrivalsProducts: Product[] = useMemo(() => {
    const sorted = [...livresFiltres].sort((a, b) => b.id - a.id);
    return toProducts(sorted);
  }, [livresFiltres]);

  const isEmpty = livresFiltres.length === 0;

const Container: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style = {},
}) => (
  <div
    style={{
      width: "100%",
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 20px",
      ...style,
    }}
  >
    {children}
  </div>
);

  const Hairline = ({ mt = 16, mb = 16 }: { mt?: number; mb?: number }) => (
    <div
      style={{
        height: 1,
        background:
          "linear-gradient(to right, rgba(0,0,0,0.06), rgba(0,0,0,0.04), rgba(0,0,0,0.02), transparent)",
        marginTop: mt,
        marginBottom: mb,
      }}
    />
  );

  // 在 return 上面加
const [bestSellersIndex, setBestSellersIndex] = useState(0);
const [newArrivalsIndex, setNewArrivalsIndex] = useState(0);

useEffect(() => {
  setBestSellersIndex(0);
}, [bestSellersProducts.map(p => p.id).join(",")]);

useEffect(() => {
  setNewArrivalsIndex(0);
}, [newArrivalsProducts.map(p => p.id).join(",")]);

  return (
    <>
      <Navbar
        recherche={recherche}
        setRecherche={setRecherche}
        setFiltreOuvert={setFiltreOuvert}
        onSearch={(results) => setSearchResults(results)}
      />

      {/* Hero / Banner：留白加大，Apple 風格 */}
      <div style={{ backgroundColor: "#fff" }}>
        <Container style={{ paddingTop: 12, paddingBottom: 35 }}>
          <BannerCarousel />
        </Container>
      </div>


   {/* 類別選單（膠囊 chips，微陰影） */}
<Container style={{ marginTop: 18 }}>
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      justifyContent: "center", // ✅ 置中！
      paddingTop: 5,
    }}
  >
    <Pill
      active={filtreCategorie === ""}
      onClick={() => setFiltreCategorie("")}
      label="Tous"
    />
    {categories.map(({ cat }) => (
      <Pill
        key={cat}
        active={filtreCategorie === cat}
        onClick={() => setFiltreCategorie(cat)}
        label={cat}
      />
    ))}
  </div>
</Container>

      <Hairline mt={18} mb={0} />

{/* 商品區域（Apple 風留白、髮絲線分隔、清晰標題） */}
<div style={{ backgroundColor: "#fff" }}>
  <Container style={{ paddingTop: 40, paddingBottom: 40 }}>
    <SectionHeader
      title="Meilleures ventes"
   
    />

    {isEmpty ? (
      <EmptyState />
    ) : (
      <ProductCarousel
        products={bestSellersProducts}
        onAddToCart={addToCart}
        slideIndex={bestSellersIndex}
        onSlideChange={setBestSellersIndex}
      />
    )}

    <Hairline mt={28} mb={24} />

    <SectionHeader
      title="Nouveautés"
     
    />
    {isEmpty ? (
      <EmptyState />
    ) : (
      <ProductCarousel
        products={newArrivalsProducts}
        onAddToCart={addToCart}
        slideIndex={newArrivalsIndex}
        onSlideChange={setNewArrivalsIndex}
      />
    )}
  </Container>
</div>


      {/* 篩選彈窗 */}
      <BookFilterModal
        open={filtreOuvert}
        onClose={() => setFiltreOuvert(false)}
        onApply={(applied) => {
          setFiltres(applied);
          setFiltreOuvert(false);
        }}
      />

      <Footer />
    </>
  );
}

/* ====== Apple 風格小元件 ====== */

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;         // 保持 string
  subtitle?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#2b3f40",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 0.2,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* 左側色條 */}
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "28px",
              backgroundColor: "#649a8b",
              borderRadius: "3px",
            }}
          />
          {/* 標題 + 底線 */}
          <span style={{ position: "relative", color: "#222" }}>
            {title}
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: -4,
                width: "100%",
                height: "3px",
                backgroundColor: "#649a8b",
                borderRadius: "2px",
                opacity: 0.6,
              }}
            />
          </span>
        </h2>

        {subtitle && (
          <div style={{ color: "#65797a", fontSize: 13, marginTop: 4 }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: 999,
        border: active ? "1px solid #649a8b" : "1px solid #e3e8e8",
        background: active ? "#649a8b" : "#fff",
        color: active ? "#fff" : "#2b3f40",
        cursor: "pointer",
        fontWeight: 600,
        boxShadow: active ? "0 6px 16px rgba(100,154,139,0.25)" : "0 2px 10px rgba(0,0,0,0.04)",
        transition: "all .2s ease",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)";
        }
      }}
      title={label}
    >
      {label}
    </button>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        width: "100%",
        padding: "28px 16px",
        textAlign: "center",
        color: "#667",
        borderRadius: 16,
        background: "#fafafa",
      }}
    >
      Aucun produit ne correspond aux filtres.
    </div>
  );
}
