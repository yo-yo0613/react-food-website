import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlideUp } from '../components/Hero/Hero'
import Banner from '../components/Banner/Banner'
import { useTranslation } from 'react-i18next'; 

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [menuItems, setMenuItems] = useState([]); // ⭐ 改成空陣列，等待後端資料
  const [loading, setLoading] = useState(true); // ⭐ 加入讀取狀態
  const { t } = useTranslation(); 

  // ⭐ 新增：向後端請求資料
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('https://food-backend-ehke.onrender.com/api/products');
        const data = await response.json();
        setMenuItems(data); // 把後端回傳的 List<Product> 存進去
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // 分類按鈕 (保留翻譯)
  const categories = [
    { id: 'all', name: t('menu.cat.all') },
    { id: 'breakfast', name: t('menu.cat.breakfast') },
    { id: 'lunch', name: t('menu.cat.lunch') },
    { id: 'dinner', name: t('menu.cat.dinner') },
    { id: 'desserts', name: t('menu.cat.desserts') },
    { id: 'drinks', name: t('menu.cat.drinks') }
  ]

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <motion.div variants={SlideUp(0.1)} initial="hidden" whileInView="show" className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-league">{t('menu.title')}</h1>
        <div className="w-24 h-1 bg-gray-800 mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">{t('menu.subtitle')}</p>
      </motion.div>

      {/* 分類按鈕區 */}
      <motion.div variants={SlideUp(0.2)} initial="hidden" whileInView="show" className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-2 md:px-8 md:py-3 rounded-full transition-all font-medium text-sm md:text-base ${
              activeCategory === category.id
                ? 'bg-yellow-400 text-black shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black'
            }`}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* 商品列表區 */}
      <div className="min-h-[300px]">
        {loading ? (
           <p className="text-center text-2xl font-bold text-gray-400 animate-pulse">Loading delicious food...</p>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <motion.div
                            layout
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className='group bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-xl transition-shadow border border-gray-100'
                        >
                            <div className="flex items-center gap-4 mb-4">
                                {/* ⭐ 圖片來源改為後端路徑 (它會自動去 public/images 找) */}
                                <img
                                    src={item.img} 
                                    alt={item.name}
                                    className='w-24 h-24 rounded-full object-cover shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500'
                                />
                                <div>
                                    {/* ⭐ 這裡暫時直接顯示後端傳來的英文，若要翻譯需在後端改傳 Key */}
                                    <h3 className='text-xl font-bold font-league text-gray-800'>{item.name}</h3>
                                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full uppercase font-bold tracking-wider">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                            
                            <p className='text-gray-500 text-sm mb-4 flex-1 line-clamp-2'>
                                {item.description}
                            </p>
                            
                            <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-100'>
                                <p className='text-2xl font-bold text-yellow-500'>${item.price}</p>
                                <a 
                                    href={`/order/${item.id}`} 
                                    className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                                >
                                    {t('menu.view')}
                                </a>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="col-span-full text-center py-20 text-gray-400"
                    >
                        <p className="text-xl">{t('menu.no_item')}</p>
                    </motion.div>
                )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <div className="mt-24">
        <Banner/>
      </div>
    </div>
  )
}