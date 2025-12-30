import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; 
import { db } from "../firebase/config"; 
import { ref, set, onValue, remove, push, get } from "firebase/database";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  // 1. 監聽購物車 (保持不變)
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

  // 2. 加入購物車 (保持不變)
  const addToCart = async (product) => {
    if (!user) {
      alert("請先登入才能加入購物車！");
      return;
    }
    const quantityToAdd = product.quantity ? product.quantity : 1;
    const validImage = product.image || product.img || "";
    const cartRef = ref(db, `carts/${user.uid}/${product.id}`);
    const snapshot = await get(cartRef);
    const existingItem = snapshot.val();

    if (existingItem) {
      await set(cartRef, {
        ...existingItem,
        quantity: existingItem.quantity + quantityToAdd,
        image: validImage
      });
    } else {
      await set(cartRef, {
        id: product.id,
        name: product.name || product.title,
        price: product.price,
        image: validImage,
        quantity: quantityToAdd
      });
    }
  };

  // 3. 移除商品 (保持不變)
  const removeFromCart = async (productId) => {
    if (!user) return;
    const itemRef = ref(db, `carts/${user.uid}/${productId}`);
    await remove(itemRef);
  };

  // 4. 清空購物車 (保持不變)
  const clearCart = async () => {
    if (!user) return;
    const cartRef = ref(db, `carts/${user.uid}`);
    await remove(cartRef);
  }

  // 5. 計算總金額
  const cartTotal = cartItems.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // ⭐⭐⭐ 6. 結帳邏輯 (核心修改) ⭐⭐⭐
  const checkout = async (paymentMethod, paymentDetails = {}) => {
    if (!user || cartItems.length === 0) return;

    try {
        // --- 準備要傳給後端的資料 ---
        // 我們只傳必要的資訊，不傳敏感的信用卡號給 Spring Boot (模擬環境)
        // 在真實環境中，信用卡資訊會直接傳給 Stripe，然後只把 Token 傳給後端
        
        const orderPayload = {
            userId: user.uid,
            userEmail: user.email,
            totalAmount: cartTotal,
            paymentMethod: paymentMethod,
            items: cartItems.map(item => ({
                name: item.name,
                price: parseFloat(item.price),
                quantity: item.quantity
            }))
        };

        // --- A. 呼叫 Spring Boot 處理付款 ---
        console.log("正在呼叫 Spring Boot 結帳...", orderPayload);
        const response = await fetch('http://localhost:8080/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload)
        });

        if (!response.ok) {
            throw new Error("Spring Boot 結帳失敗");
        }

        const backendOrder = await response.json(); // 取得後端回應 (包含狀態 status)
        console.log("Spring Boot 回應:", backendOrder);

        // --- B. 寫入 Firebase (雙寫備份) ---
        // 我們把 Spring Boot 回傳的狀態 (PAID/PENDING) 也存進去
        const firebaseOrderData = {
            ...orderPayload,
            backendId: backendOrder.id, // 存下 Spring Boot 的 ID
            status: backendOrder.status, // 存下 Spring Boot 判斷後的狀態
            paymentDetails: { 
                last4: paymentDetails.number ? paymentDetails.number.slice(-4) : null,
                ...paymentDetails 
            },
            createdAt: new Date().toISOString()
        };

        const ordersRef = ref(db, `orders`);
        await push(ordersRef, firebaseOrderData);

        // --- C. 清空購物車 ---
        await clearCart();
        return true;

    } catch (error) {
        console.error("Checkout Error:", error);
        alert("結帳發生錯誤，請檢查後端是否開啟。");
        throw error; // 讓 UI 知道失敗了
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