// src/pages/ProductDetail.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Rating,
  Table,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  Stack,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Share as ShareIcon,
  LocalShipping,
  CheckCircle,
  FavoriteBorder,
} from "@mui/icons-material";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import BannerCarousel from "../components/BannerCarousel";
import { useCart } from "../contexts/CartContext";
import { livres } from "../data/livres";
import AvisClients from "../components/AvisClients";

// ---- Helpers ----
const getRecommandations = (currentId: number, limit = 20) => {
  const autres = livres.filter((l) => l.id !== currentId);
  const melange = [...autres].sort(() => 0.5 - Math.random());
  return melange.slice(0, Math.min(limit, melange.length)).map((l) => ({
    id: l.id,
    nom: l.titre,
    image: l.image,
    price: l.prix,
  }));
};

const CARD_W = 150; // 卡片寬度
const GAP = 24; // 卡片間距

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const [avg, setAvg] = useState(0);
  const [cnt, setCnt] = useState(0);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);

  // ---- Data & fallbacks ----
  const produit = livres.find((p) => p.id === Number(id));
  const rating =
    (produit as any)?.rating ??
    (produit?.avis?.length
      ? produit.avis.reduce((s: number, a: any) => s + (a.note ?? 0), 0) / produit.avis.length
      : 4.6);
  const reviewsCount = (produit as any)?.reviewsCount ?? (produit?.avis?.length ?? 128);
  const stock = (produit as any)?.stock ?? 7; // show urgency if < 10
  const promoPercent = (produit as any)?.promoPercent ?? (rating > 4.5 ? 15 : 0);

  // images: support array (produit.images) or single (produit.image)
  const images: string[] = useMemo(() => {
    const fromData = (produit as any)?.images as string[] | undefined;
    if (fromData && fromData.length) return fromData;
    if (produit?.image) {
      // fabricate a couple of variants so carousel isn't empty
      return [produit.image, produit.image, produit.image];
    }
    return [];
  }, [produit]);

  const [selectedImage, setSelectedImage] = useState<string>(images[0] || produit?.image || "");
  const [qty, setQty] = useState<number>(1);
  const [shipping, setShipping] = useState<"std" | "exp" | "relay">("std");
  const [zoomOpen, setZoomOpen] = useState(false);

  // search bar state for Navbar
  const [recherche, setRecherche] = useState("");
  const [filtreOuvert, setFiltreOuvert] = useState(false);

  // date de livraison (based on option)
  const baseDays = shipping === "exp" ? 1 : shipping === "relay" ? 2 : 3;
  const dateLivraison = new Date();
  dateLivraison.setDate(dateLivraison.getDate() + baseDays);
  const dateLivraisonStr = format(dateLivraison, "d MMMM", { locale: fr });

  // recommandations
