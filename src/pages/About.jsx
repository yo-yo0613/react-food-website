import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SlideUp } from '../components/Hero/Hero' // 請確認這個路徑是否正確，依據你的檔案結構
import { IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5'

// ⭐ 新增引入 Firebase 與 Auth 相關
import { db } from '../../firebase/config'; 
import { ref, push } from "firebase/database";
import { useAuth } from '../../contexts/AuthContext';

const contactCards = [
  {
    id: 1,
    icon: <IoLocationOutline className="text-4xl" />,
    title: "Location",
    details: [
      "123 Foodie Street",
      "Taipei City, Taiwan"
    ],
    delay: 0.2
  },
  {
    id: 2,
    icon: <IoCallOutline className="text-4xl" />,
    title: "Contact",
    details: [
      "+886 123 456 789",
      "+886 987 654 321"
    ],
    delay: 0.4
  },
  {
    id: 3,
    icon: <IoMailOutline className="text-4xl" />,
    title: "Email",
    details: [
      "info@foodies.com",
      "support@foodies.com"
    ],
    delay: 0.6
  }
]

const teamMembers = [
  {
    id: 1,
    name: "陳小明",
    role: "Head Chef",
    delay: 0.3
  },
  {
    id: 2,
    name: "王美麗",
    role: "Pastry Chef",
    delay: 0.4
  },
  {
    id: 3,
    name: "林大文",
    role: "Kitchen Manager",
    delay: 0.5
  },
  {
    id: 4,
    name: "張小華",
    role: "Service Manager",
    delay: 0.6
  }
]

function About() {
  const { user } = useAuth(); // 取得登入資訊
  
  // ⭐ 表單狀態管理
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ⭐ 當使用者登入時，自動帶入 Email
  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  // ⭐ 處理輸入框變化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ⭐ 處理表單送出 (寫入 Firebase)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 定義要寫入的資料
      const messageData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        userId: user ? user.uid : 'guest', // 如果沒登入就標記為 guest
        createdAt: new Date().toISOString() // 加入時間戳記
      };

      // 寫入到 Firebase 的 'messages' 資料夾 (與 users 和 carts 分開)
      const messagesRef = ref(db, 'messages');
      await push(messagesRef, messageData);

      alert("訊息已發送成功！我們會盡快回覆您。");
      
      // 清空表單 (如果使用者已登入，保留 Email 方便下次輸入)
      setFormData({
        name: '',
        email: user ? user.email : '',
        message: ''
      });

    } catch (error) {
      console.error("Error sending message:", error);
      alert("發送失敗，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <motion.div 
        variants={SlideUp(0.1)}
        initial="hidden"
        whileInView="show"
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Have questions about our menu, services, or want to join our team? 
          We're here to help!
        </p>
      </motion.div>

      {/* Contact Cards - Yellow Circle Background */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {contactCards.map(card => (
          <motion.div
            key={card.id}
            variants={SlideUp(card.delay)}
            initial="hidden"
            whileInView="show"
            className="bg-lightYellow rounded-2xl p-8 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full 
            flex items-center justify-center shadow-md">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{card.title}</h3>
            {card.details.map((detail, index) => (
              <p key={index} className="text-gray-700 mb-2">{detail}</p>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Team Section */}
      <motion.h2 
        variants={SlideUp(0.2)}
        initial="hidden"
        whileInView="show"
        className="text-3xl font-bold text-center mb-12"
      >
        Meet Our Team
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {teamMembers.map(member => (
          <motion.div
            key={member.id}
            variants={SlideUp(member.delay)}
            initial="hidden"
            whileInView="show"
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-4 
            flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
            <h4 className="font-bold text-lg mb-1">{member.name}</h4>
            <p className="text-gray-600">{member.role}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div
        variants={SlideUp(0.3)}
        initial="hidden"
        whileInView="show"
        className="mt-20 max-w-xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-center mb-8">Send Us a Message</h3>
        
        {/* ⭐ 綁定 onSubmit */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name" // ⭐ 加入 name
              value={formData.name} // ⭐ 綁定 value
              onChange={handleInputChange} // ⭐ 綁定 onChange
              placeholder="Your Name"
              required // ⭐ 必填
              className="w-full px-4 py-3 rounded-lg border focus:outline-none 
              focus:ring-2 focus:ring-darkGreen"
            />
            <input
              type="email"
              name="email" // ⭐ 加入 name
              value={formData.email} // ⭐ 綁定 value
              onChange={handleInputChange} // ⭐ 綁定 onChange
              placeholder="Your Email"
              required // ⭐ 必填
              className="w-full px-4 py-3 rounded-lg border focus:outline-none 
              focus:ring-2 focus:ring-darkGreen"
            />
          </div>
          <textarea
            name="message" // ⭐ 加入 name
            value={formData.message} // ⭐ 綁定 value
            onChange={handleInputChange} // ⭐ 綁定 onChange
            rows="5"
            placeholder="Your Message"
            required // ⭐ 必填
            className="w-full px-4 py-3 rounded-lg border focus:outline-none 
            focus:ring-2 focus:ring-darkGreen"
          ></textarea>
          
          <button 
            type="submit"
            disabled={isSubmitting} // ⭐ 防止重複提交
            className={`w-full bg-darkGreen text-white py-4 rounded-lg 
            hover:bg-opacity-90 transition-colors font-semibold text-lg 
            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default About