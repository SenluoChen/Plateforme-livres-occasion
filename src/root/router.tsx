// src/routes/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import HomePage from '../pages/HomePage';
import PanierPage from '../pages/PanierPage';
import ProductDetail from '../pages/ProductDetail';
import CheckoutPage from '../pages/CheckoutPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // 主 Layout
    children: [
      {
        index: true, // 預設首頁
        element: <HomePage />,
      },
      {
        path: "dashboard", // 另一個首頁入口
        element: <HomePage />,
      },
      {
        path: "produit/:id", // ✅ 商品詳情頁
        element: <ProductDetail />,
      },
    ],
  },
  // 下列頁面不使用 Root Layout
  {
    path: "/panier",
    element: <PanierPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/order-success",
    element: <OrderSuccessPage />,
  },
]);

export default router;