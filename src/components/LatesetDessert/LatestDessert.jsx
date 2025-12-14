// src/components/LatesetDessert/LatestDessert.jsx (或者是你的檔案路徑)
import React from 'react';
import { motion } from 'framer-motion';
import { SlideUp } from '../Hero/Hero';
import { useCart } from '../../contexts/CartContext'; // ⭐ 1. 引入

// 移除你原本的 HotDessertData，因為我們現在是從 props 傳入 items
// 或者如果是 HotDessert.jsx 獨立檔案，則引入 context

function LatestDessert({ items, startIndex, endIndex }) {
  const { addToCart } = useCart(); // ⭐ 2. 取得加入購物車功能

  // 防呆：如果 items 沒傳進來
  const displayItems = items ? items.slice(startIndex, endIndex) : [];

  return (
    <section>
      <div className='container py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {displayItems.map((item) => {
            return (
              <motion.div
                key={item.id} // ⭐ 記得要加 key
                variants={SlideUp(item.delay)}
                initial="hidden"
                whileInView="show"
                className='group bg-white/50 shadow-md p-4 flex items-start gap-4'
              >
                <img
                  src={item.img}
                  alt=""
                  className='w-24 rounded-full img-shadow group-hover:scale-125 transition-all duration-700 group-hover:rotate-[50deg]'
                />
                <div className="flex-1">
                  <h3 className='text-xl font-semibold'>{item.name}</h3>
                  {item.description && (
                    <p className='text-gray-600 text-sm mt-1 mb-2'>{item.description}</p>
                  )}
                  <div className='flex items-center justify-between w-full space-x-8 mt-2'>
                    <p className='text-xl text-yellow-500'>${item.price}</p>
                    {/* ⭐ 3. 修改按鈕 onClick 事件 */}
                    <button 
                        onClick={() => addToCart(item)}
                        className="btn-primary"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LatestDessert;