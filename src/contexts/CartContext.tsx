// src/contexts/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

export type Product = {
  id: number;
  nom: string;
  categorie: string;
  image: string;
  prix?: number;
};

export type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;  // ✅ 接受 Product
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQty: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ➕ 加入購物車
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        // 如果已存在，數量 +1
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // 不存在，自動補 quantity: 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ❌ 移除整個商品
  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // 🔄 更新數量
  const updateQuantity = (productId: number, newQty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, newQty) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider is missing");
  return context;
};
