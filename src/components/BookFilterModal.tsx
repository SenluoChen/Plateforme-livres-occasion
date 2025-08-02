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
} from "@mui/material";

interface FilterOptions {
  categorie: string;
  minPrice: number | "";
  maxPrice: number | "";
  condition: string;
}

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
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Recherche avancée</h3>

        {/* Catégorie */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Catégorie</InputLabel>
          <Select
            value={filters.categorie}
            onChange={(e) => handleChange("categorie", e.target.value)}
          >
            <MenuItem value="">Toutes</MenuItem>
            <MenuItem value="Roman">Roman</MenuItem>
            <MenuItem value="Manga">Manga</MenuItem>
            <MenuItem value="Guide">Guide</MenuItem>
          </Select>
        </FormControl>

        {/* Intervalle de prix */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="Prix minimum (€)"
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleChange("minPrice", Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Prix maximum (€)"
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleChange("maxPrice", Number(e.target.value))}
            fullWidth
          />
        </Box>

        {/* État */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>État</InputLabel>
          <Select
            value={filters.condition}
            onChange={(e) => handleChange("condition", e.target.value)}
          >
            <MenuItem value="">Indifférent</MenuItem>
            <MenuItem value="Neuf">Neuf</MenuItem>
            <MenuItem value="Occasion">Occasion</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="contained" onClick={handleApply}>
            Appliquer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookFilterModal;
