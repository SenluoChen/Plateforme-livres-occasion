import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useCart, Product } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export type ProductCarouselProps = {
  products: Product[];
  onAddToCart?: (p: Product) => void;
  /** Controlled index (optional) */
  slideIndex?: number;
  /** Report index change (optional) */
  onSlideChange?: (i: number) => void;
};

const CARD_WIDTH = 220;
const GAP = 20;

// Animation
const ANIM_DURATION = 420; // ms
const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3);

const ProductCarouselImpl: React.FC<ProductCarouselProps> = ({
  products,
  onAddToCart,
  slideIndex,
  onSlideChange,
}) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Controlled / Uncontrolled
  const controlled = typeof slideIndex === "number";
  const [localIndex, setLocalIndex] = useState(0);
  const currentIndex = controlled ? (slideIndex as number) : localIndex;

  const isDownSm = useMediaQuery("(max-width:600px)");
  const isDownMd = useMediaQuery("(max-width:960px)");

  // Base visible count with peek (1.2 / 2.2 / 4.2)
  const visibleCount = useMemo(
    () => (isDownSm ? 1.2 : isDownMd ? 2.2 : 4.2),
    [isDownSm, isDownMd]
  );

  // Show ONE MORE full card in the viewport
  const FULL_BONUS = 1;
  const fullCount = Math.floor(visibleCount) + FULL_BONUS;

  const step = CARD_WIDTH + GAP;

  // Max index considering we show `fullCount` fully visible cards
  const maxIndex = Math.max(0, products.length - fullCount);

  // ===== rAF animation state =====
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animIdRef = useRef<number | null>(null);
  const currentPxRef = useRef(0); // source of truth translateX(px)

  const setIndex = (next: number) => {
    const clamped = Math.max(0, Math.min(maxIndex, next));
    if (controlled) onSlideChange?.(clamped);
    else setLocalIndex(clamped);
  };

  const scroll = (dir: "left" | "right") => {
    setIndex(currentIndex + (dir === "left" ? -1 : 1));
  };

  // map index -> translateX px
  const pxOf = (idx: number) => idx * step;

  // rAF tween
  const animateTo = (idx: number) => {
    const target = pxOf(idx);
    const start = currentPxRef.current;
    if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ANIM_DURATION);
      const eased = EASE_OUT_CUBIC(p);
      const x = start + (target - start) * eased;
      currentPxRef.current = x;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${x}px,0,0)`;
      }
      if (p < 1) animIdRef.current = requestAnimationFrame(tick);
      else animIdRef.current = null;
    };

    animIdRef.current = requestAnimationFrame(tick);
  };

  // Init transform
  useEffect(() => {
    currentPxRef.current = pxOf(currentIndex);
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${currentPxRef.current}px,0,0)`;
      trackRef.current.style.willChange = "transform";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate on index change
  useEffect(() => {
    animateTo(currentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Guard out-of-range on data/viewport change
  useEffect(() => {
    if (currentIndex > maxIndex) setIndex(maxIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxIndex, products.length]);

  const atStart = currentIndex === 0;
  const atEnd = currentIndex === maxIndex;

  // ===== Opacity / brightness helpers =====
  const fullyCount = fullCount; // number of fully visible cards
  const fullyStart = currentIndex;
  const fullyEnd = currentIndex + Math.max(0, fullyCount - 1);

  // Always highlight three center cards (best-effort when less)
  const centerStart = Math.max(
    fullyStart,
    Math.min(fullyEnd - 2, Math.floor((fullyStart + fullyEnd) / 2) - 1)
  );
  const centerMiddle = centerStart + 1;
  const centerEnd = Math.min(centerStart + 2, fullyEnd);

  // viewport width in px (exclude last GAP)
  const viewportPx = fullCount * step - GAP;

  const isBright = (idx: number) =>
    idx === centerStart || idx === centerMiddle || idx === centerEnd;

  const isPartial = (idx: number) => {
    const leftPx = idx * step - currentIndex * step;
    const rightPx = leftPx + CARD_WIDTH;
    return leftPx < 0 || rightPx > viewportPx; // not fully inside viewport
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: `${fullCount * step}px`, // wider to show 1 extra full card
        maxWidth: "100%",
        mx: "auto",
        mt: 5,
      }}
    >
      {/* Left arrow */}
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

      {/* Viewport */}
      <Box sx={{ overflow: "hidden" }}>
        <Box
          ref={trackRef}
          sx={{
            display: "flex",
            gap: `${GAP}px`,
            willChange: "transform",
          }}
        >
          {products.map((p, idx) => {
            const partial = isPartial(idx);
            const bright = isBright(idx);

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
                  // Center three always bright; only side partial cards are semi-transparent
                  opacity: partial && !bright ? 0.5 : 1,
                  transition: "opacity 200ms ease, box-shadow 200ms ease",
                  "&:hover": { boxShadow: 4, opacity: 1 },
                }}
                onClick={() => navigate(`/produit/${p.id}`)}
              >
                <img
                  src={p.image}
                  alt={p.nom}
                  loading="lazy"
                  decoding="async"
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
                    marginTop: "12px",
                    padding: "10px 20px",
                    backgroundColor: "#649a8b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "18px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#557f73")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#649a8b")
                  }
                >
                  Ajouter au panier
                </button>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Right arrow */}
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

// Re-render only when data or controlled index changes
const areEqual = (prev: ProductCarouselProps, next: ProductCarouselProps) => {
  const prevIds = prev.products.map((p) => p.id).join(",");
  const nextIds = next.products.map((p) => p.id).join(",");
  const prevIdx = typeof prev.slideIndex === "number" ? prev.slideIndex : -1;
  const nextIdx = typeof next.slideIndex === "number" ? next.slideIndex : -1;
  return prevIds === nextIds && prevIdx === nextIdx;
};

export default memo(ProductCarouselImpl, areEqual);
