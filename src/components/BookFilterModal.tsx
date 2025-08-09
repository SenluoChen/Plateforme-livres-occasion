import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Divider,
  Fade,
  Backdrop,
} from "@mui/material";

interface FilterOptions {
  categorie: string;
  minPrice: number | "";
  maxPrice: number | "";
  condition: string;
}

const mainColor = "#649a8b";

const BookFilterModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
}> = ({ open, onClose, onApply }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    categorie: "",
    minPrice: "",
    maxPrice: "",
    condition: "",
  });

  const handleChange = (field: keyof FilterOptions, value: string | number) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
          sx: {
            backdropFilter: "blur(6px)", // 背景模糊
            backgroundColor: "rgba(0,0,0,0.25)", // 半透明黑
          },
        },
      }}
    >
      <Fade in={open} timeout={300}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 420,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 3,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* 標題 */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: mainColor,
            }}
          >
            Recherche avancée
          </Typography>
          <Divider />

          {/* Catégorie */}
          <FormControl fullWidth>
            <InputLabel sx={{ color: mainColor }}>Catégorie</InputLabel>
            <Select
              value={filters.categorie}
              onChange={(e) => handleChange("categorie", e.target.value)}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: mainColor },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: mainColor },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: mainColor },
              }}
            >
              <MenuItem value="">Toutes</MenuItem>
              <MenuItem value="Roman">Roman</MenuItem>
              <MenuItem value="Manga">Manga</MenuItem>
              <MenuItem value="Guide">Guide</MenuItem>
            </Select>
          </FormControl>

          {/* Intervalle de prix */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Prix minimum (€)"
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleChange("minPrice", Number(e.target.value))}
              fullWidth
              sx={{
                "& label.Mui-focused": { color: mainColor },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: mainColor },
                  "&:hover fieldset": { borderColor: mainColor },
                  "&.Mui-focused fieldset": { borderColor: mainColor },
                },
              }}
            />
            <TextField
              label="Prix maximum (€)"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleChange("maxPrice", Number(e.target.value))}
              fullWidth
              sx={{
                "& label.Mui-focused": { color: mainColor },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: mainColor },
                  "&:hover fieldset": { borderColor: mainColor },
                  "&.Mui-focused fieldset": { borderColor: mainColor },
                },
              }}
            />
          </Box>

          {/* État */}
          <FormControl fullWidth>
            <InputLabel sx={{ color: mainColor }}>État</InputLabel>
            <Select
              value={filters.condition}
              onChange={(e) => handleChange("condition", e.target.value)}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: mainColor },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: mainColor },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: mainColor },
              }}
            >
              <MenuItem value="">Indifférent</MenuItem>
              <MenuItem value="Neuf">Neuf</MenuItem>
              <MenuItem value="Occasion">Occasion</MenuItem>
            </Select>
          </FormControl>

          {/* 按鈕區塊 */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                color: mainColor,
                borderColor: mainColor,
                "&:hover": {
                  borderColor: mainColor,
                  backgroundColor: "rgba(100,154,139,0.08)",
                },
              }}
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                px: 3,
                backgroundColor: mainColor,
                "&:hover": { backgroundColor: "#557e74" },
              }}
              onClick={handleApply}
            >
              Appliquer
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default BookFilterModal;