import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import HomePage from '../pages/HomePage';
import PanierPage from '../pages/PanierPage';
import ProductDetail from '../pages/ProductDetail'; // 加入這行

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'dashboard',
        element: <HomePage />,
      },
      {
        path: 'produit/:id', // ✅ 加入這個路由
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: '/panier',
    element: <PanierPage />,
  },
]);

export {};
