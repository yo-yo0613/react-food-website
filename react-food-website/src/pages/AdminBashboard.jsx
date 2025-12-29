// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { ref, push, onValue, remove } from 'firebase/database';
import { motion } from 'framer-motion';
import { IoAdd, IoTrash, IoFastFood, IoStatsChart, IoImage } from "react-icons/io5";

// Chart.js 設定
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'stats'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // 新增商品的表單狀態
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: 'breakfast',
    description: '',
    image: ''
  });

  // 1. 讀取商品與訂單資料
  useEffect(() => {
    // 讀取商品 (假設你的商品存在 'products' 節點，如果還沒改 Menu 頁面，這裡會是空的)
    const productsRef = ref(db, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedProducts = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
      setProducts(loadedProducts);
    });

    // 讀取訂單 (用於報表)
    const ordersRef = ref(db, 'orders');
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      const loadedOrders = data ? Object.values(data) : [];
      setOrders(loadedOrders);
    });
  }, []);

  // 2. 處理圖片上傳 (轉 Base64)
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

  // 3. 新增商品到 Firebase
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return alert("請填寫完整資訊");

    try {
      await push(ref(db, 'products'), {
        ...newItem,
        id: Date.now(), // 簡單 ID
        price: parseFloat(newItem.price)
      });
      alert("商品新增成功！");
      setNewItem({ name: '', price: '', category: 'breakfast', description: '', image: '' }); // 重置表單
    } catch (error) {
      console.error(error);
      alert("新增失敗");
    }
  };

  // 4. 刪除商品
  const handleDeleteProduct = async (id) => {
    if (window.confirm("確定要刪除這個商品嗎？")) {
      await remove(ref(db, `products/${id}`));
    }
  };

  // 5. 計算圖表數據 (每日營收)
  const getChartData = () => {
    const revenueByDate = {};

    orders.forEach(order => {
      // 假設 createdAt 是 ISO 字串，取前 10 碼 (YYYY-MM-DD)
      const date = order.createdAt ? order.createdAt.substring(0, 10) : 'Unknown';
      if (!revenueByDate[date]) revenueByDate[date] = 0;
      revenueByDate[date] += order.totalAmount;
    });

    // 排序日期
    const sortedDates = Object.keys(revenueByDate).sort();
    
    return {
      labels: sortedDates,
      datasets: [
        {
          label: '每日營收 (Daily Revenue)',
          data: sortedDates.map(date => revenueByDate[date]),
          backgroundColor: 'rgba(250, 204, 21, 0.8)', // 黃色
          borderColor: 'rgba(234, 179, 8, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-poppins">
      {/* Sidebar */}
      <div className="w-64 bg-dark text-white p-6 flex flex-col gap-6 fixed h-full">
        <h2 className="text-3xl font-league text-yellow-400">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-3 p-3 rounded-xl transition ${activeTab === 'menu' ? 'bg-yellow-500 text-black font-bold' : 'hover:bg-gray-800'}`}
          >
            <IoFastFood /> Menu Management
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-3 p-3 rounded-xl transition ${activeTab === 'stats' ? 'bg-yellow-500 text-black font-bold' : 'hover:bg-gray-800'}`}
          >
            <IoStatsChart /> Sales Report
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-10">
        
        {/* === 頁籤 1: 菜單管理 === */}
        {activeTab === 'menu' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Item</h1>
            
            {/* 新增表單 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-10 flex gap-8">
              <div className="flex-1 space-y-4">
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
                
                {/* 圖片上傳 */}
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Image</label>
                   <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl cursor-pointer hover:bg-gray-200 transition w-fit">
                      <IoImage /> Upload Image
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                   </label>
                </div>

                <button onClick={handleAddProduct} className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition flex items-center gap-2">
                  <IoAdd size={20}/> Add to Menu
                </button>
              </div>

              {/* 預覽卡片 */}
              <div className="w-1/3 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-4">
                 <p className="text-gray-400 mb-4 text-sm">Preview</p>
                 <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-[250px]">
                    <div className="h-32 w-full bg-gray-200 rounded-lg mb-3 overflow-hidden">
                      {newItem.image ? <img src={newItem.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>}
                    </div>
                    <h3 className="font-bold text-lg">{newItem.name || "Product Name"}</h3>
                    <p className="text-yellow-500 font-bold">${newItem.price || "0.00"}</p>
                 </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">Current Menu Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-gray-100"/>
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
          </motion.div>
        )}

        {/* === 頁籤 2: 營收報表 === */}
        {activeTab === 'stats' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Revenue Dashboard</h1>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 h-[500px]">
               {orders.length > 0 ? (
                 <Bar data={getChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
               ) : (
                 <div className="h-full flex items-center justify-center text-gray-400">
                    尚無訂單數據
                 </div>
               )}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-gray-500 text-sm mb-2">Total Orders</h3>
                  <p className="text-4xl font-bold text-dark">{orders.length}</p>
               </div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-gray-500 text-sm mb-2">Total Revenue</h3>
                  <p className="text-4xl font-bold text-yellow-500">
                    ${orders.reduce((acc, curr) => acc + curr.totalAmount, 0).toFixed(2)}
                  </p>
               </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;