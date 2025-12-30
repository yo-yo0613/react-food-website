// src/pages/Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { IoTrashOutline, IoArrowBack, IoCardOutline, IoCashOutline, IoPhonePortraitOutline } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import Notification from '../components/Notification/Notification';
import { useTranslation } from 'react-i18next'; // ⭐

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const Cart = () => {
  const { cartItems, removeFromCart, cartTotal, checkout } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation(); // ⭐

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [cardInfo, setCardInfo] = useState({ number: "", expiry: "", cvc: "" });
  const [notify, setNotify] = useState({ isVisible: false, message: "" });

  const showNotification = (message) => {
    setNotify({ isVisible: true, message });
    setTimeout(() => setNotify({ ...notify, isVisible: false }), 3000);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (!user) {
        showNotification(t('cart.login_alert')); // ⭐ 翻譯
        setTimeout(() => navigate('/login'), 1500);
        return;
    }

    let detailsToSend = {};
    if (paymentMethod === 'Credit Card') {
        if (cardInfo.number.length < 16 || !cardInfo.expiry.includes('/') || !cardInfo.cvc) {
            showNotification("Credit Card Error");
            return;
        }
        detailsToSend = { ...cardInfo };
    }

    try {
        // 呼叫 Context 的 checkout
        await checkout(paymentMethod, detailsToSend);
        
        showNotification(`${t('cart.sent')} (${paymentMethod})`);
        setTimeout(() => navigate('/'), 2000);
    } catch (error) {
        // 如果 Context 拋出錯誤 (例如後端沒開)，這裡會接住
        console.error("結帳流程中斷");
    }
  };

  if (cartItems.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold font-league mb-4 text-gray-800">{t('cart.empty')}</h2>
        <Link to="/menu" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1">
          {t('cart.browse')}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="container mx-auto px-4 py-10 min-h-screen">
      <Notification message={notify.message} isVisible={notify.isVisible} />
      
      <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition"><IoArrowBack size={24}/></button>
        <h1 className="text-4xl md:text-5xl font-bold font-league">{t('cart.title')}</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode='popLayout'>
            {cartItems.map((item) => (
              <motion.div layout key={item.id} variants={itemVariants} initial="hidden" animate="visible" exit={{ opacity: 0, x: -100 }} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <img src={item.image || item.img} alt={item.name} className="w-24 h-24 rounded-xl object-cover bg-gray-50 flex-shrink-0"/>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-800 truncate">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-yellow-500 text-lg">${item.price}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm text-gray-600 font-bold">Qty: {item.quantity}</span>
                  </div>
                </div>
                <motion.button onClick={() => removeFromCart(item.id)} className="p-3 text-gray-400 rounded-full transition-all"><IoTrashOutline size={24} /></motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
            <h2 className="text-2xl font-bold font-league mb-6 border-b pb-4">{t('cart.summary')}</h2>
            
            <div className="flex justify-between mb-2 text-gray-600">
              <span>{t('cart.subtotal')}</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6 text-gray-600">
              <span>{t('cart.fee')}</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between mb-8 text-2xl font-bold text-gray-800">
              <span>{t('cart.total')}</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <h3 className="font-bold mb-4 text-gray-700">{t('cart.method')}</h3>
            <div className="space-y-3 mb-6">
                {[
                    { id: 'Cash', icon: IoCashOutline, label: 'Cash' },
                    { id: 'Line Pay', icon: IoPhonePortraitOutline, label: 'Line Pay' },
                    { id: 'Credit Card', icon: IoCardOutline, label: 'Credit Card' }
                ].map(opt => (
                    <label key={opt.id} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all duration-300 ${paymentMethod === opt.id ? 'border-yellow-500 bg-yellow-50 ring-1 ring-yellow-500' : 'hover:bg-gray-50'}`}>
                        <input type="radio" name="payment" value={opt.id} checked={paymentMethod === opt.id} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-3 accent-yellow-500"/>
                        <opt.icon className="text-xl mr-2 text-gray-600"/>
                        <span className="font-medium">{opt.label}</span>
                    </label>
                ))}
            </div>

            <AnimatePresence>
                {paymentMethod === 'Credit Card' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 space-y-3 overflow-hidden">
                        <input type="text" name="number" value={cardInfo.number} onChange={handleCardChange} placeholder="Card Number" maxLength="19" className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 font-poppins text-sm focus:outline-none focus:border-black transition" />
                        <div className="flex gap-3">
                            <input type="text" name="expiry" value={cardInfo.expiry} onChange={handleCardChange} placeholder="MM/YY" maxLength="5" className="w-1/2 p-3 border border-gray-200 rounded-xl bg-gray-50 font-poppins text-sm focus:outline-none focus:border-black transition" />
                            <input type="text" name="cvc" value={cardInfo.cvc} onChange={handleCardChange} placeholder="CVC" maxLength="3" className="w-1/2 p-3 border border-gray-200 rounded-xl bg-gray-50 font-poppins text-sm focus:outline-none focus:border-black transition" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCheckout} className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg">
              {t('cart.checkout')}
            </motion.button>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Cart;