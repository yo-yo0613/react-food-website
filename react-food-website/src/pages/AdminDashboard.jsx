import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { ref, onValue } from 'firebase/database';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line 
} from 'recharts';
import { 
  IoMenu, IoClose, IoHome, IoFastFood, IoStatsChart, IoLogOut, 
  IoTrendingUp, IoWallet, IoBagHandle, IoAdd, IoTrash, IoCloudUpload
} from "react-icons/io5";

// --- 側邊欄組件 (樣式優化) ---
const Sidebar = ({ isOpen, toggleSidebar, activeTab, setActiveTab, handleLogout }) => (
  <>
    {/* 手機版遮罩 */}
    {isOpen && (
      <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" onClick={toggleSidebar}></div>
    )}
    
    {/* 側邊欄本體 */}
    <motion.div 
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-72 z-50 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static shrink-0`}
    >
      <div className="p-8 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-black font-bold text-xl font-league">F</div>
            <h2 className="text-2xl font-bold font-league tracking-wide text-white">Admin<span className="text-yellow-400">Panel</span></h2>
        </div>
        <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-white transition">
          <IoClose size={28} />
        </button>
      </div>

      <nav className="flex-1 mt-8 px-4 space-y-4 overflow-y-auto">
        <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Main Menu</p>
        <SidebarItem icon={<IoStatsChart />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); toggleSidebar(); }} />
        <SidebarItem icon={<IoFastFood />} label="Menu Management" active={activeTab === 'menu'} onClick={() => { setActiveTab('menu'); toggleSidebar(); }} />
        
        <div className="pt-6 mt-6 border-t border-gray-800">
            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">System</p>
            <SidebarItem icon={<IoHome />} label="Back to Home" onClick={() => window.location.href='/'} />
        </div>
      </nav>

      <div className="p-6 border-t border-gray-800">
        <button onClick={handleLogout} className="flex items-center justify-center gap-3 w-full px-4 py-4 text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-xl transition font-bold">
          <IoLogOut size={20} /> Logout
        </button>
      </div>
    </motion.div>
  </>
);

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl transition-all duration-200 font-medium text-lg ${active ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 translate-x-1' : 'text-gray-400 hover:bg-gray-800 hover:text-white hover:translate-x-1'}`}
  >
    <span className="text-2xl">{icon}</span>
    {label}
  </button>
);

