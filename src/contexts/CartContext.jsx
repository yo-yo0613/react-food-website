// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; 
import { db } from "../firebase/config"; 
import { ref, set, onValue, remove, push } from "firebase/database";

// ⭐ 引入 Stripe
import { loadStripe } from "@stripe/stripe-js";

// 請換成你的 Stripe "Publishable Key" (pk_test_...)
const stripePromise = loadStripe("pk_test_你的Stripe公開金鑰填在這裡");

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
    const existingItem = cartItems.find((item) => item.id === product.id);
    const cartRef = ref(db, `carts/${user.uid}/${product.id}`);

    if (existingItem) {
      await set(cartRef, {
        ...existingItem,
        quantity: existingItem.quantity + 1
      });
    } else {
      await set(cartRef, {
        ...product,
        quantity: 1
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


  // ⭐ 計算總金額 (移到上面，因為 checkout 要用)
  const cartTotal = cartItems.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // ⭐⭐⭐ 核心修改：真的有功能的 Checkout ⭐⭐⭐
  const checkout = async (paymentMethod, paymentDetails = {}) => {
    if (!user || cartItems.length === 0) return;

    try {
        let status = 'pending';
        let transactionInfo = {};

        // === 1. 現金付款 ===
        if (paymentMethod === 'Cash') {
            alert("訂單已建立！請準備現金付款。");
        }

        // === 2. 信用卡付款 (Stripe) ===
        else if (paymentMethod === 'Credit Card') {
            const stripe = await stripePromise;
            
            // A. 呼叫我們剛剛寫的 Firebase Function 後端
            // 請把網址換成你 deploy 後得到的網址
            const response = await fetch("https://us-central1-你的專案ID.cloudfunctions.net/createStripePaymentIntent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: cartTotal }),
            });
            
            const { clientSecret } = await response.json();

            // B. 在前端確認付款 (使用使用者輸入的卡號)
            // 注意：為了資安，通常建議用 <CardElement />，但為了配合你現有的 UI (一般 input)，我們先這樣寫
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: {
                        number: paymentDetails.number,
                        exp_month: parseInt(paymentDetails.expiry.split('/')[0]),
                        exp_year: parseInt('20' + paymentDetails.expiry.split('/')[1]),
                        cvc: paymentDetails.cvc,
                    },
                    billing_details: {
                        email: user.email,
                    },
                },
            });

            if (result.error) {
                alert("付款失敗：" + result.error.message);
                return; // 終止，不建立訂單
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    status = 'paid';
                    transactionInfo = { 
                        id: result.paymentIntent.id, 
                        last4: paymentDetails.number.slice(-4) 
                    };
                    alert("信用卡付款成功！");
                }
            }
        }

        // === 3. Line Pay (需要更多後端設定，這裡先模擬成功) ===
        else if (paymentMethod === 'Line Pay') {
             // 真實的 Line Pay 需要轉址 (Redirect) 到 Line 的頁面
             // 這裡先模擬
             status = 'paid';
             transactionInfo = { id: "LINE_" + Date.now() };
             alert("Line Pay 付款成功 (模擬)！");
        }

        // === 4. 寫入 Firebase 資料庫 ===
        const orderData = {
            userId: user.uid,
            userEmail: user.email,
            items: cartItems,
            totalAmount: cartTotal,
            paymentMethod: paymentMethod,
            paymentDetails: transactionInfo, // 存入交易序號
            status: status,
            createdAt: new Date().toISOString()
        };

        const ordersRef = ref(db, `orders`);
        await push(ordersRef, orderData);

        // 清空購物車
        // 注意：如果你有定義 clearCart 在外面，請確保這裡能呼叫得到，或是直接貼上 clearCart 的邏輯
        const cartRef = ref(db, `carts/${user.uid}`);
        await remove(cartRef);

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