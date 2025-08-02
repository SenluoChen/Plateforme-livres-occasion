// router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import HomePage from '../pages/HomePage';
import PanierPage from '../pages/PanierPage';
import ProductDetail from '../pages/ProductDetail';
import CheckoutPage from '../pages/CheckoutPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, // Layout
    children: [
      {
        index: true, // ✅ 當路徑是 '/' 顯示 HomePage
        element: <HomePage />,
      },
      {
        path: 'dashboard', // ✅ 可選的 Dashboard 路徑
        element: <HomePage />,
      },
      {
        path: 'produit/:id',
        element: <ProductDetail />,
      },
    ],
  },
  // 這些頁面不使用 Root Layout
  {
    path: '/panier',
    element: <PanierPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/order-success',
    element: <OrderSuccessPage />,
  },
]);

export {};
