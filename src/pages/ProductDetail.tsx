// src/pages/ProductDetail.tsx
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const produits = [
  { id: 1, nom: "item", image: "", description: "這是商品1", price: 229 },
  { id: 2, nom: "Cloth", image: "", description: "這是商品2", price: 349 },
  { id: 3, nom: "Cloth", image: "", description: "這是商品3", price: 120 },
  { id: 4, nom: "Cloth", image: "", description: "這是商品4", price: 450 },
];

function ProductDetail() {
  const { id } = useParams();
  const produit = produits.find((p) => p.id === Number(id));

  if (!produit) {
    return <Box sx={{ padding: 4 }}>❌ 找不到商品</Box>;
  }

  return (
    <Box sx={{ display: 'flex', padding: 4, gap: 4, flexWrap: 'wrap' }}>
      {/* 左邊圖片 */}
      <Box sx={{ width: 300, height: 300, backgroundColor: '#f3f3f3', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {produit.image ? (
          <img src={produit.image} alt={produit.nom} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          <Typography variant="body1" color="text.secondary">沒有圖片</Typography>
        )}
      </Box>

      {/* 右邊內容 */}
      <Box sx={{ flex: 1, minWidth: 300 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>{produit.nom}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {produit.description}
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>價格：NT${produit.price}</Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary">加入購物車</Button>
          <Button variant="outlined">放入收藏</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetail;
