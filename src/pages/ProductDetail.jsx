// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // 1. 引入 useParams
import { FaStar, FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';

// 2. 引入你的圖片 (請確認路徑正確)
import Food1 from "../assets/food/food.png";
import Food2 from "../assets/food/food2-plate.png";
import Food3 from "../assets/food/banner.png";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 3. 抓取網址上的 id (例如: 1, 2, 3)
  
  // 4. 定義商品資料庫 (模擬後端資料)
  // 注意：這裡的 id 必須跟 PopularRecipe 裡的 id 對應
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
    }
  ];

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // 5. 當 id 改變時，更新 product 狀態
  useEffect(() => {
    // 網址傳來的 id 是字串，要用 parseInt 轉成數字
    const foundProduct = productsData.find((p) => p.id === parseInt(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // 如果找不到商品，導回首頁 (或是顯示查無此商品)
      console.log("Product not found");
      navigate('/'); 
    }
  }, [id, navigate]);

  // 數量加減邏輯
  const handleQuantityChange = (type) => {
    if (type === 'minus' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'plus') setQuantity(quantity + 1);
  };

  // 6. 如果資料還沒載入，顯示 Loading 防止報錯
  if (!product) {
    return <div className="h-screen flex justify-center items-center text-2xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20"> 
      
      {/* 頂部返回按鈕 */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> 
        返回菜單
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* 左側：圖片區 (根據選到的商品顯示圖片) */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="w-full h-[400px] bg-lightYellow/20 rounded-2xl flex justify-center items-center shadow-sm relative overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-[60%] md:w-[70%] object-contain drop-shadow-xl hover:scale-110 transition-transform duration-500 animate-spin-slow"
            />
          </div>
        </div>

        {/* 右側：資訊區 */}
        <div className="flex flex-col justify-start space-y-6">
          
          {/* 標題與價格 */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.title}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-yellow-400">
                {/* 動態顯示星星 */}
                {[...Array(5)].map((_, i) => (
                   <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-gray-500 text-sm">({product.reviews} 評論)</span>
            </div>
            <p className="text-3xl font-bold text-primary">${product.price}</p>
          </div>

          {/* 描述 */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2 text-gray-700">商品描述</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* 底部操作區 */}
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
            {/* 數量選擇器 */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button 
                onClick={() => handleQuantityChange('minus')}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
              >
                <FaMinus size={12} />
              </button>
              <span className="px-4 py-2 font-semibold text-gray-700 w-12 text-center">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange('plus')}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
              >
                <FaPlus size={12} />
              </button>
            </div>

            {/* Order Now 按鈕 */}
            <button 
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              onClick={() => {
                alert(`已將 ${quantity} 份 ${product.title} 加入購物車！`);
                // 這裡之後可以寫入 Context 或是 Firebase
              }}
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