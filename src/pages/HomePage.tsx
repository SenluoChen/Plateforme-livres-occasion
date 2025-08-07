import { useState, useMemo } from "react";
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

export default function HomePage() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [filtreCategorie] = useState("");
  const [filtreOuvert, setFiltreOuvert] = useState(false);
  const [filtres, setFiltres] = useState<any>({});
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchResults, setSearchResults] = useState(livres);

  // 1️⃣ 先過濾 Livre[]
  const livresFiltres = useMemo(() => {
    return searchResults.filter((l) => {
      const correspondCategorie =
        !filtreCategorie || l.categorie === filtreCategorie;
      const correspondFiltreAvance =
        (!filtres.categorie || l.categorie === filtres.categorie) &&
        (!filtres.minPrice || l.prix >= filtres.minPrice) &&
        (!filtres.maxPrice || l.prix <= filtres.maxPrice) &&
        (!filtres.condition || l.condition === filtres.condition);

      return correspondCategorie && correspondFiltreAvance;
    });
  }, [searchResults, filtreCategorie, filtres]);

  // 2️⃣ 再把 Livre[] 轉換成 Product[]
  const produitsFiltres: Product[] = useMemo(
    () =>
      livresFiltres.map((l) => ({
        id: l.id,
        nom: l.titre, // ✅ 轉成 nom
        categorie: l.categorie,
        image: l.image,
        prix: l.prix ?? 0,
      })),
    [livresFiltres]
  );

  return (
    <>
      <Navbar
        recherche={recherche}
        setRecherche={setRecherche}
        setFiltreOuvert={setFiltreOuvert}
        onSearch={(results) => setSearchResults(results)}
      />

      <div className="shop-area">
        {/* ✅ 頂部 Banner Carrousel */}
        <div style={{ backgroundColor: "white" }}>
          <BannerCarousel />
        </div>

        <div
          className="app-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding: "20px 0",
          }}
        >
          {/* 第一行商品 */}
          <ProductCarousel products={produitsFiltres} onAddToCart={addToCart} />

          <div style={{ marginTop: "50px" }} />

          {/* 第二行商品（這裡先用相同的產品陣列，如果你有其他的，可以替換） */}
          <ProductCarousel products={produitsFiltres} onAddToCart={addToCart} />
        </div>
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
