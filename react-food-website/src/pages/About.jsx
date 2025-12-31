import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SlideUp } from '../components/Hero/Hero'
import { IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5'

// Firebase 與 Auth
import { db } from '../firebase/config'; 
import { ref, push } from "firebase/database";
import { useAuth } from '../contexts/AuthContext';

const contactCards = [
  {
    id: 1,
    icon: <IoLocationOutline className="text-4xl" />,
    title: "Location",
    details: ["123 Foodie Street", "Taipei City, Taiwan"],
    delay: 0.2
  },
  {
    id: 2,
    icon: <IoCallOutline className="text-4xl" />,
    title: "Contact",
    details: ["+886 123 456 789", "+886 987 654 321"],
    delay: 0.4
  },
  {
    id: 3,
    icon: <IoMailOutline className="text-4xl" />,
    title: "Email",
    details: ["info@foodies.com", "support@foodies.com"],
    delay: 0.6
  }
]

const teamMembers = [
  { id: 1, name: "陳小明", role: "Head Chef", delay: 0.3 },
  { id: 2, name: "王美麗", role: "Pastry Chef", delay: 0.4 },
  { id: 3, name: "林大文", role: "Kitchen Manager", delay: 0.5 },
  { id: 4, name: "張小華", role: "Service Manager", delay: 0.6 }
]

function About() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ⭐⭐⭐ 核心修改：同時發送給 Firebase 和 Spring Boot
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const messageData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      userId: user ? user.uid : 'guest'
    };

    try {
      // 1. 傳送給 Spring Boot (Render)
      // 請將網址換成你的 Render 網址
      const springResponse = await fetch('https://food-backend-ehke.onrender.com/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      });

      if (!springResponse.ok) {
         console.warn("Spring Boot 接收失敗 (可能是後端沒開)，但我們繼續嘗試 Firebase");
      }

      // 2. 寫入 Firebase (備份)
      const firebaseData = {
          ...messageData,
          createdAt: new Date().toISOString()
      };
      const messagesRef = ref(db, 'messages');
      await push(messagesRef, firebaseData);

      alert("訊息已發送成功！我們會盡快回覆您。");
      
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
      <motion.div variants={SlideUp(0.1)} initial="hidden" whileInView="show" className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-league">Get in Touch</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Have questions about our menu, services, or want to join our team? We're here to help!
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {contactCards.map(card => (
          <motion.div key={card.id} variants={SlideUp(card.delay)} initial="hidden" whileInView="show" className="bg-yellow-100/50 rounded-2xl p-8 text-center hover:shadow-lg transition">
            <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md text-yellow-500">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 font-league">{card.title}</h3>
            {card.details.map((detail, index) => (
              <p key={index} className="text-gray-700 mb-2">{detail}</p>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Team Section */}
      <motion.h2 variants={SlideUp(0.2)} initial="hidden" whileInView="show" className="text-3xl font-bold text-center mb-12 font-league">
        Meet Our Team
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
        {teamMembers.map(member => (
          <motion.div key={member.id} variants={SlideUp(member.delay)} initial="hidden" whileInView="show" className="text-center group">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-4 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-yellow-400 transition">
              <span className="text-3xl">👤</span>
            </div>
            <h4 className="font-bold text-lg mb-1">{member.name}</h4>
            <p className="text-gray-600 text-sm">{member.role}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div variants={SlideUp(0.3)} initial="hidden" whileInView="show" className="mt-10 max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h3 className="text-2xl font-bold text-center mb-8 font-league">Send Us a Message</h3>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition"
            />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" required 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition"
            />
          </div>
          <textarea name="message" value={formData.message} onChange={handleInputChange} rows="5" placeholder="Your Message" required 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition resize-none"
          ></textarea>
          
          <button type="submit" disabled={isSubmitting} 
            className={`w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition-all font-bold text-lg shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default About