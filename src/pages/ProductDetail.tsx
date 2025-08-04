import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import Navbar from "../components/Navbar";
import { useCart } from '../contexts/CartContext'; // ✅ Contexte du panier
import { useNavigate } from 'react-router-dom';

export const produits = [
  {
    id: 1,
    nom: "Les Bases de la Physique Quantique: Un voyage fascinant pour dévoiler les mystères de l’Univers et comprendre les fondements de la physique moderne",
    images: ["/71RIGNIOssL._SL1500_.jpg", "/image.png"],
    description: `Comprendre la physique quantique n’a jamais été aussi simple !

Vous êtes fasciné par les mystères de l’univers mais vous ne savez pas par où commencer ?  
Vous souhaitez comprendre comment la physique quantique impacte votre vie quotidienne ?  
Vous rêvez d’explorer les mécanismes invisibles qui régissent notre réalité ?  

Alors, ce livre est fait pour vous !

Ce guide complet et accessible vous emmène dans un voyage fascinant à travers l’univers quantique, en rendant clairs des concepts qui semblaient hors de portée.  
Aucun doctorat nécessaire : ce livre simplifie les idées complexes tout en gardant la magie et l’émerveillement de l’infiniment petit.`,
    price: 12
  },
  {
    id: 2,
    nom: "Vêtement",
    images: ["/images/default.png"],
    description: "Ceci est le produit 2",
    price: 349
  },
  {
    id: 3,
    nom: "Vêtement",
    images: ["/images/default.png"],
    description: "Ceci est le produit 3",
    price: 120
  },
  {
    id: 4,
    nom: "Vêtement",
    images: ["/images/default.png"],
    description: "Ceci est le produit 4",
    price: 450
  }
];

// --- 假資料：推薦書籍 ---
const recommandations = [
  {
    id: 101,
    nom: "La Physique Quantique Simplifiée pour Débutants",
    image: "/books/quantique1.jpg",
    price: 15.98,
  },
  {
    id: 102,
    nom: "La Physique Quantique Sans Prise de Tête",
    image: "/books/quantique2.jpg",
    price: 19.3,
  },
  {
    id: 103,
    nom: "THÉORIE DE L'ÂME QUANTIQUE",
    image: "/books/quantique3.jpg",
    price: 19.5,
  },
  {
    id: 104,
    nom: "La Physique Quantique Simplifiée",
    image: "/books/quantique4.jpg",
    price: 12.99,
  },
  {
    id: 105,
    nom: "L’Univers: à la portée de tous",
    image: "/books/quantique5.jpg",
    price: 12.65,
  },
];

function ProductDetail() {
  const { id } = useParams();
  const produit = produits.find((p) => p.id === Number(id));
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string>(
    produit?.images?.[0] || ''
  );

  const { addToCart } = useCart(); // ✅ Méthode pour ajouter au panier

  if (!produit) {
    return (
      <>
        <Navbar />
        <Box sx={{ padding: 4 }}>❌ Produit introuvable</Box>
      </>
    );
  }



  
  return (
    <>
      <Navbar />

      <Box sx={{ display: 'flex', padding: 4, gap: 4, alignItems: 'flex-start' }}>
        
        {/* --- Colonne gauche : Images --- */}
        <Box>
          {/* Image principale (zoom au survol) */}
         <Box
  sx={{
    width: 320,
    height: 320,
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
        objectFit: 'contain',  // ✅ 顯示完整圖片
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    />
  ) : (
    <Typography variant="body1" color="text.secondary">Aucune image</Typography>
  )}
</Box>

          {/* Liste de miniatures */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {produit.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Miniature ${index}`}
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

        {/* --- Colonne centrale : Description --- */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>{produit.nom}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {produit.description}
          </Typography>
        </Box>

        {/* --- Colonne droite : Carte d'achat --- */}
        <Box
          sx={{
            position: 'sticky',
            top: 80,
            border: '1px solid #ddd',
            borderRadius: 2,
            p: 2,
            width: 260,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}
        >
          <Typography variant="h5" color="error">€{produit.price}</Typography>

          {/* Sélecteur de quantité */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1">Quantité :</Typography>
            <select
              style={{
                padding: '4px 8px',
                borderRadius: 4,
                border: '1px solid #ccc'
              }}
            >
              {[1,2,3,4,5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </Box>

          {/* Boutons d'action */}
          <Button 
            variant="contained" 
            color="warning"
            onClick={() => addToCart({
              id: produit.id,
              nom: produit.nom,
              prix: produit.price,
              image: produit.images[0],
              categorie: 'Autre'
            })}
          >
            Ajouter au panier
          </Button>

          <Button 
  variant="contained" 
  color="primary"
  onClick={() => navigate("/checkout")} // ✅ 導向到 CheckoutPage
>
  Acheter maintenant
</Button>

          {/* Info livraison */}
          <Typography variant="body2" color="text.secondary">
            En stock, expédition immédiate
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Livraison gratuite dès 35€
          </Typography>
        </Box>
      </Box>

      {/* --- Section Recommandations --- */}
      <Box sx={{ px: 4, pb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, mt: 6 }}>
          Produits liés à cet article
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 3,
          }}
        >
          {recommandations.map((item) => (
            <Box
              key={item.id}
              sx={{
                border: '1px solid #eee',
                borderRadius: 2,
                padding: 2,
                textAlign: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
                backgroundColor: '#fff',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                },
              }}
            >
              <img
                src={item.image}
                alt={item.nom}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: 8,
                  marginBottom: '8px',
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
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
      </Box>
    </>
  );
}

export default ProductDetail;
