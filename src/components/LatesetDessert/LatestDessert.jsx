import React from 'react';
import Food1 from "../../assets/food/food.png";
import Food2 from "../../assets/food/food2-plate.png";
import Food3 from "../../assets/food/banner.png";
import { delay, motion } from 'framer-motion';
import { SlideUp } from '../Hero/Hero';
import { div } from 'framer-motion/client';

const HotDessertData = [
    {
        id: 1,
        name: "HodDessert",
        img: Food1,
        price: "$5.99",
        delay: 0.4
    },
    {
        id: 2,
        name: "HodCake",
        img: Food2,
        price: "$5.00",
        delay: 0.8
    },
    {
        id: 3,
        name: "HodCake",
        img: Food3,
        price: "$5.00",
        delay: 1.2
    },
];

function LatestDessert({ items = HotDessertData, startIndex = 0, endIndex = 3 }) {
  return (
    <section>
        <div className='container py-12'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
            gap-6'>
                {items.slice(startIndex, endIndex).map((item) => {
                    return (
                        <>
                            <motion.div 
                            variants={SlideUp(item.delay)}
                            initial="hidden"
                            whileInView="show"
                            className='group bg-white/50 shadow-md 
                            p-4 flex items-start gap-4'>
                                <img 
                                    src={item.img} 
                                    alt="" 
                                    className='w-24 rounded-full img-shadow 
                                    group-hover: scale-125 transition-all 
                                    duration-700 group-hover: rotate-[50deg]'
                                />
                                <div className="flex-1">
                                    <h3 className='text-xl font-semibold'>{item.name}</h3>
                                    {item.description && (
                                        <p className='text-gray-600 text-sm mt-1 mb-2'>{item.description}</p>
                                    )}
                                    <div className='flex items-center justify-between w-full space-x-8 mt-2'>
                                        <p className='text-xl text-yellow-500'>${item.price}</p>
                                        <button className="btn-primary">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </motion.div> 
                        </>
                    );
                })}
            </div>
        </div>
    </section>
  )
}

export default LatestDessert