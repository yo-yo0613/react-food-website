// src/pages/Menu.jsx
import React, { useState } from 'react'
import Food1 from '../assets/food/food.png'
import Food2 from '../assets/food/food2-plate.png'
import Food3 from '../assets/food/banner.png'
import { motion, AnimatePresence } from 'framer-motion'
import { SlideUp } from '../components/Hero/Hero'
import LatestDessert from '../components/LatesetDessert/LatestDessert'
import Banner from '../components/Banner/Banner'

const categories = [
  { id: 'all', name: 'All' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'lunch', name: 'Lunch' },
  { id: 'dinner', name: 'Dinner' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' }
]

const menuItems = [
  // Breakfast
  { id: 1, name: 'Breakfast Special', description: 'Fresh eggs, bacon, toast, and seasonal fruits', img: Food1, price: '12.99', category: 'breakfast', delay: 0.1 },
  { id: 4, name: 'Sweet Pancakes', description: 'Fluffy pancakes with maple syrup', img: Food1, price: '9.99', category: 'breakfast', delay: 0.2 },
  
  // Lunch
  { id: 2, name: 'Lunch Combo', description: 'Grilled chicken with fresh salad and soup', img: Food2, price: '15.99', category: 'lunch', delay: 0.1 },
  { id: 5, name: 'Fresh Salad', description: 'Mixed greens with house dressing', img: Food2, price: '8.99', category: 'lunch', delay: 0.2 },
  { id: 8, name: 'Veggie Wrap', description: 'Fresh vegetables with hummus', img: Food2, price: '10.99', category: 'lunch', delay: 0.3 },
  { id: 12, name: 'Caesar Salad', description: 'Romaine lettuce with Caesar dressing', img: Food3, price: '11.99', category: 'lunch', delay: 0.4 },

  // Dinner
  { id: 3, name: 'Dinner Delight', description: 'Premium steak with roasted vegetables', img: Food3, price: '24.99', category: 'dinner', delay: 0.1 },
  { id: 9, name: 'Fish Tacos', description: 'Grilled fish with fresh salsa', img: Food3, price: '13.99', category: 'dinner', delay: 0.2 },
  { id: 11, name: 'Pasta Carbonara', description: 'Classic Italian pasta with cream sauce', img: Food2, price: '16.99', category: 'dinner', delay: 0.3 },

  // Desserts
  { id: 6, name: 'Chocolate Cake', description: 'Rich chocolate layer cake', img: Food3, price: '6.99', category: 'desserts', delay: 0.1 },
  { id: 10, name: 'Ice Cream Sundae', description: 'Vanilla ice cream with toppings', img: Food1, price: '7.99', category: 'desserts', delay: 0.2 },

  // Drinks
  { id: 7, name: 'Fruit Smoothie', description: 'Blend of fresh seasonal fruits', img: Food1, price: '5.99', category: 'drinks', delay: 0.1 },
]

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all')

  // ⭐ 核心邏輯：根據分類篩選資料
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      {/* Header Section */}
      <motion.div
        variants={SlideUp(0.1)}
        initial="hidden"
        whileInView="show"
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-league">Our Menu</h1>
        <div className="w-24 h-1 bg-gray-800 mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our carefully crafted menu, featuring fresh ingredients 
          and delicious combinations for every taste.
        </p>
      </motion.div>

      {/* Category Buttons */}
      <motion.div
        variants={SlideUp(0.2)}
        initial="hidden"
        whileInView="show"
        className="flex flex-wrap justify-center gap-4 mb-16"
      >
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

      {/* ⭐ 這裡改用單一區域顯示篩選結果，並加上動畫 */}
      <motion.div 
        layout 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode='popLayout'>
            {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                    // 這裡我們直接展開 LatestDessert 的卡片結構，因為這樣比較好控制 Grid
                    // 或者你可以繼續用 LatestDessert 但要確保它能接受陣列並正確排版
                    // 為了排版穩定，建議直接在這裡渲染卡片：
                    
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
                                href={`/order/${item.id}`} // 使用 a tag 或 Link 都可以
                                className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                            >
                                View Detail
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
                    <p className="text-xl">No items found in this category.</p>
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