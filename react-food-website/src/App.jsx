// src/App.jsx
import React from 'react'
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Delivery from './pages/Delivery';
import ContactUs from './pages/Contact';
import Footer from '../src/components/Footer/Footer' // 注意路徑
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';       // ⭐ 新增
import Profile from './pages/Profile'; // ⭐ 新增
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className='overflow-x-hidden bg-white2 text-dark font-poppins'>
      <div className='relative overflow-hidden'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/menu' element={<Menu/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/delivery' element={<Delivery/>} />
          <Route path='/contact' element={<ContactUs/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/order/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />       {/* ⭐ 新增路由 */}
          <Route path="/profile" element={<Profile />} /> {/* ⭐ 新增路由 */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer/>
      </div>
    </div>
  )
}

export default App