import React, { Suspense, lazy } from 'react' // ⭐ 1. 引入 lazy
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from 'react-router-dom'
import Footer from '../src/components/Footer/Footer'

// ⭐ 2. 改成動態引入 (這樣只有點到該頁面時才會下載程式碼)
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const About = lazy(() => import('./pages/About'));
const Delivery = lazy(() => import('./pages/Delivery'));
const ContactUs = lazy(() => import('./pages/Contact')); // 包含大地圖，一定要 lazy
const Login = lazy(() => import('./components/Auth/Login'));
const Signup = lazy(() => import('./components/Auth/Signup'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// ⭐ 3. 做一個簡單的 Loading 元件
const Loading = () => (
  <div className="h-screen flex items-center justify-center bg-[#fffaf6]">
    <div className="text-yellow-500 text-xl font-bold animate-pulse">Loading Foodies...</div>
  </div>
);

function App() {
  return (
    <div className='overflow-x-hidden bg-white2 text-dark font-poppins'>
      <div className='relative overflow-hidden'>
        <Navbar/>
        
        {/* ⭐ 4. 用 Suspense 包住 Routes */}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/menu' element={<Menu/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/delivery' element={<Delivery/>} />
            <Route path='/contact' element={<ContactUs/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/order/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Suspense>

        <Footer/>
      </div>
    </div>
  )
}

export default App