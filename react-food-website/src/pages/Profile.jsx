import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { ref, update, onValue } from 'firebase/database'; 
import { updateProfile } from 'firebase/auth'; 
import { motion } from 'framer-motion';
import Notification from '../components/Notification/Notification';
import { IoPerson, IoCall, IoLocation, IoMail, IoSave, IoCamera, IoShieldCheckmark } from "react-icons/io5"; 
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState({ isVisible: false, message: "" });
  
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    address: '',
    photoURL: '',
    roleRequest: '' 
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
            photoURL: data.photoURL || user.photoURL || '',
            roleRequest: data.roleRequest || '' 
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

  // ⭐ 新增：圖片壓縮函式 (解決圖片太大無法上傳的問題)
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          // 設定最大寬度為 300px (大頭貼不需要太大)
          const maxWidth = 300;
          const scaleSize = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // 壓縮成 JPEG，品質 0.7 (大幅減少字串長度)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedBase64);
        };
      };
    });
  };

  // ⭐ 修改：使用壓縮函式處理圖片
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // 直接進行壓縮，不需要再限制 2MB，因為壓縮後一定很小
        const compressedBase64 = await compressImage(file);
        setFormData(prev => ({ ...prev, photoURL: compressedBase64 }));
      } catch (error) {
        console.error("Image processing error:", error);
        alert("Error processing image");
      }
    }
  };

  // ⭐ 修改：儲存邏輯加入重新整理
  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    // 簡單的 Loading 處理，防止重複點擊
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if(submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Saving...";
    }

    try {
      const userRef = ref(db, `users/${user.uid}/profile`);
      
      // 1. 更新資料庫
      await update(userRef, {
          username: formData.username,
          phone: formData.phone,
          address: formData.address,
          photoURL: formData.photoURL
      });

      // 2. 更新 Auth Profile (Navbar 是讀取這裡的)
      await updateProfile(user, {
        displayName: formData.username,
        photoURL: formData.photoURL
      });
      
      setNotify({ isVisible: true, message: t('profile.success') });
      
      // ⭐ 關鍵：延遲 1 秒後重新整理網頁
      // 這樣 Navbar 才會重新抓取最新的 Auth 資料並顯示新照片
      setTimeout(() => {
          setNotify({ ...notify, isVisible: false });
          window.location.reload(); 
      }, 1000);

    } catch (error) {
      console.error("Save Error:", error);
      alert(`Error saving profile: ${error.message}`);
      // 發生錯誤時恢復按鈕
      if(submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = t('profile.save'); // 或是原本的按鈕文字
      }
    }
  };

  const handleApplyAdmin = async () => {
      if(!user) return;
      try {
          const userRef = ref(db, `users/${user.uid}/profile`);
          await update(userRef, { roleRequest: 'pending' }); 
          setFormData(prev => ({ ...prev, roleRequest: 'pending' }));
          setNotify({ isVisible: true, message: "Admin application sent!" });
          setTimeout(() => setNotify({ ...notify, isVisible: false }), 3000);
      } catch (error) {
          console.error(error);
      }
  }

  if (!user) return <div className="text-center py-20 text-xl font-bold">{t('cart.login_alert')}</div>;

  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh] flex justify-center items-center">
      <Notification message={notify.message} isVisible={notify.isVisible} />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
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

        <form onSubmit={handleSave} className="p-8 md:p-12 space-y-6">
            
            <div className="group opacity-70">
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <IoMail className="text-yellow-500"/> {t('profile.email')}
                </label>
                <input 
                    type="text" 
                    value={user.email} 
                    disabled 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                />
            </div>

            <motion.div whileFocus={{ scale: 1.01 }}>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <IoPerson className="text-yellow-500"/> {t('profile.name')}
                </label>
                <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition font-poppins"
                />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.01 }}>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <IoCall className="text-yellow-500"/> {t('profile.phone')}
                </label>
                <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition font-poppins"
                />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.01 }}>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <IoLocation className="text-yellow-500"/> {t('profile.addr')}
                </label>
                <textarea 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    rows="3"
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition font-poppins resize-none"
                />
            </motion.div>

            <div className="flex flex-col gap-3 mt-6">
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-dark text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black transition flex items-center justify-center gap-2 text-lg"
                >
                    <IoSave className="text-xl"/> {t('profile.save')}
                </motion.button>

                {formData.roleRequest === 'pending' ? (
                    <button disabled className="w-full bg-gray-300 text-gray-600 font-bold py-3 rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
                        <IoShieldCheckmark/> Application Pending...
                    </button>
                ) : user.email !== "chengyouli37@gmail.com" && (
                    <button 
                        type="button"
                        onClick={handleApplyAdmin}
                        className="w-full border-2 border-yellow-400 text-yellow-600 font-bold py-3 rounded-xl hover:bg-yellow-50 transition flex items-center justify-center gap-2"
                    >
                        <IoShieldCheckmark/> Apply to be Admin
                    </button>
                )}
            </div>

        </form>
      </motion.div>
    </div>
  );
};

export default Profile;