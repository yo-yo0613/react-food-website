import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import FoodPng from "../../assets/food/food.png";
import Spoon from "../../assets/food/spoon.png";
import Banana from "../../assets/food/banana2.png";
import Leaf from "../../assets/food/leaf.png";
import { IoCartOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

export const SlideUp = (delay) => {
    return {
        hidden: {
            y: "100%",
            opacity: 0
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                delay: delay
            }
        }
    }
}

function Hero() {
  const navigate = useNavigate();

  return (
    <main className="relative overflow-hidden">
        {/* Background yellow */}
        {/* ⭐ 修改 1：只改這裡的 className */}
        {/* 手機版：w-[200px] h-[200px] (變小) */}
        {/* 電腦版 (md:)：回到原本的 w-[900px] h-[900px] (維持原樣) */}
        <motion.div 
            initial={{ opacity: 0, rotate: 20, x: 100, y: 50}}
            animate={{ opacity: 1, rotate: 0, x: 0, y: 0}}
            transition={{ duration: 1, ease: "easeOut" }}
            className='
                w-[200px] h-[200px] top-[-5%] right-[-5%] rounded-[40px]
                md:w-[900px] md:h-[900px] md:rounded-[80px] md:top-[-15%] md:right-[-15%] 
                bg-lightYellow absolute 
                -z-10 transform-gpu'
        >
        </motion.div>

        <div className='container min-h-[600px] flex justify-center relative'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 place-items-center justify-between">
                {/* text content here */}
                <div className='space-y-3 mt-14 text-center md:text-left md:mt-0'>
                    <motion.h1 
                        variants={SlideUp(0.5)} 
                        initial="hidden"
                        whileInView="show"
                        className='relative text-5xl lg:text-7xl xl:text-8xl font-bold uppercase text-outline text-transparent'>
                        Yummy
                        <img src={Leaf} alt="" className='absolute w-[50px] top-0 right-0 md:right-[100px]'/>
                    </motion.h1>
                    <motion.h1 
                        variants={SlideUp(1)} 
                        initial="hidden"
                        whileInView="show"
                        className='text-5xl lg:text-7xl xl:text-8xl font-bold uppercase'>
                        BREAKFAST
                    </motion.h1>
                    <motion.p 
                        variants={SlideUp(1.5)} 
                        initial="hidden"
                        whileInView="show"
                        className='text-sm'>
                        Freshly made, lighter and cleaner—fuel your day from the first bite
                        —pure flavor you can trust.
                    </motion.p>
                    
                    <motion.button 
                        variants={SlideUp(2)} 
                        initial="hidden"
                        whileInView="show"
                        onClick={() => navigate(`/order/1`)} 
                        className='btn-primary inline-block !mt-10 transition-shadow'>
                        <IoCartOutline className='inline mr-2'/>
                        Order Now
                    </motion.button>

                </div>
                {/* Images here */}
                <div className='relative'>
                    <motion.img 
                        initial={{opacity: 0, rotate: 20, x: 200, y:100}}
                        whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0}}
                        transition={{ duration: 0.8 }}
                        src={FoodPng} alt="" className='w-[450px] img-shadow'/>
                    <motion.img 
                        initial={{opacity: 0, rotate: 120, x: 200, y:100}}
                        whileInView={{ opacity: 1, rotate: 75, x: 0, y: 0}}
                        transition={{ duration: 0.8 }}
                        src={Spoon} alt="" className='w-[350px] absolute bottom-[-120px] -left-16 rotate-[75deg] img-shadow'/>
                    <motion.img 
                        initial={{opacity: 0, rotate: 20, x: 200, y:100}}
                        whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0}}
                        transition={{ duration: 0.8 }}
                        src={Banana} alt="" className='w-[400px] absolute top-[-30px] right-[-130px] md:right-[-160px] img-shadow'/>
                </div>
            </div>
        </div>

        {/* Background yellow */}
        {/* ⭐ 修改 2：只改這裡的 className */}
        {/* 手機版：hidden (直接隱藏，才不會讓手機版面變寬) */}
        {/* 電腦版 (md:)：block (顯示出來，維持原本設計) */}
        <motion.div 
            initial={{ opacity: 0, rotate: 60, x: 200, y: 100}}
            whileInView={{ opacity: 1, rotate: 40, x: 0, y: 0}}
            className='
                hidden md:block
                w-[2500px] h-[2500px] rounded-3xl 
                bg-lightYellow absolute top-[-30%] left-[75%] 
                z-0'>
        </motion.div>
    </main>
  )
}

export default Hero