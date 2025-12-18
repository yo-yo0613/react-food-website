// src/components/Navbar/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCarOutline, IoPersonCircleOutline } from "react-icons/io5"; 
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
  animate: { y: 0, opacity: 1, transition: { duration: 0.8, delay } },
});

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
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
    <div className="container flex justify-between items-center font-league relative z-50 py-4 text-2xl">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        src={Logo}
        alt="Logo"
        className="w-32 md:w-36 cursor-pointer"
        onClick={() => navigate('/')}
      />

      {/* Desktop Menu */}
      <div className="hidden md:block">
        <ul className="flex gap-6">
          {NavMenu.map((menu) => (
            <motion.li
              key={menu.id}
              variants={SlideDown(menu.delay)}
              initial="initial"
              animate="animate"
            >
              <Link to={menu.path} className="inline-block px-2 py-2 text-xl font-medium hover:text-yellow-500 transition-colors">
                {menu.title}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <motion.div
        variants={SlideDown(1)}
        initial="initial"
        animate="animate"
        className="hidden md:flex items-center gap-4"
      >
        <button
          onClick={() => navigate('/cart')}
          className="h-[45px] w-[45px] grid place-items-center rounded-full bg-dark text-white hover:bg-yellow-500 transition-all relative shadow-md"
        >
          <IoCarOutline className="text-xl"/>
          {cartCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
              {cartCount}
            </div>
          )}
        </button>

        {/* Auth Section */}
        {user ? (
          <div className="flex items-center gap-3">
            {/* ⭐ 使用者按鈕：顯示圖片 或 名字 */}
            <button 
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-full transition group"
            >
               {/* 判斷：有照片就顯示照片，沒照片顯示 Icon */}
               {user.photoURL ? (
                 <img 
                   src={user.photoURL} 
                   alt="User" 
                   className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-yellow-400 transition"
                 />
               ) : (
                 <IoPersonCircleOutline size={32} className="text-gray-600 group-hover:text-yellow-500 transition"/>
               )}

               {/* 判斷：顯示 Display Name，如果沒有就顯示 'User'，不再顯示 Email */}
               <span className="text-lg text-gray-700 font-medium max-w-[100px] truncate hidden lg:block">
                 {user.displayName || "User"}
               </span>
            </button>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-50 text-red-500 font-bold hover:bg-red-100 transition text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="px-5 py-2 rounded-full border border-dark text-dark font-medium hover:bg-dark hover:text-white transition">
              Login
            </Link>
            <Link to="/signup" className="px-5 py-2 rounded-full bg-dark text-white font-medium hover:bg-black transition shadow-lg">
              Sign up
            </Link>
          </div>
        )}
      </motion.div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center gap-4">
         <button onClick={() => navigate('/cart')} className="relative text-dark">
            <IoCarOutline className="text-3xl"/>
            {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
                </div>
            )}
         </button>
        <button onClick={toggleMenu} className="text-3xl text-dark">
          {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </div>
      
      {/* Mobile Menu Content */}
       <AnimatePresence>
        {isMenuOpen && (
           <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: "auto" }}
             exit={{ opacity: 0, height: 0 }}
             className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 flex flex-col w-full px-6 md:hidden z-40 overflow-hidden pb-4"
           >
             {NavMenu.map((menu) => (
                <Link key={menu.id} to={menu.path} onClick={() => setIsMenuOpen(false)} className="py-4 text-gray-700 font-medium border-b border-gray-50 text-lg block">
                   {menu.title}
                </Link>
             ))}
             <div className="py-6 flex flex-col gap-3">
               {!user ? (
                 <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-center py-3 rounded-lg border border-gray-300 font-bold">Login</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-center py-3 rounded-lg bg-black text-white font-bold">Sign up</Link>
                 </>
               ) : (
                 <>
                    {/* 手機版選單也加上頭像顯示 */}
                    <div className="flex items-center justify-center gap-2 mb-2">
                        {user.photoURL ? (
                            <img src={user.photoURL} alt="User" className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                            <IoPersonCircleOutline size={40} className="text-gray-600"/>
                        )}
                        <span className="font-bold text-lg">{user.displayName || "User"}</span>
                    </div>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-center py-3 rounded-lg bg-gray-100 font-bold text-gray-700">My Profile</Link>
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-center py-3 rounded-lg bg-red-50 text-red-500 font-bold">Logout</button>
                 </>
               )}
             </div>
           </motion.div>
        )}
       </AnimatePresence>
    </div>
  );
}

export default Navbar;