const recommandationsList = useMemo(() => getRecommandations(Number(id), 15), [id]);

  // scroll to top on mount or id change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 👉 點擊「xx avis」時滾動到評論區
  const scrollToAvis = () => {
    document.getElementById("avis")?.scrollIntoView({ behavior: "smooth" });
  };

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

  // ---- Share handlers ----
  const shareTitle = encodeURIComponent(produit.titre);
  const shareUrl = encodeURIComponent(window.location.href);
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({ title: produit.titre, text: produit.description, url: window.location.href })
        .catch(() => {});
    } else {
      // fallback: open X/Twitter
      window.open(`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`, "_blank");
    }
  };

  // ---- Spec table (show only available fields if exist) ----
  const specs: { label: string; value: string | number | undefined }[] = [
    { label: "Auteur", value: (produit as any)?.auteur },
    { label: "Éditeur", value: (produit as any)?.editeur },
    { label: "Langue", value: (produit as any)?.langue },
    { label: "ISBN", value: (produit as any)?.isbn },
    { label: "Pages", value: (produit as any)?.pages },
    { label: "Catégorie", value: produit.categorie },
  ].filter((s) => s.value !== undefined && s.value !== "");

  return (
    <>
      <Navbar
        recherche={recherche}
        setRecherche={setRecherche}
        setFiltreOuvert={setFiltreOuvert}
        onSearch={() => {}}
      />

      <Box
        sx={{
          display: "flex",
          gap: 4,
          alignItems: "flex-start",
          px: 4,
          py: 3,
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        {/* ---- Left: gallery ---- */}
        <Box sx={{ width: { xs: "100%", md: 380 } }}>
          <Box sx={{ position: "relative", mb: 2 }}>
            {/* Badges */}
            <Stack direction="row" spacing={1} sx={{ position: "absolute", top: 8, left: 8, zIndex: 1 }}>
              {promoPercent > 0 && <Chip color="error" label={`-${promoPercent}%`} size="small" />}
              {rating >= 4.5 && <Chip color="success" label="Bestseller" size="small" />}
            </Stack>

            {/* Main image */}
            <Box
              sx={{
                width: "100%",
                height: 380,
                backgroundColor: "#f6f6f6",
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "zoom-in",
              }}
              onClick={() => selectedImage && setZoomOpen(true)}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={produit.titre}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Aucune image
                </Typography>
              )}
            </Box>
          </Box>

         {/* Thumbnails */}
{images.length > 1 && (
  <Box sx={{ display: "flex", gap: 1 }}>
    <Box
      onClick={() => setSelectedImage(images[1])} // 第二張圖
      sx={{
        width: 72,
        height: 72,
        borderRadius: 1,
        overflow: "hidden",
        border: selectedImage === images[1] ? "2px solid #1976d2" : "1px solid #e0e0e0",
        cursor: "pointer",
      }}
    >
      <img
        src={images[1]}
        alt="thumb-1"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
  </Box>
)}
        </Box>

        {/* ---- Middle: title / description / rating / specs ---- */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
            {produit.titre}
          </Typography>

         {/* rating */}
<Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
  <Box
    sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    onClick={scrollToAvis} // ✅ 點整個區塊都可跳轉
  >
    <Rating value={rating} precision={0.1} readOnly />
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ ml: 1, "&:hover": { textDecoration: "underline" } }}
    >
      {reviewsCount} avis
    </Typography>
  </Box>
