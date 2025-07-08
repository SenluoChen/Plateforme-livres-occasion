import { createBrowserRouter } from 'react-router-dom';
import Root from './Root'
import HomePage from '../pages/HomePage';
import PanierPage from '../pages/PanierPage'; // ✅ 購物車頁面

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'dashboard',
        element: <HomePage />,
      },
  
    ],
  },
  {
    path: '/panier',
    element: <PanierPage />,
  },
]);

// ✅ 解決 TS1208 isolatedModules 錯誤
export {};