// --- 主頁面 ---
const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, orders: 0, avgOrder: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  
  // Menu Management States
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'breakfast', description: '', img: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // 1. 抓取 Dashboard 數據 (Firebase)
  useEffect(() => {
    const ordersRef = ref(db, 'orders');
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) processOrderData(data);
    });
  }, []);

  // 2. 抓取商品列表 (Spring Boot)
  useEffect(() => {
    if (activeTab === 'menu') {
        fetchProducts();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
      try {
          const res = await fetch('https://food-backend-ehke.onrender.com/api/products');
          const data = await res.json();
          setProducts(data);
      } catch (error) {
          console.error("Error fetching products:", error);
      }
  };

  // 處理訂單數據
  const processOrderData = (ordersObj) => {
    const ordersArray = Object.values(ordersObj);
    const totalRevenue = ordersArray.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const totalOrders = ordersArray.length;
    
    setStats({
      revenue: totalRevenue.toFixed(2),
      orders: totalOrders,
      avgOrder: totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0
    });

    const groupedData = {};
    ordersArray.forEach(order => {
      const date = order.createdAt ? order.createdAt.split('T')[0] : 'Unknown';
      if (!groupedData[date]) groupedData[date] = { name: date, revenue: 0, orders: 0 };
      groupedData[date].revenue += (order.totalPrice || 0);
      groupedData[date].orders += 1;
    });

    setChartData(Object.values(groupedData).sort((a, b) => new Date(a.name) - new Date(b.name)));
    setRecentOrders(ordersArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5));
  };

  // 處理新增商品
  const handleAddProduct = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
          const res = await fetch('https://food-backend-ehke.onrender.com/api/products', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  name: newProduct.name,
                  price: parseFloat(newProduct.price),
                  category: newProduct.category,
                  description: newProduct.description,
                  img: newProduct.img || '/images/food1.png' // 預設圖
              })
          });
          if (res.ok) {
              alert("Product Added Successfully!");
              setNewProduct({ name: '', price: '', category: 'breakfast', description: '', img: '' });
              fetchProducts(); // 重新抓取列表
          }
      } catch (error) {
          console.error("Error adding product:", error);
      } finally {
          setIsSubmitting(false);
      }
  };

  // 處理刪除商品
  const handleDeleteProduct = async (id) => {
      if(!window.confirm("Are you sure you want to delete this item?")) return;
      try {
          await fetch(`https://food-backend-ehke.onrender.com/api/products/${id}`, { method: 'DELETE' });
          fetchProducts();
      } catch (error) {
          console.error("Error deleting product:", error);
      }
  }

  // 處理圖片上傳 (轉 Base64 顯示用)
  const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setNewProduct({ ...newProduct, img: reader.result });
          };
          reader.readAsDataURL(file);
      }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-poppins text-gray-800">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        handleLogout={() => navigate('/')}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-2xl text-gray-600 hover:text-black transition">
                <IoMenu />
            </button>
            <h2 className="text-xl font-bold text-gray-700 hidden md:block">
                {activeTab === 'dashboard' ? 'Overview' : 'Management'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Super Administrator</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center font-bold text-yellow-600 border-2 border-yellow-200 text-lg shadow-sm">
                A
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            
            {/* --- DASHBOARD TAB --- */}
            {activeTab === 'dashboard' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 font-league">Revenue Dashboard</h1>
                <p className="text-gray-500 mb-10">Here's what's happening with your business today.</p>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <StatCard icon={<IoWallet />} title="Total Revenue" value={`$${stats.revenue}`} color="bg-emerald-100 text-emerald-600" />
                    <StatCard icon={<IoBagHandle />} title="Total Orders" value={stats.orders} color="bg-blue-100 text-blue-600" />
                    <StatCard icon={<IoTrendingUp />} title="Avg. Order Value" value={`$${stats.avgOrder}`} color="bg-violet-100 text-violet-600" />
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                    <h3 className="text-xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                        <span className="w-2 h-8 bg-yellow-400 rounded-full"></span> Daily Revenue
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                            <Bar dataKey="revenue" fill="#FACC15" radius={[6, 6, 0, 0]} barSize={40} name="Revenue ($)" />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                    <h3 className="text-xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                        <span className="w-2 h-8 bg-black rounded-full"></span> Orders Trend
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                            <Line type="monotone" dataKey="orders" stroke="#111827" strokeWidth={4} dot={{ r: 6, fill: '#111827', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} name="Orders" />
                        </LineChart>
                        </ResponsiveContainer>
                    </div>
                    </div>
                </div>

                {/* Recent Orders Table */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">Recent Transactions</h3>
                    <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="text-gray-400 border-b border-gray-100 text-sm uppercase tracking-wider">
                            <th className="py-4 font-semibold pl-4">Order ID</th>
                            <th className="py-4 font-semibold">Date</th>
                            <th className="py-4 font-semibold">User</th>
                            <th className="py-4 font-semibold text-right pr-4">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recentOrders.map((order, idx) => (
                            <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition group">
                            <td className="py-5 pl-4 text-sm font-bold text-gray-700 group-hover:text-yellow-600 transition">#{order.id ? order.id.slice(-6) : 'N/A'}</td>
                            <td className="py-5 text-sm text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}</td>
                            <td className="py-5 text-sm text-gray-500 font-medium">{order.userId ? order.userId.slice(0, 8) + '...' : 'Guest'}</td>
                            <td className="py-5 pr-4 text-sm font-bold text-right text-emerald-500 bg-emerald-50/0 group-hover:bg-emerald-50 rounded-lg transition">${order.totalPrice}</td>
                            </tr>
                        ))}
                        {recentOrders.length === 0 && (
                            <tr><td colSpan="4" className="text-center py-10 text-gray-400 italic">No orders found yet.</td></tr>
                        )}
                        </tbody>
                    </table>
                    </div>
                </div>
                </motion.div>
            )}

            {/* --- MENU MANAGEMENT TAB --- */}
            {activeTab === 'menu' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 font-league">Menu Management</h1>
                    <p className="text-gray-500 mb-10">Add, edit, or remove items from your menu.</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        
                        {/* 1. Add New Item Form */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-28">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <IoAdd className="bg-black text-white rounded-full p-1 text-2xl"/> Add New Item
                                </h3>
                                <form onSubmit={handleAddProduct} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                                        <input type="text" placeholder="e.g. Beef Burger" required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                            value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                                            <input type="number" step="0.01" placeholder="12.99" required
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                                value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                            <select 
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                                value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                            >
                                                <option value="breakfast">Breakfast</option>
                                                <option value="lunch">Lunch</option>
                                                <option value="dinner">Dinner</option>
                                                <option value="desserts">Desserts</option>
                                                <option value="drinks">Drinks</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                        <textarea rows="3" placeholder="Description..." required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none"
                                            value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Image</label>
                                        <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 hover:bg-gray-50 transition text-center cursor-pointer group">
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer"/>
                                            <div className="flex flex-col items-center gap-2">
                                                {newProduct.img ? (
                                                    <img src={newProduct.img} alt="Preview" className="h-32 object-contain rounded-lg shadow-sm" />
                                                ) : (
                                                    <>
                                                        <IoCloudUpload className="text-3xl text-gray-400 group-hover:text-yellow-500 transition"/>
                                                        <span className="text-sm text-gray-500">Click to upload</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 transition transform active:scale-95 disabled:opacity-50">
                                        {isSubmitting ? 'Saving...' : 'Add to Menu'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* 2. Product List */}
                        <div className="lg:col-span-2">
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
                                    Current Items <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{products.length} items</span>
                                </h3>
                                <div className="space-y-4">
                                    {products.map(item => (
                                        <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:shadow-md transition bg-gray-50/50">
                                            <img src={item.img || '/images/food1.png'} alt={item.name} className="w-20 h-20 object-cover rounded-xl shadow-sm bg-white" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-800 text-lg">{item.name}</h4>
                                                <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-xs font-bold uppercase bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md">{item.category}</span>
                                                    <span className="text-sm font-bold text-gray-900">${item.price}</span>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleDeleteProduct(item.id)}
                                                className="p-3 bg-white border border-gray-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition shadow-sm"
                                                title="Delete"
                                            >
                                                <IoTrash size={20} />
                                            </button>
                                        </div>
                                    ))}
                                    {products.length === 0 && <p className="text-center py-10 text-gray-400">No items found.</p>}
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

// 小組件：統計卡片 (樣式升級)
const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition duration-300 transform hover:-translate-y-1">
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">{title}</p>
      <h4 className="text-3xl font-extrabold text-gray-800 font-league">{value}</h4>
    </div>
  </div>
);

export default AdminDashboard;