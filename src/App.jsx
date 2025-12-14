import React from 'react'
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Delivery from './pages/Delivery';
import ContactUs from './pages/Contact';
import Footer from '../src/components/Footer/Footer'
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <div className='overflow-x-hidden bg-white2 text-dark'>
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
        </Routes>
        <Footer/>
      </div>
    </div>
  )
}

export default App