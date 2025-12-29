import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BiPackage, BiTime, BiMap, BiCurrentLocation, BiCheckCircle,
  BiReceipt, BiDish, BiCycling, BiHomeAlt
} from 'react-icons/bi'

// ⭐ 引入地圖套件
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// ⭐ 引入 Firebase
import { db } from '../firebase/config'
import { ref, onValue, set } from 'firebase/database'
import { useAuth } from '../contexts/AuthContext'

// 修正 Leaflet 預設 icon 顯示問題 (這是 Leaflet 在 React 中的已知 bug)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// 自訂外送員圖示 (使用一個機車的小圖示)
const deliveryIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/7541/7541900.png', 
    iconSize: [45, 45],
    iconAnchor: [22, 45], // 讓圖示的底部尖端對準座標
    popupAnchor: [0, -45]
});

// 靜態資料：頂部特色
const topFeatures = [
  { id: 1, icon: <BiPackage className="text-3xl" />, title: 'Secure Packaging', label: 'Safe', description: 'Food sealed in containers' },
  { id: 2, icon: <BiTime className="text-3xl" />, title: 'Fast Delivery', label: '30min', description: 'Average delivery time < 30m' },
  { id: 3, icon: <BiMap className="text-3xl" />, title: 'Real-time Tracking', label: 'Live', description: 'Track from kitchen to door' },
  { id: 4, icon: <BiCurrentLocation className="text-3xl" />, title: 'Wide Coverage', label: '5mi', description: 'Serving 5-mile radius' }
]

// 靜態資料：服務卡片
const serviceCards = [
  { id: 1, icon: <BiTime className="text-4xl text-gray-700" />, title: "Express Delivery", desc: "Lightning-fast food delivery.", features: ["30 min delivery", "Real-time GPS", "Priority handling"] },
  { id: 2, icon: <BiMap className="text-4xl text-gray-700" />, title: "Service Areas", desc: "Covering all major neighborhoods.", features: ["5-mile radius", "No minimum order", "Citywide catering"] },
  { id: 3, icon: <BiPackage className="text-4xl text-gray-700" />, title: "Quality Guarantee", desc: "Fresh and perfect temperature.", features: ["Temp control", "Sealed packaging", "Satisfaction guaranteed"] }
]

