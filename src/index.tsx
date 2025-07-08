import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './root/router'; // ✅ 你的路由設定
import { CartProvider } from './contexts/CartContext'; // ✅ 購物車 Context

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <CartProvider> {/* ✅ 把整個 app 包住 */}
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();
