// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { ref, set, onValue } from 'firebase/database';
import { updateProfile } from 'firebase/auth'; 
import { motion } from 'framer-motion';
import Notification from '../components/Notification/Notification';
import { IoPerson, IoCall, IoLocation, IoMail, IoSave, IoCamera } from "react-icons/io5";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState({ isVisible: false, message: "" });
  
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    address: '',
    photoURL: '' 
  });

  useEffect(() => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}/profile`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setFormData({
            username: data.username || user.displayName || '',
            phone: data.phone || '',
            address: data.address || '',
            photoURL: data.photoURL || user.photoURL || ''
          });
        }
        setLoading(false);
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("圖片太大囉！請使用小於 2MB 的圖片。");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoURL: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const userRef = ref(db, `users/${user.uid}/profile`);
      await set(userRef, formData);

      await updateProfile(user, {
        displayName: formData.username,
        photoURL: formData.photoURL
      });
      
      setNotify({ isVisible: true, message: "個人資料更新成功！" });
      setTimeout(() => setNotify({ ...notify, isVisible: false }), 3000);
    } catch (error) {
      console.error("Save Error:", error);
      alert("儲存失敗，請稍後再試");
    }
  };

  if (!user) return <div className="text-center py-20 text-xl font-bold">請先登入</div>;

  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh] flex justify-center items-center">
      <Notification message={notify.message} isVisible={notify.isVisible} />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
        {/* Header with Image Upload */}
        <div className="bg-yellow-400 p-8 text-center relative">
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="relative w-32 h-32 mx-auto mb-4 group"
            >
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md bg-white flex items-center justify-center">
                    {formData.photoURL ? (
                        <img src={formData.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <IoPerson className="text-6xl text-yellow-500" />
                    )}
                </div>

                <motion.label 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-0 right-0 bg-dark text-white p-2 rounded-full cursor-pointer hover:bg-gray-800 transition shadow-lg"
                >
                    <IoCamera size={20} />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </motion.label>
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold font-league text-gray-900"
            >
                {formData.username || "User"}
            </motion.h1>
            <p className="text-yellow-900 opacity-80 font-poppins text-sm">{user.email}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-8 md:p-12 space-y-6">
            
            {/* Email (唯讀) */}
            <div className="group opacity-70">
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <IoMail className="text-yellow-500"/> Email Account
                </label>
                <input 
                    type="text" 
                    value={user.email} 
                    disabled 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                />
            </div>

            {/* Username */}
            <motion.div whileFocus={{ scale: 1.01 }}>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <IoPerson className="text-yellow-500"/> Display Name
                </label>
                <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    placeholder="Enter your name"
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition font-poppins"
                />
            </motion.div>

            {/* Phone */}
            <motion.div whileFocus={{ scale: 1.01 }}>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <IoCall className="text-yellow-500"/> Phone Number
                </label>
                <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="0912-345-678"
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition font-poppins"
                />
            </motion.div>

            {/* Address */}
            <motion.div whileFocus={{ scale: 1.01 }}>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <IoLocation className="text-yellow-500"/> Delivery Address
                </label>
                <textarea 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    placeholder="請輸入外送地址..."
                    rows="3"
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition font-poppins resize-none"
                />
            </motion.div>

            {/* Save Button */}
            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-dark text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black transition flex items-center justify-center gap-2 text-lg mt-4"
            >
                <IoSave className="text-xl"/> Save Changes
            </motion.button>

        </form>
      </motion.div>
    </div>
  );
};

export default Profile;