import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import Navbar from "../components/Navbar";
import { useCart } from '../contexts/CartContext'; // ✅ Contexte du panier
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useRef } from 'react';
import BannerCarousel from "../components/BannerCarousel";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { livres } from "../data/livres";
import Footer from "../components/footer";




const recommandations = (currentId: number) => {
  // 過濾掉當前書籍
  const autresLivres = livres.filter((l) => l.id !== currentId);

  // 打亂順序
  const melange = autresLivres.sort(() => 0.5 - Math.random());

  // 回傳 5 本推薦書
  return melange.slice(0, 5).map((l) => ({
    id: l.id,
    nom: l.titre,
    image: l.image,
    price: l.prix,
  }));
};

export default function ProductDetail() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const produit = livres.find((p) => p.id === Number(id)); // 找對應書籍
  const [selectedImage, setSelectedImage] = useState<string>(produit?.image || "");
  const { addToCart } = useCart();

  const joursLivraison = 3;
  const dateLivraison = new Date();
  dateLivraison.setDate(dateLivraison.getDate() + joursLivraison);
  const dateLivraisonStr = format(dateLivraison, "d MMMM", { locale: fr });

  const [recherche, setRecherche] = useState("");
  const [filtreOuvert, setFiltreOuvert] = useState(false);

  // ✅ 先呼叫函數，取得推薦書陣列
const recommandationsList = recommandations(Number(id));

  if (!produit) {
    return (
      <>
        <Navbar
          recherche={recherche}
          setRecherche={setRecherche}
          setFiltreOuvert={setFiltreOuvert}
          onSearch={() => {}}
        />
        <Box sx={{ padding: 4 }}>❌ Produit introuvable</Box>
      </>
    );
  }

   return (
    <>
      <Navbar
        recherche={recherche}
        setRecherche={setRecherche}
        setFiltreOuvert={setFiltreOuvert}
        onSearch={() => {}}
      />

      <Box sx={{ display: "flex", padding: 4, gap: 4, alignItems: "flex-start" }}>
        {/* --- 左邊：圖片 --- */}
        <Box>
          <Box
            sx={{
              width: 320,
              height: 320,
              backgroundColor: "#f3f3f3",
              borderRadius: 2,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={produit.titre}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            ) : (
              <Typography variant="body1" color="text.secondary">
                Aucune image
              </Typography>
            )}
          </Box>
        </Box>

        {/* --- 中間：描述 --- */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {produit.titre}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Résumé
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {produit.description}
          </Typography>
        </Box>

        {/* --- 右邊：購買卡片 --- */}
        <Box
          sx={{
            position: "sticky",
            top: 80,
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
            width: 260,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h5" color="error">
            €{produit.prix}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Livré à partir du{" "}
            <Box component="span" fontWeight="bold" sx={{ color: "black" }}>
              {dateLivraisonStr}
            </Box>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Livraison gratuite dès 35€
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1">Quantité :</Typography>
            <select
              style={{
                padding: "4px 8px",
                borderRadius: 15,
                border: "1px solid #ccc",
              }}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Box>

          <Button
            variant="contained"
            color="warning"
            style={{ borderRadius: "15px" }}
            onClick={() =>
              addToCart({
                id: produit.id,
                nom: produit.titre,
                prix: produit.prix,
                image: produit.image,
                categorie: produit.categorie,
              })
            }
          >
            Ajouter au panier
          </Button>
        </Box>
      </Box>

      {/* --- 推薦商品 --- */}
      <Box sx={{ px: 4, pb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, mt: 6, fontWeight: "bold" }}>
          Ces livres pourraient aussi vous plaire :
        </Typography>

        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "#fff",
              boxShadow: 2,
              "&:hover": { backgroundColor: "#f1f1f1" },
              zIndex: 1,
            }}
          >
            <ArrowBackIos fontSize="small" />
          </IconButton>

          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              overflow: "hidden",
              scrollBehavior: "smooth",
              justifyContent: "center",
              gap: 3,
              px: 6,
            }}
          >
        {recommandationsList.map((item) => (
              <Box
                key={item.id}
                sx={{
                  flex: "0 0 180px",
                  border: "1px solid #eee",
                  borderRadius: 2,
                  padding: 2,
                  textAlign: "center",
                  backgroundColor: "#fff",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <img
                  src={item.image}
                  alt={item.nom}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: 8,
                    marginBottom: "8px",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    mb: 1,
                  }}
                >
                  {item.nom}
                </Typography>
                <Typography variant="subtitle1" color="error">
                  {item.price.toFixed(2)} €
                </Typography>
              </Box>
            ))}
          </Box>

          <IconButton
            onClick={() => scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "#fff",
              boxShadow: 2,
              "&:hover": { backgroundColor: "#f1f1f1" },
              zIndex: 1,
            }}
          >
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Box>
      </Box>

           {/* BannerCarousel 放在這裡 */}
      <div style={{ padding: "20px 0"}}>
        <BannerCarousel />
      </div>
      


 <Footer />
    </>
  );
}