import React, { useState, useEffect } from 'react';
// ⭐ 1. 把 Firebase 加回來
import { db } from '../firebase/config';
import { ref, push, onValue, remove } from 'firebase/database';
import { motion } from 'framer-motion';
import { IoAdd, IoTrash, IoFastFood, IoStatsChart, IoImage } from "react-icons/io5";

import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [products, setProducts] = useState([]); // 這是顯示在列表上的資料 (來自 Spring Boot)
  const [firebaseProducts, setFirebaseProducts] = useState([]); // 這是 Firebase 的資料 (用來對照)
  
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: 'breakfast',
    description: '',
    image: ''
  });

  // ⭐ 2. 同時監聽 Spring Boot 和 Firebase
  useEffect(() => {
    fetchSpringBootData(); // 載入 Spring Boot 資料
    fetchFirebaseData();   // 載入 Firebase 資料 (備份用)
  }, []);

  // 讀取 Spring Boot
  const fetchSpringBootData = async () => {
    try {
      const response = await fetch('https://food-backend-ehke.onrender.com/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Spring Boot 連線失敗:", error);
    }
  };

  // 讀取 Firebase
  const fetchFirebaseData = () => {
    const productsRef = ref(db, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedProducts = data ? Object.entries(data).map(([key, val]) => ({ firebaseKey: key, ...val })) : [];
      setFirebaseProducts(loadedProducts);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ⭐ 3. 新增商品 (雙寫：同時寫入 Java 和 Firebase)
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return alert("請填寫完整資訊");

    const productPayload = {
        name: newItem.name,
        price: parseFloat(newItem.price),
        category: newItem.category,
        description: newItem.description,
        img: newItem.image
    };

    try {
      // --- 動作 A: 傳送給 Spring Boot (為了讓 Menu 頁面看到) ---
      const springResponse = await fetch('https://food-backend-ehke.onrender.com/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productPayload)
      });

      // --- 動作 B: 傳送給 Firebase (為了永久保存) ---
      await push(ref(db, 'products'), productPayload);

      if (springResponse.ok) {
          alert("商品新增成功！(已同步至後端與 Firebase)");
          setNewItem({ name: '', price: '', category: 'breakfast', description: '', image: '' });
          fetchSpringBootData(); // 重新整理列表
      } else {
          alert("Spring Boot 新增失敗，但 Firebase 可能已儲存");
      }
    } catch (error) {
      console.error(error);
      alert("連線發生錯誤");
    }
  };

  // ⭐ 4. 刪除商品 (雖然目前 ID 對不上，我們先針對 Spring Boot 做刪除)
  const handleDeleteProduct = async (id) => {
    if (window.confirm("確定要刪除這個商品嗎？(目前僅刪除 Spring Boot 暫存)")) {
      try {
          // 刪除 Spring Boot
          await fetch(`https://food-backend-ehke.onrender.com/api/products/${id}`, { method: 'DELETE' });
          
          // (進階) 如果要刪除 Firebase 對應資料，需要知道 Firebase 的 Key，這裡暫時先略過
          // 因為 Spring Boot 的 ID (1, 2, 3) 跟 Firebase 的 Key (-Njx...) 長得不一樣
          
          fetchSpringBootData(); // 重整
      } catch (error) {
          console.error("刪除失敗", error);
      }
    }
  };

  // 圖表數據 (假資料)
  const getChartData = () => {
    return {
      labels: ['2025-01-01', '2025-01-02', '2025-01-03'],
      datasets: [
        {
          label: '每日營收 (Mock Data)',
          data: [120, 300, 150],
          backgroundColor: 'rgba(250, 204, 21, 0.8)',
          borderColor: 'rgba(234, 179, 8, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-poppins">
      <div className="w-64 bg-black text-white p-6 flex flex-col gap-6 fixed h-full z-10">
        <h2 className="text-3xl font-league text-yellow-400">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <button onClick={() => setActiveTab('menu')} className={`flex items-center gap-3 p-3 rounded-xl transition ${activeTab === 'menu' ? 'bg-yellow-500 text-black font-bold' : 'hover:bg-gray-800'}`}>
            <IoFastFood /> Menu Management
          </button>
          <button onClick={() => setActiveTab('stats')} className={`flex items-center gap-3 p-3 rounded-xl transition ${activeTab === 'stats' ? 'bg-yellow-500 text-black font-bold' : 'hover:bg-gray-800'}`}>
            <IoStatsChart /> Sales Report
          </button>
        </nav>
      </div>

      <div className="ml-64 flex-1 p-10">
        {activeTab === 'menu' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Item</h1>
            
            {/* 新增區塊 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                {/* ... 輸入框保持不變 ... */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                  <input type="text" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-yellow-400" placeholder="e.g. Beef Burger"/>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Price ($)</label>
                    <input type="number" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-yellow-400" placeholder="12.99"/>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                    <select value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-yellow-400">
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="desserts">Desserts</option>
                      <option value="drinks">Drinks</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                  <textarea value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-yellow-400" rows="3" placeholder="Description..."/>
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Image</label>
                   <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl cursor-pointer hover:bg-gray-200 transition w-fit">
                      <IoImage /> Upload Image
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                   </label>
                </div>
                <button onClick={handleAddProduct} className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition flex items-center gap-2">
                  <IoAdd size={20}/> Add to Menu & Firebase
                </button>
              </div>

              {/* 預覽區塊 */}
              <div className="w-full md:w-1/3 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-4">
                  <p className="text-gray-400 mb-4 text-sm">Preview</p>
                  <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-[250px]">
                     <div className="h-32 w-full bg-gray-200 rounded-lg mb-3 overflow-hidden">
                       {newItem.image ? <img src={newItem.image} className="w-full h-full object-cover" alt="preview" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>}
                     </div>
                     <h3 className="font-bold text-lg">{newItem.name || "Product Name"}</h3>
                     <p className="text-yellow-500 font-bold">${newItem.price || "0.00"}</p>
                  </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">Current Items (In Spring Boot)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
                  <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-gray-100"/>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="text-yellow-500 font-bold">${item.price}</p>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{item.category}</span>
                  </div>
                  <button onClick={() => handleDeleteProduct(item.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-full transition">
                    <IoTrash size={20}/>
                  </button>
                </div>
              ))}
            </div>
            
            {/* 顯示 Firebase 裡的備份資料 (選用，讓你知道資料有進去) */}
            <h2 className="text-xl font-bold mt-10 mb-4 text-gray-400">Firebase Backup Data ({firebaseProducts.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 opacity-70">
                {firebaseProducts.map(item => (
                    <div key={item.firebaseKey} className="bg-gray-100 p-2 rounded text-xs text-gray-500">
                        {item.name} (Saved in DB)
                    </div>
                ))}
            </div>

          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Revenue Dashboard</h1>
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 h-[500px]">
               <Bar data={getChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default AdminDashboard;