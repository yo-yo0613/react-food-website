// src/components/Navbar/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCarOutline, IoTrashOutline, IoArrowBack, IoCardOutline, IoCashOutline, IoPhonePortraitOutline } from "react-icons/io5"; // ⭐ 增加一些 Icon
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext"; 
import { useCart } from "../../contexts/CartContext"; 
import Logo from "../../assets/food/logo.png"; 

const NavMenu = [
  { id: 1, title: "Home", path: "/",        delay: 0.1 },
  { id: 2, title: "About", path: "/about",  delay: 0.2 },
  { id: 3, title: "Menu", path: "/menu",    delay: 0.3 },
  { id: 4, title: "Delivery", path: "/delivery", delay: 0.4 },
  { id: 5, title: "Contact Us", path: "/contact", delay: 0.5 },
];

const SlideDown = (delay) => ({
  initial: { y: "-100%", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay },
  },
});

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // 付款模式控制
  const [isPaymentMode, setIsPaymentMode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // ⭐ 新增：信用卡輸入狀態
  const [cardInfo, setCardInfo] = useState({
      number: "",
      expiry: "",
      cvc: ""
  });

  const { user, logout } = useAuth();
  const { cartItems, removeFromCart, cartTotal, cartCount, checkout } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsPaymentMode(false);
    // 重置信用卡輸入
    setCardInfo({ number: "", expiry: "", cvc: "" });
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // ⭐ 處理信用卡輸入變更
  const handleCardChange = (e) => {
      const { name, value } = e.target;
      setCardInfo(prev => ({ ...prev, [name]: value }));
  }

  // ⭐ 處理最終結帳 (邏輯增強)
  const handleConfirmPayment = () => {
      let detailsToSend = {};

      if (paymentMethod === 'Credit Card') {
          // 簡單驗證格式
          if (cardInfo.number.length < 16 || !cardInfo.expiry.includes('/') || !cardInfo.cvc) {
              alert("請輸入正確的信用卡資訊 (卡號16碼, 效期 MM/YY, CVC 3碼)");
              return;
          }
          // 傳送完整的卡號資訊給 Context 去做 Stripe 驗證
          // 注意：真實環境中，Context 驗證完後不會儲存這些資料到資料庫，只存 Token
          detailsToSend = {
              number: cardInfo.number.replace(/\s/g, ''), // 去除空白
              expiry: cardInfo.expiry,
              cvc: cardInfo.cvc
          };
      }

      // 呼叫 Context 結帳
      checkout(paymentMethod, detailsToSend);
      
      // 關閉視窗與重置
      setIsCartOpen(false);
      setIsPaymentMode(false);
      setCardInfo({ number: "", expiry: "", cvc: "" });
  };

  return (
    <div className="container flex justify-between items-center font-league relative z-50">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        src={Logo}
        alt="Food website logo"
        className="w-36"
      />

      <div className="hidden md:block">
        <ul className="flex gap-6">
          {NavMenu.map((menu) => (
            <motion.li
              key={menu.id}
              variants={SlideDown(menu.delay)}
              initial="initial"
              animate="animate"
              className="nav-menu"
              data-delay={menu.delay}
            >
              <Link to={menu.path} className="inline-block px-2 py-2 text-2xl">
                {menu.title}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* desktop 右邊區域 */}
      <motion.div
        variants={SlideDown(1)}
        initial="initial"
        animate="animate"
        className="hidden md:flex items-center gap-4 relative"
      >
        <div className="relative">
            <button
            onClick={toggleCart}
            className="h-[40px] w-[40px] grid place-items-center rounded-full text-white bg-dark relative"
            >
            <IoCarOutline />
            {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
                </div>
            )}
            </button>

            <AnimatePresence>
            {isCartOpen && (
                <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-12 w-96 bg-white shadow-2xl rounded-lg p-4 border border-gray-100 z-50" // ⭐ 加寬寬度 w-96 容納表單
                >
                
                {!isPaymentMode ? (
                    // === 模式 A: 顯示商品列表 ===
                    <>
                        <h3 className="font-bold text-lg border-b pb-2 mb-2">My Cart</h3>
                        {cartItems.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">Cart is empty</p>
                        ) : (
                            <div className="max-h-60 overflow-y-auto space-y-3">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                <img src={item.img} alt={item.name} className="w-12 h-12 rounded object-cover" />
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold truncate">{item.name}</h4>
                                    <p className="text-xs text-gray-500">
                                    ${item.price} x {item.quantity}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <IoTrashOutline />
                                </button>
                                </div>
                            ))}
                            </div>
                        )}

                        {cartItems.length > 0 && (
                            <div className="border-t mt-3 pt-3">
                            <div className="flex justify-between font-bold mb-3">
                                <span>Total:</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <button 
                                onClick={() => setIsPaymentMode(true)}
                                className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 font-semibold"
                            >
                                Checkout
                            </button>
                            </div>
                        )}
                    </>
                ) : (
                    // === 模式 B: 顯示付款方式選擇 ===
                    <>
                        <div className="flex items-center gap-2 border-b pb-2 mb-4">
                            <button onClick={() => setIsPaymentMode(false)} className="text-gray-500 hover:text-black">
                                <IoArrowBack size={20}/>
                            </button>
                            <h3 className="font-bold text-lg">Payment Method</h3>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                            {/* 現金選項 */}
                            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${paymentMethod === 'Cash' ? 'border-yellow-500 bg-yellow-50' : 'hover:bg-gray-50'}`}>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value="Cash" 
                                    checked={paymentMethod === 'Cash'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-3 accent-yellow-500"
                                />
                                <IoCashOutline className="mr-2 text-xl" />
                                <span className="font-medium">Cash On Delivery</span>
                            </label>

                            {/* Line Pay 選項 */}
                            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${paymentMethod === 'Line Pay' ? 'border-green-500 bg-green-50' : 'hover:bg-gray-50'}`}>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value="Line Pay" 
                                    checked={paymentMethod === 'Line Pay'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-3 accent-green-500"
                                />
                                <IoPhonePortraitOutline className="mr-2 text-xl text-green-600" />
                                <span className="font-medium text-green-700">Line Pay</span>
                            </label>

                            {/* 信用卡選項 */}
                            <label className={`flex flex-col p-3 border rounded-lg cursor-pointer transition ${paymentMethod === 'Credit Card' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
                                <div className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="Credit Card" 
                                        checked={paymentMethod === 'Credit Card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mr-3 accent-blue-500"
                                    />
                                    <IoCardOutline className="mr-2 text-xl text-blue-600" />
                                    <span className="font-medium text-blue-700">Credit Card</span>
                                </div>

                                {/* ⭐ 如果選擇信用卡，顯示輸入框 */}
                                {paymentMethod === 'Credit Card' && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-3 pl-6 space-y-2 w-full"
                                    >
                                        <input 
                                            type="text" 
                                            name="number"
                                            value={cardInfo.number}
                                            onChange={handleCardChange}
                                            placeholder="Card Number (0000 0000 0000 0000)" 
                                            maxLength="19"
                                            className="w-full p-2 border rounded bg-white text-sm"
                                        />
                                        <div className="flex gap-2">
                                            <input 
                                                type="text" 
                                                name="expiry"
                                                value={cardInfo.expiry}
                                                onChange={handleCardChange}
                                                placeholder="MM/YY" 
                                                maxLength="5"
                                                className="w-1/2 p-2 border rounded bg-white text-sm"
                                            />
                                            <input 
                                                type="text" 
                                                name="cvc"
                                                value={cardInfo.cvc}
                                                onChange={handleCardChange}
                                                placeholder="CVC" 
                                                maxLength="3"
                                                className="w-1/2 p-2 border rounded bg-white text-sm"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </label>
                        </div>

                        <div className="flex justify-between font-bold mb-3 text-sm text-gray-600">
                             <span>Total Amount:</span>
                             <span className="text-black text-lg">${cartTotal.toFixed(2)}</span>
                        </div>

                        <button 
                            onClick={handleConfirmPayment}
                            className="w-full bg-dark text-white py-2 rounded-lg hover:bg-black font-semibold"
                        >
                            {/* 根據付款方式改變按鈕文字 */}
                            {paymentMethod === 'Line Pay' ? 'Pay with Line Pay' : 'Confirm Payment'}
                        </button>
                    </>
                )}

                </motion.div>
            )}
            </AnimatePresence>
        </div>

        {/* 登入顯示部分 */}
        {user ? (
          <>
            <span className="text-2xl text-gray-700 max-w-[150px] truncate">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-500 text-white text-2xl hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 rounded-full border border-dark text-dark text-2xl hover:bg-dark hover:text-white transition">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 rounded-full bg-dark text-white text-2xl hover:bg-black transition">
              Sign up
            </Link>
          </>
        )}
      </motion.div>

      {/* 手機版 Menu */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="h-[40px] w-[40px] grid place-items-center rounded-full text-dark text-2xl">
          {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </div>
      
       <motion.div
         className={`${isMenuOpen ? "flex" : "hidden"} absolute top-full left-0 right-0 bg-white shadow-lg flex-col w-full mt-2 py-4 rounded-lg md:hidden z-50`}
       >
         {/* ...手機版選單內容... */}
       </motion.div>
    </div>
  );
}

export default Navbar;