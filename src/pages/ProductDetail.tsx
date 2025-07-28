// src/pages/ProductDetail.tsx
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';

export const produits = [
  {
  id: 1,
  nom: "Les Bases de la Physique Quantique: Un voyage fascinant pour dévoiler les mystères de l’Univers et comprendre les fondements de la physique moderne",
  images: ["/71RIGNIOssL._SL1500_.jpg", "/image.png"],
  description: `Comprendre la physique quantique n’a jamais été aussi facile !

Vous êtes fasciné par les mystères de l’univers, mais vous ne savez pas par où commencer ? Vous voulez comprendre comment la physique quantique affecte votre vie quotidienne ? Vous rêvez d'explorer les mécanismes invisibles qui régissent notre réalité ? Alors, ce livre est fait pour vous !

Les Bases de la Physique Quantique est un guide complet et accessible à tous qui vous emmène dans un voyage fascinant à travers l’univers quantique, vous aidant à comprendre des concepts qui, jusqu’à présent, semblaient hors de portée.

Ce livre est conçu pour les débutants et les curieux. Vous n’avez pas besoin d’un doctorat en physique pour comprendre les principes de la mécanique quantique. Ce livre simplifie des idées complexes tout en conservant la magie et l'émerveillement qui accompagnent la découverte de l'infiniment petit.`,
  price: 229
},

  {
    id: 2,
    nom: "Cloth",
    images: ["/images/default.png"],
    description: "這是商品2",
    price: 349
  },

  {
    id: 3,
    nom: "Cloth",
    images: ["/images/default.png"],
    description: "這是商品3",
    price: 120
  },
  {
    id: 4,
    nom: "Cloth",
    images: ["/images/default.png"],
    description: "這是商品4",
    price: 450
  }
];

function ProductDetail() {
  const { id } = useParams();
  const produit = produits.find((p) => p.id === Number(id));

  const [selectedImage, setSelectedImage] = useState<string>(
    produit?.images?.[0] || ''
  );

  if (!produit) {
    return <Box sx={{ padding: 4 }}>❌ 找不到商品</Box>;
  }

  return (
    <Box sx={{ display: 'flex', padding: 4, gap: 4, flexWrap: 'wrap' }}>
      
      {/* 左邊圖片區塊 */}
      <Box>
        {/* 主圖區（hover 放大） */}
        <Box
          sx={{
            width: 300,
            height: 300,
            backgroundColor: '#f3f3f3',
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={produit.nom}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          ) : (
            <Typography variant="body1" color="text.secondary">沒有圖片</Typography>
          )}
        </Box>

        {/* 縮圖列表 */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {produit.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`縮圖${index}`}
              onClick={() => setSelectedImage(img)}
              style={{
                width: 60,
                height: 60,
                objectFit: 'cover',
                cursor: 'pointer',
                border: selectedImage === img ? '2px solid orange' : '1px solid #ccc',
                borderRadius: 4
              }}
            />
          ))}
        </Box>
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
