import React, { useMemo, useState } from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useCart, Product } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

interface ProductCarouselProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

const CARD_WIDTH = 220;
const GAP = 20;

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onAddToCart }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isDownSm = useMediaQuery("(max-width:600px)");
  const isDownMd = useMediaQuery("(max-width:960px)");

  // 顯示數量 + 額外多顯示一張 (peek)
  const visibleCount = useMemo(() => (isDownSm ? 1.2 : isDownMd ? 2.2 : 4.2), [isDownSm, isDownMd]);

  const maxIndex = Math.max(0, products.length - Math.floor(visibleCount));

  const scroll = (dir: "left" | "right") => {
    setCurrentIndex((prev) => {
      if (dir === "left") return Math.max(0, prev - 1);
      return Math.min(maxIndex, prev + 1);
    });
  };

  const atStart = currentIndex === 0;
  const atEnd = currentIndex === maxIndex;

  return (
    <Box
      sx={{
        position: "relative",
        width: `${visibleCount * (CARD_WIDTH + GAP)}px`,
        maxWidth: "100%",
        mx: "auto",
        mt: 5,
      }}
    >
      {/* 左箭頭 */}
      <IconButton
        onClick={() => scroll("left")}
        disabled={atStart}
        sx={{
          position: "absolute",
          left: -50,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "#fff",
          boxShadow: 2,
          "&:hover": { backgroundColor: "#f5f5f5" },
          zIndex: 2,
          opacity: atStart ? 0.5 : 1,
        }}
      >
        <ArrowBackIos fontSize="small" />
      </IconButton>

      {/* 可視區域 */}
      <Box sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            gap: `${GAP}px`,
            transition: "transform 0.4s ease",
            transform: `translateX(-${currentIndex * (CARD_WIDTH + GAP)}px)`,
          }}
        >
          {products.map((p, idx) => {
            const isFirstVisible = idx === currentIndex;
            const isLastVisible = idx === currentIndex + Math.floor(visibleCount) - 1;

            return (
              <Box
                key={p.id}
                sx={{
                  width: `${CARD_WIDTH}px`,
                  flexShrink: 0,
                  background: "#fff",
                  boxShadow: 2,
                  borderRadius: 2,
                  p: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  opacity: isFirstVisible || isLastVisible ? 0.5 : 1, // 左右最外側半透明
                  transition: "opacity 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": { boxShadow: 4, opacity: 1 },
                }}
                onClick={() => navigate(`/produit/${p.id}`)}
              >
                <img
                  src={p.image}
                  alt={p.nom}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h4
                  style={{
                    fontSize: "16px",
                    margin: "10px 0 5px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.nom}
                </h4>
                <p style={{ fontWeight: "bold", color: "#333" }}>
                  {p.prix?.toFixed(2)} €
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    (onAddToCart ?? addToCart)({
                      id: p.id,
                      nom: p.nom,
                      categorie: p.categorie,
                      image: p.image,
                      prix: p.prix ?? 0,
                    });
                  }}
                  style={{
                    marginTop: "8px",
                    padding: "6px 12px",
                    backgroundColor: "#649a8b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Ajouter
                </button>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* 右箭頭 */}
      <IconButton
        onClick={() => scroll("right")}
        disabled={atEnd}
        sx={{
          position: "absolute",
          right: -50,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "#fff",
          boxShadow: 2,
          "&:hover": { backgroundColor: "#f5f5f5" },
          zIndex: 2,
          opacity: atEnd ? 0.5 : 1,
        }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default ProductCarousel;
