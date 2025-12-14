// src/components/Navbar/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCarOutline, IoTrashOutline } from "react-icons/io5"; // 新增垃圾桶圖示
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext"; 
import { useCart } from "../../contexts/CartContext"; // ⭐ 1. 引入 useCart
import Logo from "../../assets/food/logo.png"; 

// ... (NavMenu 和 SlideDown 保持不變) ...
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
  const [isCartOpen, setIsCartOpen] = useState(false); // ⭐ 控制購物車清單顯示
  
  const { user, logout } = useAuth();
  const { cartItems, removeFromCart, cartTotal, cartCount, checkout } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  
  

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="container flex justify-between items-center font-league relative z-50">
      {/* ... Logo 和 NavMenu 保持不變 ... */}
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
        className="hidden md:flex items-center gap-4 relative" // relative 是為了購物車定位
      >
        {/* ⭐ 購物車按鈕與下拉選單區域 */}
        <div className="relative">
            <button
            onClick={() => setIsCartOpen(!isCartOpen)} // 切換開關
            className="h-[40px] w-[40px] grid place-items-center rounded-full text-white bg-dark relative"
            >
            <IoCarOutline />
            {/* 紅色數量小圓點 */}
            {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
                </div>
            )}
            </button>

            {/* ⭐ 購物車下拉選單 (Dropdown) */}
            <AnimatePresence>
            {isCartOpen && (
                <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-12 w-80 bg-white shadow-2xl rounded-lg p-4 border border-gray-100 z-50"
                >
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

                {/* 購物車下拉選單內部的結帳區塊 */}
                {cartItems.length > 0 && (
                    <div className="border-t mt-3 pt-3">
                    <div className="flex justify-between font-bold mb-3">
                        <span>Total:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    {/* 修改這裡：加入 onClick 事件 */}
                    <button 
                        onClick={() => {
                            if(window.confirm(`確定要結帳嗎？總金額 $${cartTotal.toFixed(2)}`)) {
                                checkout();
                                setIsCartOpen(false); // 關閉購物車視窗
                            }
                        }}
                        className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 font-semibold"
                    >
                        Checkout
                    </button>
                    </div>
                )}
                </motion.div>
            )}
            </AnimatePresence>
        </div>

        {/* 登入顯示部分 (保持原本邏輯) */}
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

      {/* ... 手機版 Menu 按鈕與選單 (保持不變) ... */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="h-[40px] w-[40px] grid place-items-center rounded-full text-dark text-2xl">
          {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </div>
      
       {/* 手機版 Menu 內容 (這段太長，保持你原本的代碼即可) */}
       <motion.div
         // ... (保持你原本的設定)
         className={`${isMenuOpen ? "flex" : "hidden"} absolute top-full left-0 right-0 bg-white shadow-lg flex-col w-full mt-2 py-4 rounded-lg md:hidden z-50`}
       >
          {/* 你可以在這裡也加上一個 "My Cart (數量)" 的連結供手機版使用 */}
          {/* ... */}
       </motion.div>
    </div>
  );
}

export default Navbar;