// src/components/Navbar/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCarOutline, IoPersonCircleOutline, IoGlobeOutline } from "react-icons/io5"; // ⭐ 加入 Globe icon
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext"; 
import { useCart } from "../../contexts/CartContext"; 
import Logo from "../../assets/food/logo.png"; 

// ⭐ 引入翻譯 Hook
import { useTranslation } from 'react-i18next';

const SlideDown = (delay) => ({
  initial: { y: "-100%", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.8, delay } },
});

// 語言列表
const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '繁體中文', flag: '🇹🇼' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false); // ⭐ 控制語言選單開關
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  
  // ⭐ 使用翻譯功能
  const { t, i18n } = useTranslation();

  // ⭐ 切換語言函式
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  // 動態定義選單 (因為需要翻譯，所以放在 Component 裡面)
  const NavMenu = [
    { id: 1, title: t('nav.home'), path: "/" },
    { id: 2, title: t('nav.about'), path: "/about" },
    { id: 3, title: t('nav.menu'), path: "/menu" },
    { id: 4, title: t('nav.delivery'), path: "/delivery" },
    { id: 5, title: t('nav.contact'), path: "/contact" },
  ];

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
          {NavMenu.map((menu, index) => (
            <motion.li
              key={menu.id}
              variants={SlideDown(0.1 * (index + 1))}
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
        {/* ⭐ 語言切換器 (Dropdown) */}
        <div className="relative">
            <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="h-[45px] w-[45px] grid place-items-center rounded-full bg-gray-100 text-dark hover:bg-yellow-400 transition-all"
            >
                <IoGlobeOutline className="text-2xl"/>
            </button>

            <AnimatePresence>
                {isLangOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-14 w-40 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden py-2"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`w-full text-left px-4 py-2 text-sm font-poppins hover:bg-gray-50 flex items-center gap-2 ${i18n.language === lang.code ? 'text-yellow-600 font-bold' : 'text-gray-600'}`}
                            >
                                <span>{lang.flag}</span> {lang.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* 購物車按鈕 */}
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
            <button 
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-full transition group"
            >
               {user.photoURL ? (
                 <img 
                   src={user.photoURL} 
                   alt="User" 
                   className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-yellow-400 transition"
                 />
               ) : (
                 <IoPersonCircleOutline size={32} className="text-gray-600 group-hover:text-yellow-500 transition"/>
               )}
               <span className="text-lg text-gray-700 font-medium max-w-[100px] truncate hidden lg:block">
                 {user.displayName || "User"}
               </span>
            </button>
            
            {/* Admin Button check */}
            {user.email === "chengyouli37@gmail.com" && (
                <button 
                    onClick={() => navigate('/admin')}
                    className="px-3 py-1 bg-black text-white text-sm rounded-lg font-bold hover:bg-gray-800 font-poppins"
                >
                    {t('nav.admin')}
                </button>
            )}
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-50 text-red-500 font-bold hover:bg-red-100 transition text-sm font-poppins"
            >
              {t('nav.logout')}
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="px-5 py-2 rounded-full border border-dark text-dark font-medium hover:bg-dark hover:text-white transition text-lg">
              {t('nav.login')}
            </Link>
            <Link to="/signup" className="px-5 py-2 rounded-full bg-dark text-white font-medium hover:bg-black transition shadow-lg text-lg">
              {t('nav.signup')}
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
             
             {/* 手機版的語言切換區 */}
             <div className="py-2 grid grid-cols-4 gap-2 border-b border-gray-50">
                {languages.map((lang) => (
                    <button 
                        key={lang.code}
                        onClick={() => { changeLanguage(lang.code); setIsMenuOpen(false); }}
                        className={`text-2xl p-2 rounded-lg text-center ${i18n.language === lang.code ? 'bg-yellow-100' : 'bg-gray-50'}`}
                    >
                        {lang.flag}
                    </button>
                ))}
             </div>

             <div className="py-6 flex flex-col gap-3">
               {!user ? (
                 <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-center py-3 rounded-lg border border-gray-300 font-bold">{t('nav.login')}</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-center py-3 rounded-lg bg-black text-white font-bold">{t('nav.signup')}</Link>
                 </>
               ) : (
                 <>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        {user.photoURL ? (
                            <img src={user.photoURL} alt="User" className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                            <IoPersonCircleOutline size={40} className="text-gray-600"/>
                        )}
                        <span className="font-bold text-lg">{user.displayName || "User"}</span>
                    </div>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-center py-3 rounded-lg bg-gray-100 font-bold text-gray-700">{t('nav.profile')}</Link>
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-center py-3 rounded-lg bg-red-50 text-red-500 font-bold">{t('nav.logout')}</button>
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