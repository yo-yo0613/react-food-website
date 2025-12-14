// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // 引入 Auth 來取得 user.uid
import { db } from "../firebase/config"; // 引入資料庫
import { ref, set, onValue, remove, push } from "firebase/database";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth(); // 取得目前登入的使用者

  // 1. 當使用者登入狀態改變時，監聽該使用者的購物車資料
  useEffect(() => {
    if (user) {
      // 路徑：carts/使用者ID
      const cartRef = ref(db, `carts/${user.uid}`);
      
      // onValue 會即時監聽資料庫變化
      const unsubscribe = onValue(cartRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Firebase 回傳的是物件 { key1: item1, key2: item2 }
          // 我們要轉成陣列 [{...item1}, {...item2}]
          const itemsArray = Object.values(data);
          setCartItems(itemsArray);
        } else {
          setCartItems([]);
        }
      });

      return () => unsubscribe();
    } else {
      // 沒登入時，清空購物車 (或你可以選擇存在 localStorage)
      setCartItems([]);
    }
  }, [user]);

  // 2. 加入購物車 (直接寫入 Firebase)
  const addToCart = async (product) => {
    if (!user) {
      alert("請先登入才能加入購物車！");
      return;
    }

    // 檢查目前購物車有沒有這項商品
    const existingItem = cartItems.find((item) => item.id === product.id);
    const cartRef = ref(db, `carts/${user.uid}/${product.id}`);

    if (existingItem) {
      // 如果有，更新數量
      await set(cartRef, {
        ...existingItem,
        quantity: existingItem.quantity + 1
      });
    } else {
      // 如果沒有，新增一筆 (key 用 product.id 方便查找)
      await set(cartRef, {
        ...product,
        quantity: 1
      });
    }
    // alert(`${product.name} 已加入購物車！`); // 可選，看你想不想每次都跳窗
  };

  // 3. 移除商品
  const removeFromCart = async (productId) => {
    if (!user) return;
    const itemRef = ref(db, `carts/${user.uid}/${productId}`);
    await remove(itemRef);
  };

  // 4. 清空購物車 (結帳後用)
  const clearCart = async () => {
    if (!user) return;
    const cartRef = ref(db, `carts/${user.uid}`);
    await remove(cartRef);
  }

  // 5. 結帳功能 (寫入 orders 節點)
  const checkout = async () => {
    if (!user || cartItems.length === 0) return;

    const orderData = {
      userId: user.uid,
      userEmail: user.email,
      items: cartItems,
      totalAmount: cartTotal,
      status: "pending", // 訂單狀態
      createdAt: new Date().toISOString()
    };

    // 寫入到 orders/使用者ID/自動產生的ID
    // 或是 orders/自動產生的ID (看你想要怎麼管理，這裡示範所有訂單放一起)
    const ordersRef = ref(db, `orders`);
    await push(ordersRef, orderData);

    // 結帳完清空購物車
    await clearCart();
    alert("訂單已送出！我們會盡快為您準備餐點。");
  };

  // 計算總金額
  const cartTotal = cartItems.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  // 計算總數量
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    checkout, // 匯出 checkout 功能
    cartTotal,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}