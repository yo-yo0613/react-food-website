import React, { useState } from 'react'
import Food1 from '../assets/food/food.png'
import Food2 from '../assets/food/food2-plate.png'
import Food3 from '../assets/food/banner.png'
import { motion } from 'framer-motion'
import { SlideUp } from '../components/Hero/Hero'
import HotDessert from '../HotDessert/HotDessert'
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
  // First Grid
  {
    id: 1,
    name: 'Breakfast Special',
    description: 'Fresh eggs, bacon, toast, and seasonal fruits',
    img: Food1,
    price: '12.99',
    category: 'breakfast',
    delay: 0.2
  },
  {
    id: 2,
    name: 'Lunch Combo',
    description: 'Grilled chicken with fresh salad and soup',
    img: Food2,
    price: '15.99',
    category: 'lunch',
    delay: 0.3
  },
  {
    id: 3,
    name: 'Dinner Delight',
    description: 'Premium steak with roasted vegetables',
    img: Food3,
    price: '24.99',
    category: 'dinner',
    delay: 0.4
  },
  // Second Grid
  {
    id: 4,
    name: 'Sweet Pancakes',
    description: 'Fluffy pancakes with maple syrup',
    img: Food1,
    price: '9.99',
    category: 'breakfast',
    delay: 0.5
  },
  {
    id: 5,
    name: 'Fresh Salad',
    description: 'Mixed greens with house dressing',
    img: Food2,
    price: '8.99',
    category: 'lunch',
    delay: 0.6
  },
  {
    id: 6,
    name: 'Chocolate Cake',
    description: 'Rich chocolate layer cake',
    img: Food3,
    price: '6.99',
    category: 'desserts',
    delay: 0.7
  },
  // Third Grid
  {
    id: 7,
    name: 'Fruit Smoothie',
    description: 'Blend of fresh seasonal fruits',
    img: Food1,
    price: '5.99',
    category: 'drinks',
    delay: 0.8
  },
  {
    id: 8,
    name: 'Veggie Wrap',
    description: 'Fresh vegetables with hummus',
    img: Food2,
    price: '10.99',
    category: 'lunch',
    delay: 0.9
  },
  {
    id: 9,
    name: 'Fish Tacos',
    description: 'Grilled fish with fresh salsa',
    img: Food3,
    price: '13.99',
    category: 'dinner',
    delay: 1.0
  },
  // Fourth Grid
  {
    id: 10,
    name: 'Ice Cream Sundae',
    description: 'Vanilla ice cream with toppings',
    img: Food1,
    price: '7.99',
    category: 'desserts',
    delay: 1.1
  },
  {
    id: 11,
    name: 'Pasta Carbonara',
    description: 'Classic Italian pasta with cream sauce',
    img: Food2,
    price: '16.99',
    category: 'dinner',
    delay: 1.2
  },
  {
    id: 12,
    name: 'Caesar Salad',
    description: 'Romaine lettuce with Caesar dressing',
    img: Food3,
    price: '11.99',
    category: 'lunch',
    delay: 1.3
  }
]

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <motion.div
        variants={SlideUp(0.1)}
        initial="hidden"
        whileInView="show"
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
        <div className="w-24 h-1 bg-gray-800 mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our carefully crafted menu, featuring fresh ingredients 
          and delicious combinations.
        </p>
      </motion.div>

      {/* Category Buttons */}
      <motion.div
        variants={SlideUp(0.2)}
        initial="hidden"
        whileInView="show"
        className="flex flex-wrap justify-center gap-4 mb-16"
      >
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-8 py-3 rounded-full transition-all ${
              activeCategory === category.id
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      <motion.h3 
        variants={SlideUp(0)}
        initial="hidden"
        whileInView="show"
        className='text-2xl font-semibold 
        text-darkGreen uppercase py-8'>
            Hot Dessert
      </motion.h3>

      {/* First Menu Grid */}
      <LatestDessert items={menuItems} startIndex={0} endIndex={3} />

      {/* Second Menu Grid */}
      <LatestDessert items={menuItems} startIndex={3} endIndex={6} />

      <motion.h3 
        variants={SlideUp(0)}
        initial="hidden"
        whileInView="show"
        className='text-2xl font-semibold 
        text-darkGreen uppercase py-8'>
            Latest Dessert
      </motion.h3>

      {/* Third Menu Grid */}
      <LatestDessert items={menuItems} startIndex={6} endIndex={9} />

      {/* Fourth Menu Grid */}
      <LatestDessert items={menuItems} startIndex={9} endIndex={12} />

      <Banner/>
    </div>
  )
}
