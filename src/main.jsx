import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from './contexts/CartContext';  

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
