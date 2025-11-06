import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCarOutline } from "react-icons/io5";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";   // ⭐ 重點：拿登入狀態
import Logo from "../../assets/food/logo.png";               // ⚠ 確認檔案真的在 src/assets/logo.png

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
  const { user, logout } = useAuth();      // ⭐ 從 context 拿登入資訊 & 登出方法
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
    <div className="container flex justify-between items-center font-league relative">
      {/* logo section */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        src={Logo}
        alt="Food website logo"
        className="w-36"
      />

      {/* desktop menu section */}
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
              <Link
                to={menu.path}
                className="inline-block px-2 py-2 text-2xl"
              >
                {menu.title}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* desktop 右邊：車子圖示 + 登入系統 */}
      <motion.div
        variants={SlideDown(1)}
        initial="initial"
        animate="animate"
        className="hidden md:flex items-center gap-4"
      >
        {/* 原本的車子按鈕 */}
        <button
          className="h-[40px] w-[40px] grid place-items-center rounded-full text-white bg-dark"
        >
          <IoCarOutline />
        </button>

        {/* ⭐ 登入系統 */}
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
            <Link
              to="/login"
              className="px-4 py-2 rounded-full border border-dark text-dark text-2xl hover:bg-dark hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-full bg-dark text-white text-2xl hover:bg-black transition"
            >
              Sign up
            </Link>
          </>
        )}
      </motion.div>

      {/* mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="h-[40px] w-[40px] grid place-items-center rounded-full text-dark text-2xl"
        >
          {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </div>

      {/* mobile menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          y: isMenuOpen ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } absolute top-full left-0 right-0 bg-white shadow-lg flex-col w-full mt-2 py-4 rounded-lg md:hidden z-50`}
      >
        {NavMenu.map((menu) => (
          <Link
            key={menu.id}
            to={menu.path}
            onClick={toggleMenu}
            className="px-6 py-2 text-xl hover:bg-gray-100"
          >
            {menu.title}
          </Link>
        ))}

        {/* ⭐ 手機版登入/登出 */}
        <div className="mt-2 border-t pt-2 px-6 flex flex-col gap-2">
          {user ? (
            <>
              <span className="text-sm text-gray-700">
                {user.email}
              </span>
              <button
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
                className="w-full px-4 py-2 rounded-full bg-red-500 text-white text-sm text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="w-full px-4 py-2 rounded-full border border-dark text-dark text-sm text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={toggleMenu}
                className="w-full px-4 py-2 rounded-full bg-dark text-white text-sm text-center"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Navbar;
