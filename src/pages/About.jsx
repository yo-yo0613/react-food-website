// src/pages/About.jsx (或 components/About/About.jsx)
import React, { useState } from 'react' // 引入 useState
import { motion } from 'framer-motion'
import { SlideUp } from '../components/Hero/Hero'
import { IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5'
import { db } from '../../firebase/config'; // 引入 db
import { ref, push } from "firebase/database"; // 引入寫入功能
import { useAuth } from '../../contexts/AuthContext'; // 引入 Auth 拿使用者 Email (選填)

// ... (contactCards 和 teamMembers 陣列保持不變) ...

function About() {
  const { user } = useAuth();
  // 定義表單狀態
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '', // 如果已登入，自動帶入 email
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 處理輸入變更
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.type === 'textarea' ? 'message' : e.target.type]: e.target.value
    });
    // 修正：上面的寫法對於 textarea 有點問題，建議直接寫死或是用 name 屬性
  };
  
  // 改良版 handleChange (建議給 input 加上 name 屬性)
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  }

  // 處理表單送出
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        // 寫入 Firebase Realtime Database
        // 路徑：messages/自動ID
        const msgRef = ref(db, 'messages');
        await push(msgRef, {
            ...formData,
            userId: user?.uid || 'anonymous', // 紀錄是誰傳的，如果是訪客就寫 anonymous
            createdAt: new Date().toISOString()
        });

        alert("訊息已發送！我們會盡快聯絡您。");
        setFormData({ name: '', email: '', message: '' }); // 清空表單
    } catch (error) {
        console.error("Error sending message:", error);
        alert("發送失敗，請稍後再試。");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* ... (Header, Cards, Team Section 保持不變) ... */}

      {/* Contact Form */}
      <motion.div
        variants={SlideUp(0.3)}
        initial="hidden"
        whileInView="show"
        className="mt-20 max-w-xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-center mb-8">Send Us a Message</h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name" // 加入 name
              value={formData.name} // 綁定 value
              onChange={handleInputChange} // 綁定 onChange
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-darkGreen"
            />
            <input
              type="email"
              name="email" // 加入 name
              value={formData.email} // 綁定 value
              onChange={handleInputChange} // 綁定 onChange
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-darkGreen"
            />
          </div>
          <textarea
            rows="5"
            name="message" // 加入 name
            value={formData.message} // 綁定 value
            onChange={handleInputChange} // 綁定 onChange
            placeholder="Your Message"
            required
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-darkGreen"
          ></textarea>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-darkGreen text-white py-4 rounded-lg hover:bg-opacity-90 transition-colors font-semibold text-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default About