// ⭐ 地圖中心更新組件 (當外送員移動時，讓地圖跟著移動)
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function Delivery() {
  const { user } = useAuth();
  
  // ⭐ 狀態管理
  const [currentStep, setCurrentStep] = useState(1); // 訂單進度 (1-5)
  // 預設位置 (例如台北 101)
  const [deliveryLocation, setDeliveryLocation] = useState({ lat: 25.0330, lng: 121.5654 }); 
  const [orderId, setOrderId] = useState(null);

  // ⭐ 模擬路徑 (範例：從台北市政府移動到附近)
  // 在真實應用中，這會是外送員 App 上傳的即時座標
  const routePath = [
    { lat: 25.038, lng: 121.564 }, // 起點
    { lat: 25.0375, lng: 121.5642 },
    { lat: 25.0370, lng: 121.5645 },
    { lat: 25.0365, lng: 121.5648 },
    { lat: 25.0360, lng: 121.5650 },
    { lat: 25.0355, lng: 121.5652 },
    { lat: 25.0350, lng: 121.5655 },
    { lat: 25.0345, lng: 121.5658 },
    { lat: 25.0340, lng: 121.5660 },
    { lat: 25.0335, lng: 121.5662 },
    { lat: 25.0330, lng: 121.5654 }, // 終點
  ];

  // 1. 初始化或監聽訂單
  useEffect(() => {
    if (!user) return;

    // 為每位使用者建立一個固定的測試訂單 ID
    const demoOrderId = 'demo-delivery-' + user.uid;
    setOrderId(demoOrderId);

    const deliveryRef = ref(db, `deliveries/${demoOrderId}`);

    // ⭐ 監聽 Firebase 資料變化 (Realtime Database)
    const unsubscribe = onValue(deliveryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data.location) setDeliveryLocation(data.location);
        if (data.step) setCurrentStep(data.step);
      } else {
        // 如果資料庫沒資料，初始化一筆預設資料
        set(deliveryRef, {
          location: routePath[0],
          step: 1,
          status: 'Confirmed'
        });
      }
    });

    return () => unsubscribe();
  }, [user]);

  // 2. 模擬外送員移動邏輯
  // 當狀態變成第 4 步 (Out for Delivery) 時，開始模擬移動
  useEffect(() => {
    if (!orderId || currentStep !== 4) return;

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < routePath.length) {
        const newLoc = routePath[stepIndex];
        
        // 更新 Firebase (這會觸發上面的 onValue，進而更新地圖)
        set(ref(db, `deliveries/${orderId}/location`), newLoc);
        
        stepIndex++;
      } else {
        // 到達終點，更新狀態為已送達 (Step 5)
        set(ref(db, `deliveries/${orderId}/step`), 5); 
        clearInterval(interval);
      }
    }, 2000); // 每 2 秒移動一次

    return () => clearInterval(interval);
  }, [currentStep, orderId]);

  // 手動觸發模擬按鈕的功能
  const startSimulation = () => {
    if (!orderId) return;
    // 重置狀態，開始流程
    set(ref(db, `deliveries/${orderId}/step`), 1); 
    set(ref(db, `deliveries/${orderId}/location`), routePath[0]);

    setTimeout(() => set(ref(db, `deliveries/${orderId}/step`), 2), 1000); // 備餐
    setTimeout(() => set(ref(db, `deliveries/${orderId}/step`), 3), 3000); // 打包
    setTimeout(() => set(ref(db, `deliveries/${orderId}/step`), 4), 5000); // 出發 (觸發移動)
  };

  // 定義進度條資料 (根據 currentStep 動態顯示狀態)
  const trackingSteps = [
    { id: 1, icon: <BiReceipt className="text-xl"/>, title: 'Order Confirmed', desc: "We've received your order", time: '12:30 PM' },
    { id: 2, icon: <BiDish className="text-xl"/>, title: 'Preparing Your Food', desc: 'Chefs are cooking', time: '12:35 PM' },
    { id: 3, icon: <BiPackage className="text-xl"/>, title: 'Quality Check & Packing', desc: 'Packing your meal', time: '12:45 PM' },
    { id: 4, icon: <BiCycling className="text-xl"/>, title: 'Out for Delivery', desc: 'On the way', time: '1:00 PM' },
    { id: 5, icon: <BiHomeAlt className="text-xl"/>, title: 'Delivered', desc: 'Enjoy your meal!', time: '1:15 PM' }
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      
      {/* Top Features */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-20"
        initial="hidden" whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        {topFeatures.map(f => (
           <motion.div key={f.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col items-center text-center group">
              <div className="rounded-full bg-yellow-100 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-yellow-600">
                  {f.icon}
              </div>
              <h3 className="font-bold text-gray-900">{f.title}</h3>
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full my-2">{f.label}</span>
              <p className="text-gray-500 text-sm">{f.description}</p>
           </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
        
        {/* ⭐ 左側: 互動式地圖 (使用 Leaflet) */}
        <div className="w-full rounded-xl bg-white border border-gray-200 overflow-hidden shadow-lg h-[600px] relative z-0">
          <MapContainer 
            center={[deliveryLocation.lat, deliveryLocation.lng]} 
            zoom={15} 
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            {/* 使用 OpenStreetMap 圖層 (免費) */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* 自動更新地圖中心 */}
            <MapUpdater center={[deliveryLocation.lat, deliveryLocation.lng]} />

            {/* 外送員標記 */}
            <Marker position={[deliveryLocation.lat, deliveryLocation.lng]} icon={deliveryIcon}>
              <Popup>
                <div className="text-center">
                    <p className="font-bold m-0">Food is here!</p>
                    <p className="text-xs text-gray-500 m-0">{currentStep === 5 ? 'Arrived' : 'On the way'}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>

          {/* 浮動控制面板 (模擬按鈕) */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-xl shadow-xl z-[400] flex justify-between items-center border border-gray-100">
             <div>
               <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Estimated Arrival</h4>
               <p className="text-yellow-600 font-bold text-2xl">
                   {currentStep === 5 ? "Arrived!" : currentStep === 4 ? "5 min" : "Preparing..."}
               </p>
             </div>
             <button 
                onClick={startSimulation}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-black transition-colors shadow-md"
             >
                {currentStep === 5 ? "Replay Delivery" : "Start Tracking Demo"}
             </button>
          </div>
        </div>

        {/* ⭐ 右側: 訂單狀態追蹤 */}
        <div className="w-full">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Order Status</h2>
              <p className="text-sm text-gray-500">Tracking ID: #{orderId?.slice(-8).toUpperCase()}</p>
            </div>
            <div className="p-6">
              <div className="relative space-y-8 pl-2">
                {/* 垂直連接線 */}
                <div className="absolute left-[29px] top-4 bottom-4 w-0.5 bg-gray-100 z-0"></div>
                
                {trackingSteps.map((step) => {
                  const isCompleted = step.id < currentStep;
                  const isActive = step.id === currentStep;

                  return (
                    <motion.div 
                      key={step.id}
                      className="relative z-10 flex items-start gap-4"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: step.id * 0.1 }}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                        isActive ? 'bg-yellow-400 border-yellow-400 text-white scale-110 shadow-lg' : 
                        'bg-white border-gray-200 text-gray-300'
                      }`}>
                        {isCompleted ? <BiCheckCircle className="text-2xl" /> : step.icon}
                      </div>
                      <div className={`flex-1 pt-1 transition-opacity duration-300 ${isActive || isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                        <div className="flex justify-between items-start">
                            <h3 className={`font-bold text-lg ${isActive ? 'text-yellow-600' : 'text-gray-800'}`}>{step.title}</h3>
                            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">{step.time}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                        
                        {isActive && (
                           <motion.div 
                             className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-yellow-700 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100"
                             initial={{ opacity: 0, y: -5 }}
                             animate={{ opacity: 1, y: 0 }}
                           >
                             <span className="relative flex h-2 w-2">
                               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                               <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                             </span>
                             Processing Now
                           </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Service Cards (保持原本設計) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
         {serviceCards.map((c, index) => (
            <motion.div 
                key={c.id} 
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
            >
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-700 mb-6 mx-auto">
                   {c.icon}
               </div>
               <h3 className="text-xl font-bold mb-3 text-center">{c.title}</h3>
               <p className="text-gray-500 text-sm mb-6 text-center leading-relaxed">{c.desc}</p>
               <ul className="space-y-3">
                  {c.features.map((feat, i) => (
                     <li key={i} className="flex items-center text-sm text-gray-600">
                        <BiCheckCircle className="text-green-500 mr-3 text-lg flex-shrink-0" /> {feat}
                     </li>
                  ))}
               </ul>
            </motion.div>
         ))}
      </div>

    </div>
  )
}