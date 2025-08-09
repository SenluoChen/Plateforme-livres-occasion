import React, { useMemo, useState, useEffect } from "react";
import {
  Box, Stack, Typography, Rating, LinearProgress, Divider, Select, MenuItem,
  Chip, IconButton, Card, CardContent, Avatar, Button
} from "@mui/material";
import { ThumbUpOffAlt, FlagOutlined, CheckCircleOutline } from "@mui/icons-material";

export interface Avis {
  nom: string;
  note: number;
  date: string;        // ISO or any parseable string
  commentaire: string;
}

interface AvisClientsProps {
  avis?: Avis[];

  /** 初始顯示幾則評論（預設 3） */
  initialShow?: number;

  /** 是否顯示上方的平均分/分佈摘要（預設 true） */
  enableSummary?: boolean;

  /** 是否顯示排序下拉（預設 true） */
  enableSort?: boolean;

  /** 父層可接收計算結果（平均分、評論數） */
  onRatingComputed?: (avgRating: number, count: number) => void;

  /** 點擊「撰寫評論」時外部處理（例如打開對話框） */
  onWriteReview?: () => void;

  /** 這個區塊的 DOM id（預設 "avis"），方便用 #avis 跳錨 */
  anchorId?: string;
}

const AvisClients: React.FC<AvisClientsProps> = ({
  avis = [],
  initialShow = 3,
  enableSummary = true,
  enableSort = true,
  onRatingComputed,
  onWriteReview,
  anchorId = "avis",
}) => {
  // ---- derived values ----
  const avisCount = avis.length;

  const avgRating = useMemo(() => {
    if (!avisCount) return 0;
    const sum = avis.reduce((s, a) => s + (a.note ?? 0), 0);
    return sum / avisCount;
  }, [avis, avisCount]);

  const distribution = useMemo(() => {
    return [5, 4, 3, 2, 1].map(star =>
      avis.filter(a => Math.round(a.note) === star).length
    );
  }, [avis]);

  useEffect(() => {
    onRatingComputed?.(avgRating, avisCount);
  }, [avgRating, avisCount, onRatingComputed]);

  // ---- local state ----
  const [avisSort, setAvisSort] = useState<"recent" | "top" | "high" | "low">("recent");
  const [showCount, setShowCount] = useState(initialShow);

  const sortedAvis = useMemo(() => {
    const arr = [...avis];
    switch (avisSort) {
      case "top":
      case "high":
        return arr.sort((a, b) => (b.note ?? 0) - (a.note ?? 0));
      case "low":
        return arr.sort((a, b) => (a.note ?? 0) - (b.note ?? 0));
      case "recent":
      default:
        return arr.sort(
          (a, b) =>
            new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
        );
    }
  }, [avis, avisSort]);

  return (
    <Box id={anchorId} sx={{ px: 4, py: 6, backgroundColor: "#fafafa", borderRadius: 2, mt: 6 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Avis des clients
        </Typography>

        {enableSort && avisCount > 0 && (
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">Trier par</Typography>
            <Select
              size="small"
              value={avisSort}
              onChange={(e) => setAvisSort(e.target.value as any)}
              sx={{ minWidth: 160, background: "#fff", borderRadius: 2 }}
            >
              <MenuItem value="recent">Plus récents</MenuItem>
              <MenuItem value="top">Meilleurs avis</MenuItem>
              <MenuItem value="high">Note la plus élevée</MenuItem>
              <MenuItem value="low">Note la plus basse</MenuItem>
            </Select>
          </Stack>
        )}
      </Stack>

      {/* Summary */}
      {enableSummary && (
        <Card sx={{ mb: 3, borderRadius: 2 }}>
          <CardContent>
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <Stack alignItems="center" justifyContent="center" sx={{ minWidth: 180 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1 }}>
                  {avgRating.toFixed(1)}
                </Typography>
                <Rating value={avgRating} precision={0.1} readOnly sx={{ mt: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {avisCount} avis
                </Typography>
              </Stack>

              <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />

              {/* Distribution */}
              <Box sx={{ flex: 1 }}>
                {[5, 4, 3, 2, 1].map((star, idx) => {
                  const count = distribution[idx];
                  const pct = avisCount ? Math.round((count / avisCount) * 100) : 0;
                  return (
                    <Stack key={star} direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <Typography sx={{ width: 36 }}>{star}★</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={pct}
                        sx={{ flex: 1, height: 8, borderRadius: 10 }}
                      />
                      <Typography sx={{ width: 56, textAlign: "right" }}>{pct}%</Typography>
                    </Stack>
                  );
                })}
              </Box>

              {/* Badges */}
              <Stack spacing={1} sx={{ minWidth: 200 }}>
                <Chip icon={<CheckCircleOutline />} label="Achats vérifiés" variant="outlined" />
                <Chip label="Retours sous 30 jours" variant="outlined" />
                <Chip label="Avis modérés automatiquement" variant="outlined" />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* List */}
      {avisCount > 0 ? (
        <>
          {sortedAvis.slice(0, showCount).map((a, idx) => (
            <Box
              key={`${a.nom}-${a.date}-${idx}`}
              sx={{
                mb: 2.5,
                p: 2,
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Avatar sx={{ width: 36, height: 36 }}>
                  {a.nom?.[0]?.toUpperCase() ?? "U"}
                </Avatar>
                <Stack spacing={0.3}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {a.nom}
                    </Typography>
                    <Chip size="small" icon={<CheckCircleOutline />} label="Achat vérifié" />
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Rating value={a.note} readOnly size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(a.date ?? "").toLocaleDateString("fr-FR")}
                    </Typography>
                  </Stack>
                </Stack>
                <Box sx={{ flex: 1 }} />
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" aria-label="utile"><ThumbUpOffAlt fontSize="small" /></IconButton>
                  <IconButton size="small" aria-label="signaler"><FlagOutlined fontSize="small" /></IconButton>
                </Stack>
              </Stack>

              <Typography variant="body2" color="text.primary">
                {a.commentaire}
              </Typography>
            </Box>
          ))}

          {/* Show more / less */}
          {avisCount > initialShow && (
            <Stack alignItems="center" sx={{ mt: 2 }}>
              {showCount < avisCount ? (
                <Button
                  variant="outlined"
                  onClick={() => setShowCount((c) => Math.min(c + initialShow, avisCount))}
                  sx={{ borderRadius: 2 }}
                >
                  Voir plus d’avis
                </Button>
              ) : (
                <Button
                  variant="text"
                  onClick={() => setShowCount(initialShow)}
                  sx={{ borderRadius: 2 }}
                >
                  Réduire
                </Button>
              )}
            </Stack>
          )}
        </>
      ) : (
        <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Aucun avis pour le moment.
          </Typography>
          <Button
            variant="contained"
            onClick={onWriteReview}
            sx={{
              borderRadius: 2,
              backgroundColor: "#649a8b",
              "&:hover": { backgroundColor: "#578a7c" }
            }}
          >
            Rédiger un avis
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default AvisClients;
