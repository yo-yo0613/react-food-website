import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from './contexts/CartContext';  

import './i18n'; // 引入 i18n 配置

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>  
           <App />
        </CartProvider> 
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
