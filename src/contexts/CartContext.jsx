// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; 
import { db } from "../firebase/config"; 
import { ref, set, onValue, remove, push, get } from "firebase/database";

// 引入 Stripe (保留你的 Publishable Key)
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51SeIyEPlWwyWz35kolNXt2Cyonymlx24PSzIIvu41SGPzLJHhq70EEriaz9oIBUyGmwDj88OVnogR5K8nBhDEIZt00XJHOLGRv");

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  // 1. 監聽購物車 (從 Firebase 同步)
  useEffect(() => {
    if (user) {
      const cartRef = ref(db, `carts/${user.uid}`);
      const unsubscribe = onValue(cartRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const itemsArray = Object.values(data);
          setCartItems(itemsArray);
        } else {
          setCartItems([]);
        }
      });
      return () => unsubscribe();
    } else {
      setCartItems([]);
    }
  }, [user]);

  // 2. 加入購物車 (⭐⭐⭐ 關鍵修正：處理數量與圖片)
  const addToCart = async (product) => {
    if (!user) {
      alert("請先登入才能加入購物車！");
      return;
    }

    // 取得要加入的數量 (如果沒傳，預設為 1)
    const quantityToAdd = product.quantity ? product.quantity : 1;
    
    // 統一圖片來源 (有些是 img, 有些是 image)
    const validImage = product.image || product.img || "";

    const cartRef = ref(db, `carts/${user.uid}/${product.id}`);
    
    // 先讀取舊資料，看是否已存在
    const snapshot = await get(cartRef);
    const existingItem = snapshot.val();

    if (existingItem) {
      // 如果已存在，將舊數量 + 新增數量
      await set(cartRef, {
        ...existingItem,
        quantity: existingItem.quantity + quantityToAdd,
        image: validImage // 確保圖片欄位更新
      });
    } else {
      // 如果是新商品
      await set(cartRef, {
        id: product.id,
        name: product.name || product.title, // 確保有名稱
        price: product.price,
        image: validImage, // 確保寫入 image 欄位
        quantity: quantityToAdd
      });
    }
  };

  // 3. 移除商品
  const removeFromCart = async (productId) => {
    if (!user) return;
    const itemRef = ref(db, `carts/${user.uid}/${productId}`);
    await remove(itemRef);
  };

  // 4. 清空購物車
  const clearCart = async () => {
    if (!user) return;
    const cartRef = ref(db, `carts/${user.uid}`);
    await remove(cartRef);
  }

  // 5. 計算總金額與數量
  const cartTotal = cartItems.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // 6. ⭐⭐⭐ 結帳邏輯 (含 Stripe 模擬) ⭐⭐⭐
  const checkout = async (paymentMethod, paymentDetails = {}) => {
    if (!user || cartItems.length === 0) return;

    try {
        let status = 'pending';
        let transactionInfo = {};

        // === A. 現金付款 ===
        if (paymentMethod === 'Cash') {
            status = 'pending_cash';
        }

        // === B. 信用卡付款 (Stripe) ===
        else if (paymentMethod === 'Credit Card') {
            // 注意：真實環境需要後端 API (Cloud Function)
            // 為了讓你的專案現在能動，我們這裡做「模擬成功」
            console.log("Processing Stripe Payment with:", paymentDetails);
            
            // 模擬 API 延遲
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            status = 'paid';
            transactionInfo = { 
                id: "stripe_mock_" + Date.now(), // 模擬交易 ID
                last4: paymentDetails.number.slice(-4) 
            };
            
            // 如果你有真的後端，請解開下面的註解並填入正確 URL
            /*
            const response = await fetch("YOUR_CLOUD_FUNCTION_URL", { ... });
            const { clientSecret } = await response.json();
            const stripe = await stripePromise;
            const result = await stripe.confirmCardPayment(...)
            if (result.error) throw new Error(result.error.message);
            */
        }

        // === C. Line Pay ===
        else if (paymentMethod === 'Line Pay') {
             status = 'paid';
             transactionInfo = { id: "LINE_" + Date.now() };
        }

        // === D. 寫入 Firebase 訂單 (Orders) ===
        const orderData = {
            userId: user.uid,
            userEmail: user.email,
            items: cartItems,
            totalAmount: cartTotal,
            paymentMethod: paymentMethod,
            paymentDetails: transactionInfo,
            status: status,
            createdAt: new Date().toISOString()
        };

        const ordersRef = ref(db, `orders`);
        await push(ordersRef, orderData);

        // === E. 結帳成功，清空購物車 ===
        await clearCart();

        console.log("Order created successfully!");

    } catch (error) {
        console.error("Checkout Error:", error);
        alert("結帳發生錯誤，請稍後再試。");
    }
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    checkout,
    cartTotal,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}