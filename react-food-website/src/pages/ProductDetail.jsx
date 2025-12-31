import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import Notification from '../components/Notification/Notification';
import { useTranslation } from 'react-i18next'; // ⭐ 引入翻譯 Hook

// 圖片引入
import Food1 from "../assets/food/food.png";
import Food2 from "../assets/food/food2-plate.png";
import Food3 from "../assets/food/banner.png";
import Drink1 from "../assets/food/drink1.png";
import Drink2 from "../assets/food/drink2.png";
import Drink3 from "../assets/food/drink3.png";
import Dessert1 from "../assets/food/dessert1.png";
import Dessert2 from "../assets/food/dessert2.png";
import Dessert3 from "../assets/food/dessert3.png";
import Dessert4 from "../assets/food/dessert4.png";
import Dinner1 from "../assets/food/dinner1.png";
import Dinner2 from "../assets/food/dinner2.png";
import Dinner3 from "../assets/food/dinner3.png";
import Dinner4 from "../assets/food/dinner4.png";
import Lunch1 from "../assets/food/lunch1.png";
import Lunch2 from "../assets/food/lunch2.png";
import Lunch3 from "../assets/food/lunch3.png";
import Breakfast1 from "../assets/food/breakfast1.png";
import Breakfast2 from "../assets/food/breakfast2.png";
import Breakfast3 from "../assets/food/breakfast3.png";
import Breakfast4 from "../assets/food/breakfast4.png";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const { t } = useTranslation(); // ⭐ 使用翻譯 Hook
  
  // ⭐ 簡化後的資料陣列：只保留不隨語言改變的屬性 (圖片、價格、評分、ID)
  // 標題和描述我們會用 i18n 動態抓取
  const productsData = [
    // Breakfast
    { id: 1, price: 12.99, image: Food1, rating: 4.8, reviews: 120 },
    { id: 2, price: 9.99, image: Breakfast1, rating: 4.5, reviews: 85 },
    { id: 3, price: 8.50, image: Breakfast2, rating: 4.6, reviews: 92 },
    { id: 4, price: 7.99, image: Breakfast3, rating: 4.4, reviews: 60 },
    { id: 5, price: 10.50, image: Breakfast4, rating: 4.7, reviews: 110 },
    // Lunch
    { id: 6, price: 15.99, image: Food2, rating: 4.9, reviews: 150 },
    { id: 7, price: 8.99, image: Lunch1, rating: 4.3, reviews: 75 },
    { id: 8, price: 11.50, image: Lunch2, rating: 4.6, reviews: 98 },
    { id: 9, price: 9.50, image: Lunch3, rating: 4.5, reviews: 80 },
    { id: 10, price: 13.99, image: Dessert2, rating: 4.8, reviews: 130 }, // 依照你原本的圖片設定
    // Dinner
    { id: 11, price: 24.99, image: Food3, rating: 4.9, reviews: 200 },
    { id: 12, price: 18.99, image: Dinner1, rating: 4.7, reviews: 145 },
    { id: 13, price: 21.50, image: Dinner2, rating: 4.8, reviews: 170 },
    { id: 14, price: 22.99, image: Dinner3, rating: 4.9, reviews: 190 },
    { id: 15, price: 16.50, image: Dinner4, rating: 4.6, reviews: 115 },
    // Desserts
    { id: 16, price: 5.99, image: Dessert1, rating: 4.8, reviews: 220 },
    { id: 17, price: 6.50, image: Dessert4, rating: 4.9, reviews: 300 },
    { id: 18, price: 5.50, image: Dessert3, rating: 4.5, reviews: 90 },
    // Drinks
    { id: 19, price: 4.99, image: Drink1, rating: 4.7, reviews: 160 },
    { id: 20, price: 3.99, image: Drink2, rating: 4.6, reviews: 140 },
    { id: 21, price: 2.99, image: Drink3, rating: 4.4, reviews: 88 }
  ];

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showNotify, setShowNotify] = useState(false);

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      console.warn("Product not found");
    }
  }, [id, navigate]);

  const handleQuantityChange = (type) => {
    if (type === 'minus' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'plus') setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    // ⭐ 加入購物車時，抓取當前語言的標題存入 Context
    // 這樣購物車那邊顯示的就會是當下的語言
    addToCart({ 
        ...product, 
        title: t(`products.${product.id}.title`), 
        quantity: quantity 
    });
    setShowNotify(true);
    setTimeout(() => {
      setShowNotify(false);
    }, 2000);
  };

  if (!product) {
    return <div className="h-screen flex justify-center items-center text-2xl">Loading...</div>;
  }

  // ⭐ 動態取得翻譯內容
  const translatedTitle = t(`products.${product.id}.title`);
  const translatedDesc = t(`products.${product.id}.desc`);

  return (
    <div className="container mx-auto px-4 py-8 mt-20 relative min-h-[60vh] pb-20"> 
      <Notification 
        // ⭐ 通知訊息也翻譯
        message={`${t('detail.added')} ${quantity} x ${translatedTitle}`} 
        isVisible={showNotify} 
      />

      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors font-medium"
      >
        <FaArrowLeft className="mr-2" /> 
        {t('detail.back')} {/* ⭐ 翻譯 "Back to Menu" */}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* 左側：圖片區 */}
        <div className="w-full h-[400px] bg-yellow-100/30 rounded-3xl flex justify-center items-center shadow-sm relative group">
          <img 
            src={product.image} 
            alt={translatedTitle} 
            className="w-[65%] md:w-[75%] object-contain drop-shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-spin-slow"
          />
        </div>

        {/* 右側：資訊區 */}
        <div className="flex flex-col justify-start space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 font-league">{translatedTitle}</h1>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex text-yellow-400 text-lg">
                {[...Array(5)].map((_, i) => (
                   <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"} />
                ))}
              </div>
              <span className="text-gray-400 text-sm font-medium">({product.reviews} {t('detail.reviews')})</span>
            </div>
            <p className="text-3xl font-bold text-yellow-500">${product.price}</p>
          </div>

          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold mb-2 text-gray-800">{t('detail.about')}</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {translatedDesc}
            </p>
          </div>

          {/* 底部操作區 */}
          <div className="flex items-center space-x-4 pt-4">
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

            <button 
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg shadow-yellow-400/30 hover:shadow-xl hover:shadow-yellow-400/40 transition-all transform hover:-translate-y-1 active:scale-95"
              onClick={handleAddToCart}
            >
              {t('detail.order')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;