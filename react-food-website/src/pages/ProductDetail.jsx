// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext'; // 確保路徑正確
import Notification from '../components/Notification/Notification'; // 引入通知元件

// 圖片引入
import Food1 from "../assets/food/food.png";
import Food2 from "../assets/food/food2-plate.png";
import Food3 from "../assets/food/banner.png";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart(); // 取得 Context 方法
  
  // 商品資料
  const productsData = [
    {
      id: 1,
      title: "HodDessert",
      price: 5.99,
      description: "這是一款經典的 HodDessert，搭配新鮮的蔬菜與獨特醬料，口感層次豐富，是下午茶的最佳選擇。",
      image: Food1, 
      rating: 4.8,
      reviews: 120
    },
    {
      id: 2,
      title: "HodCake (Salad)",
      price: 5.00,
      description: "健康輕食首選！滿滿的綠色蔬菜搭配清爽油醋醬，低卡又美味。",
      image: Food2, 
      rating: 4.5,
      reviews: 85
    },
    {
      id: 3,
      title: "HodCake (Special)",
      price: 5.00,
      description: "主廚特製的 HodCake，外酥內軟，每一口都能吃到濃郁的香氣。",
      image: Food3, 
      rating: 4.9,
      reviews: 230
    },
    {
      id: 4,
      title: "Breakfast Special",
      price: 12.99,
      description: "Fresh eggs, bacon, toast, and seasonal fruits",
      image: Food1,
      rating: 4.6,
      reviews: 95
    },
    {
      id: 5,
      title: "Lunch Combo",
      price: 15.99,
      description: "Grilled chicken with fresh salad and soup",
      image: Food2,
      rating: 4.7,
      reviews: 110
    },
    {
      id: 6,
      title: "Dinner Delight",
      price: 24.99,
      description: "Premium steak with roasted vegetables",
      image: Food3,
      rating: 4.9,
      reviews: 150
    },
    {
      id: 7,
      title: "Sweet Pancakes",
      price: 9.99,
      description: "Fluffy pancakes with maple syrup",
      image: Food1,
      rating: 4.4,
      reviews: 70
    },
    {
      id: 8,
      title: "Fresh Salad",
      price: 8.99,
      description: "Mixed greens with house dressing",
      image: Food2,
      rating: 4.3,
      reviews: 60
    },
    {
      id: 9,
      title: "HodDessert Deluxe",
      price: 7.99,
      description: "升級版 HodDessert，加入更多配料與特製醬料，帶來更豐富的味覺享受。",
      image: Food3,
      rating: 4.9,
      reviews: 180
    },
    {
      id: 10,
      title: "Gourmet HodCake",
      price: 6.50,
      description: "精選食材製作的 HodCake，口感細膩，適合喜愛高品質料理的您。",
      image: Food1,
      rating: 4.8,
      reviews: 140
    },
    {
      id: 11,
      title: "Vegan HodDessert",
      price: 5.49,
      description: "專為素食者設計的 HodDessert，使用新鮮蔬菜與植物性醬料，健康又美味。",
      image: Food2,
      rating: 4.5,
      reviews: 90
    },
    {
      id: 12,
      title: "HodCake with a Twist",
      price: 6.00,
      description: "創新口味的 HodCake，融合多種風味，帶來前所未有的美食體驗。",
      image: Food3,
      rating: 4.7,
      reviews: 130
    }
  ];

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showNotify, setShowNotify] = useState(false); // 控制通知顯示

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/'); 
    }
  }, [id, navigate]);

  const handleQuantityChange = (type) => {
    if (type === 'minus' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'plus') setQuantity(quantity + 1);
  };

  // 加入購物車邏輯
  const handleAddToCart = () => {
    // 傳送商品資訊與數量給 Context
    // 注意：這裡假設你的 Context 能夠處理 { ...item, quantity } 的格式
    addToCart({ ...product, quantity: quantity });
    
    // 顯示通知
    setShowNotify(true);
    
    // 2秒後自動關閉
    setTimeout(() => {
      setShowNotify(false);
    }, 2000);
  };

  if (!product) {
    return <div className="h-screen flex justify-center items-center text-2xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20 relative min-h-[60vh] pb-20"> 
      
      {/* 通知元件掛載 */}
      <Notification 
        message={`已將 ${quantity} 份 ${product.title} 加入購物車`} 
        isVisible={showNotify} 
      />

      {/* 頂部返回按鈕 */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors font-medium"
      >
        <FaArrowLeft className="mr-2" /> 
        返回菜單
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* 左側：圖片區 */}
        <div className="w-full h-[400px] bg-yellow-100/30 rounded-3xl flex justify-center items-center shadow-sm relative group">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-[65%] md:w-[75%] object-contain drop-shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-spin-slow"
          />
        </div>

        {/* 右側：資訊區 */}
        <div className="flex flex-col justify-start space-y-6">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 font-league">{product.title}</h1>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex text-yellow-400 text-lg">
                {[...Array(5)].map((_, i) => (
                   <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"} />
                ))}
              </div>
              <span className="text-gray-400 text-sm font-medium">({product.reviews} 評論)</span>
            </div>
            <p className="text-3xl font-bold text-yellow-500">${product.price}</p>
          </div>

          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold mb-2 text-gray-800">關於這道料理</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>
          </div>

          {/* 底部操作區 */}
          <div className="flex items-center space-x-4 pt-4">
            {/* 數量選擇器 */}
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button 
                onClick={() => handleQuantityChange('minus')}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 hover:text-yellow-500 transition"
              >
                <FaMinus size={10} />
              </button>
              <span className="w-12 text-center font-bold text-lg text-gray-700">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange('plus')}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 hover:text-yellow-500 transition"
              >
                <FaPlus size={10} />
              </button>
            </div>

            {/* Order Now 按鈕 */}
            <button 
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg shadow-yellow-400/30 hover:shadow-xl hover:shadow-yellow-400/40 transition-all transform hover:-translate-y-1 active:scale-95"
              onClick={handleAddToCart}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;