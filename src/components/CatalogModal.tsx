import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
  Chip,
  Typography,
  Stack,
  Badge,
} from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import type { Livre } from "../data/livres";

type Props = {
  open: boolean;
  onClose: () => void;
  livres: Livre[];
};

function avgFromAvis(avis: Livre["avis"]) {
  if (!avis?.length) return 0;
  return avis.reduce((s, a) => s + (a.note ?? 0), 0) / avis.length;
}

export default function CatalogModal({ open, onClose, livres }: Props) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string>("Tous");

  const grouped = useMemo(() => {
    const byCat = new Map<string, Livre[]>();
    livres.forEach((l) => {
      const key = l.categorie || "Autres";
      if (!byCat.has(key)) byCat.set(key, []);
      byCat.get(key)!.push(l);
    });
    return byCat;
  }, [livres]);

  const categories = useMemo(() => {
    const arr = Array.from(grouped.entries())
      .map(([cat, items]) => ({ cat, count: items.length }))
      .sort((a, b) => a.cat.localeCompare(b.cat, "fr"));
    return [{ cat: "Tous", count: livres.length }, ...arr];
  }, [grouped, livres.length]);

  const filtered = useMemo(() => {
    let all = activeCat === "Tous" ? livres : (grouped.get(activeCat) ?? []);
    if (q.trim()) {
      const qq = q.toLowerCase();
      all = all.filter(
        (l) =>
          l.titre.toLowerCase().includes(qq) ||
          (l.categorie || "").toLowerCase().includes(qq)
      );
    }
    // 排序：先依分類、再依評分高到低
    return [...all].sort((a, b) => {
      const rdiff = avgFromAvis(b.avis) - avgFromAvis(a.avis);
      if (Math.abs(rdiff) > 0.01) return rdiff;
      return a.titre.localeCompare(b.titre, "fr");
    });
  }, [q, activeCat, grouped, livres]);

  const handleSelect = (id: number) => {
    onClose();
    navigate(`/produit/${id}`);
  };

  return (
<Dialog
  open={open}
  onClose={onClose}
  maxWidth="md"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: "16px", 
    },
  }}
>
  <DialogTitle
    sx={{
      pr: 6,
      backgroundColor: "#649a8b",
      color: "#fff",
    }}
  >
    Catalogue des ouvrages
    <IconButton
      onClick={onClose}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        color: "#fff", // 關閉按鈕白色
      }}
      aria-label="Fermer"
    >
      <Close />
    </IconButton>
  </DialogTitle>


      <DialogContent dividers sx={{ p: 0 }}>
        <Box sx={{ display: "flex", minHeight: 520 }}>
          {/* 左側：分類 */}
          <Box
            sx={{
              width: 220,
              borderRight: "1px solid #eee",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              size="small"
              placeholder="Rechercher un titre, une catégorie…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <List dense disablePadding sx={{ mt: 1, overflowY: "auto" }}>
              {categories.map(({ cat, count }) => (
                <ListItemButton
                  key={cat}
                  selected={activeCat === cat}
                  onClick={() => setActiveCat(cat)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                  }}
                >
                  <ListItemText
                    primary={
                      <Stack direction="row" justifyContent="space-between" width="100%">
                        <span>{cat}</span>
                        <Chip size="small" label={count} />
                      </Stack>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>

          {/* 右側：清單 */}
          <Box sx={{ flex: 1, p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              {filtered.length} résultat{filtered.length > 1 ? "s" : ""} ·{" "}
              {activeCat}
            </Typography>

            <Divider sx={{ mb: 1 }} />

            <List dense sx={{ maxHeight: 460, overflowY: "auto" }}>
              {filtered.map((l) => {
                const rating = avgFromAvis(l.avis);
                return (
                  <React.Fragment key={l.id}>
                    <ListItemButton
                      onClick={() => handleSelect(l.id)}
                      sx={{
                        borderRadius: 1,
                        "&:hover": { backgroundColor: "#f6f8f8" },
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          overlap="circular"
                          badgeContent={
                            l.stock > 0 ? (
                              <Chip size="small" color="success" label="En stock" />
                            ) : (
                              <Chip size="small" color="error" label="Rupture" />
                            )
                          }
                          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        >
                          <Avatar
                            variant="rounded"
                            src={l.image}
                            alt={l.titre}
                            sx={{ width: 48, height: 48 }}
                          />
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                            <Typography sx={{ fontWeight: 600 }}>{l.titre}</Typography>
                            <Chip size="small" label={l.categorie} />
                          </Stack>
                        }
                        secondary={
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body2" color="text.primary">
                              €{l.prix.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {rating > 0 ? `★ ${rating.toFixed(1)} (${l.avis.length})` : "Sans avis"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {l.langue}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {l.condition}
                            </Typography>
                          </Stack>
                        }
                      />
                    </ListItemButton>
                    <Divider component="li" />
                  </React.Fragment>
                );
              })}

              {filtered.length === 0 && (
                <Box sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>
                  Aucun résultat.
                </Box>
              )}
            </List>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
