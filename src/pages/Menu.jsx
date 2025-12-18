// src/pages/Menu.jsx
import React, { useState } from 'react'
import Food1 from '../assets/food/food.png'
import Food2 from '../assets/food/food2-plate.png'
import Food3 from '../assets/food/banner.png'
import { motion, AnimatePresence } from 'framer-motion'
import { SlideUp } from '../components/Hero/Hero'
import Banner from '../components/Banner/Banner'
import { useTranslation } from 'react-i18next'; // ⭐ 1. 引入翻譯 hook

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { t } = useTranslation(); // ⭐ 2. 使用 hook

  // ⭐ 3. 將 menuItems 移入並使用翻譯 key
  const menuItems = [
    { id: 1, name: t('menu.items.breakfast_special.name'), description: t('menu.items.breakfast_special.desc'), img: Food1, price: '12.99', category: 'breakfast' },
    { id: 4, name: t('menu.items.sweet_pancakes.name'), description: t('menu.items.sweet_pancakes.desc'), img: Food1, price: '9.99', category: 'breakfast' },
    
    { id: 2, name: t('menu.items.lunch_combo.name'), description: t('menu.items.lunch_combo.desc'), img: Food2, price: '15.99', category: 'lunch' },
    { id: 5, name: t('menu.items.fresh_salad.name'), description: t('menu.items.fresh_salad.desc'), img: Food2, price: '8.99', category: 'lunch' },
    { id: 8, name: t('menu.items.veggie_wrap.name'), description: t('menu.items.veggie_wrap.desc'), img: Food2, price: '10.99', category: 'lunch' },
    { id: 12, name: t('menu.items.caesar_salad.name'), description: t('menu.items.caesar_salad.desc'), img: Food3, price: '11.99', category: 'lunch' },

    { id: 3, name: t('menu.items.dinner_delight.name'), description: t('menu.items.dinner_delight.desc'), img: Food3, price: '24.99', category: 'dinner' },
    { id: 9, name: t('menu.items.fish_tacos.name'), description: t('menu.items.fish_tacos.desc'), img: Food3, price: '13.99', category: 'dinner' },
    { id: 11, name: t('menu.items.pasta.name'), description: t('menu.items.pasta.desc'), img: Food2, price: '16.99', category: 'dinner' },

    { id: 6, name: t('menu.items.chocolate_cake.name'), description: t('menu.items.chocolate_cake.desc'), img: Food3, price: '6.99', category: 'desserts' },
    { id: 10, name: t('menu.items.ice_cream.name'), description: t('menu.items.ice_cream.desc'), img: Food1, price: '7.99', category: 'desserts' },

    { id: 7, name: t('menu.items.fruit_smoothie.name'), description: t('menu.items.fruit_smoothie.desc'), img: Food1, price: '5.99', category: 'drinks' },
  ];

  // ⭐ 4. 分類按鈕也要翻譯
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
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('menu.subtitle')}
        </p>
      </motion.div>

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
                            <img
                                src={item.img}
                                alt={item.name}
                                className='w-24 h-24 rounded-full object-cover shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500'
                            />
                            <div>
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
                                {t('menu.view')} {/* ⭐ 翻譯 View Detail */}
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

      <div className="mt-24">
        <Banner/>
      </div>
    </div>
  )
}