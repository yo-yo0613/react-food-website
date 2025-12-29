import React from 'react';
import { motion } from 'framer-motion';
import { SlideUp } from '../Hero/Hero';
import { useNavigate } from 'react-router-dom'; // 1. 改用 useNavigate

function LatestDessert({ items, startIndex, endIndex }) {
  const navigate = useNavigate(); // 2. 初始化

  const displayItems = items ? items.slice(startIndex, endIndex) : [];

  return (
    <section>
      <div className='container py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {displayItems.map((item) => {
            return (
              <motion.div
                key={item.id}
                variants={SlideUp(item.delay)}
                initial="hidden"
                whileInView="show"
                className='group bg-white/50 shadow-md p-4 flex items-start gap-4 hover:bg-white transition-colors duration-300 rounded-xl'
              >
                <img
                  src={item.img}
                  alt=""
                  className='w-24 rounded-full img-shadow group-hover:scale-125 transition-all duration-700 group-hover:rotate-[50deg]'
                />
                <div className="flex-1">
                  <h3 className='text-xl font-semibold'>{item.name}</h3>
                  {item.description && (
                    <p className='text-gray-600 text-sm mt-1 mb-2 line-clamp-2'>{item.description}</p>
                  )}
                  <div className='flex items-center justify-between w-full mt-2'>
                    <p className='text-xl text-yellow-500 font-bold'>${item.price}</p>
                    {/* 3. 修改按鈕：跳轉到詳情頁 */}
                    <button 
                        onClick={() => navigate(`/order/${item.id}`)} // 請確認你的路由設定是否為 /order/:id
                        className="btn-primary text-sm px-4 py-2"
                    >
                      Buy Now
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