</Stack>
          {/* Stock info */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <CheckCircle fontSize="small" color="success" />
            <Typography variant="body2" color={stock < 5 ? "error.main" : "success.main"}>
              {stock > 0 ? (stock < 5 ? `Plus que ${stock} en stock` : "En stock") : "Rupture de stock"}
            </Typography>
          </Stack>

          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Résumé
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {produit.description}
          </Typography>

          {/* Specs table */}
          {specs.length > 0 && (
            <>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Détails du produit
              </Typography>
              <Table size="small" sx={{ maxWidth: 560, mb: 2 }}>
                <TableBody>
                  {specs.map((s) => (
                    <TableRow key={s.label}>
                      <TableCell sx={{ width: 160, color: "text.secondary" }}>{s.label}</TableCell>
                      <TableCell>{s.value as any}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </Box>

        {/* ---- Right: purchase card ---- */}
        <Box
          sx={{
            position: { md: "sticky" },
            top: { md: 80 },
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            p: 2,
            width: { xs: "100%", md: 300 },
            backgroundColor: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          {/* Price (with promo) */}
          <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="h5" color="error" fontWeight={800}>
              €
              {(produit.prix * (promoPercent ? (100 - promoPercent) / 100 : 1)).toFixed(2)}
            </Typography>
            {promoPercent > 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                €{produit.prix.toFixed(2)}
              </Typography>
            )}
          </Stack>

          {/* Shipping options */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <LocalShipping fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Livré à partir du{" "}
              <Box component="span" fontWeight="bold" color="text.primary">
                {dateLivraisonStr}
              </Box>
            </Typography>
          </Stack>

          <RadioGroup value={shipping} onChange={(e) => setShipping(e.target.value as any)} sx={{ mb: 1 }}>
            <FormControlLabel value="std" control={<Radio />} label="Standard (3–5 j) — Gratuit dès 35€" />
            <FormControlLabel value="exp" control={<Radio />} label="Express (24–48h)" />
            <FormControlLabel value="relay" control={<Radio />} label="Point relais (2–3 j)" />
          </RadioGroup>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Retour gratuit sous 30 jours
          </Typography>

          <Divider sx={{ my: 1 }} />

          {/* Quantity */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography variant="body1">Quantité :</Typography>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              style={{ padding: "4px 8px", borderRadius: 15, border: "1px solid #ccc" }}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                borderRadius: "15px",
                backgroundColor: "#649a8b",
                "&:hover": { backgroundColor: "#578a7c" },
              }}
              disabled={stock === 0}
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
            <Tooltip title="Ajouter aux favoris">
              <IconButton>
                <FavoriteBorder />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Box>

      {/* ---- Recommandations ---- */}
      <Box sx={{ px: 4, pb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, mt: 4, fontWeight: "bold" }}>
          Ces livres pourraient aussi vous plaire :
        </Typography>

        <Box sx={{ position: "relative" }}>
          {/* 左箭頭 */}
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

          {/* 可滾動容器 */}
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
                onClick={() => navigate(`/produit/${item.id}`)}
                sx={{
                  flex: "0 0 180px",
                  border: "1px solid #eee",
                  borderRadius: 2,
                  p: 2,
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
                    minHeight: 42, // 兩行高度一致
                  }}
                >
                  {item.nom}
                </Typography>

                <Typography variant="subtitle1" color="error" sx={{ mb: 1 }}>
                  {(item.price ?? 0).toFixed(2)} €
                </Typography>

                {/* ✅ 加入購物車按鈕（阻止冒泡避免跳轉） */}
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "15px",
                    backgroundColor: "#649a8b",
                    "&:hover": { backgroundColor: "#578a7c" },
                    textTransform: "none",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    padding: "5px 35px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      id: item.id,
                      nom: item.nom,
                      prix: item.price ?? 0,
                      image: item.image,
                      categorie: "recommandation",
                    });
                  }}
                >
                  Ajouter
                </Button>
              </Box>
            ))}
          </Box>

          {/* 右箭頭 */}
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

      {/* ---- Banner ---- */}
      <Box sx={{ py: 2 }}>
        <BannerCarousel />
      </Box>

      {/* ---- Avis ---- */}
      <AvisClients
        anchorId="avis"
        avis={produit.avis ?? []}
        initialShow={3}
        enableSummary
        enableSort
        onRatingComputed={(r, c) => {
          setAvg(r);
          setCnt(c);
        }}
        onWriteReview={() => setOpenReviewDialog(true)}
      />

      {/* ---- New review dialog ---- */}
      <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)}>
        <DialogTitle>Rédiger un avis</DialogTitle>
        <DialogContent>{/* TODO: 表單 */}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReviewDialog(false)}>Annuler</Button>
          <Button variant="contained" onClick={() => setOpenReviewDialog(false)}>
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />

      {/* ---- Zoom dialog ---- */}
      <Dialog open={zoomOpen} onClose={() => setZoomOpen(false)} maxWidth="lg">
        <DialogContent sx={{ p: 0 }}>
          <img
            src={selectedImage}
            alt="zoom"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            onClick={() => setZoomOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* ---- Mobile sticky bottom bar ---- */}
      <Box
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          display: { xs: "flex", md: "none" },
          gap: 1,
          p: 1.5,
          bgcolor: "background.paper",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.08)",
          zIndex: 10,
        }}
      >
        <Button fullWidth variant="outlined" onClick={handleShare} startIcon={<ShareIcon />}>
          Partager
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="warning"
          disabled={stock === 0}
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
          Ajouter
        </Button>
      </Box>
    </>
  );
}
