import { section } from 'framer-motion/client'
import React from 'react'
import { motion } from 'framer-motion'
import { SlideUp } from '../Hero/Hero'
import BannerPng from '../../assets/food/banner.png'

function Testimonial() {
  return (
    <section>
        <div className='container py-24'>
            <div className='grid grid-cols-1 md:grid-cols-2 
            gap-14 place-items-center'>
                
                {/* text content section */}
                <div className='space-y-5 lg:max-w-[400px]'>
                    <motion.p 
                    variants={SlideUp(0.4)}
                    initial="hidden"
                    whileInView="show"
                    className='text-xl font-serif relative z-10'>
                        "Every bite was full of flavor and freshness. 
                        The best dining experience I’ve had in years!”
                    </motion.p>
                    <div className='flex items-center gap-3'>
                        <motion.img 
                        variants={SlideUp(0.8)}
                        inherit="hidden"
                        whileInView="show"
                        src="https://picsum.photos/id/237/200/300" 
                        alt=""
                        className='w-14 h-14 rounded-full object-cover'
                        />
                        <motion.div 
                        variants={SlideUp(1)}
                        inherit="hidden"
                        whileInView="show"
                        className="">
                            <h2 className='text-xl font-bold'>John Doe</h2>
                            <p className='text-sm'>Designation</p>
                        </motion.div>
                    </div>
                </div>

                {/* image section */}
                <div className='relative'>
                    <motion.img 
                    initial={{
                        opacity: 0,
                        x: -100,
                        y: 100
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        y: 0
                    }}
                    whileHover={{
                        scale: 1.2,
                        rotate: 15,
                        x: 50,
                        y: -50
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        scale: { duration: 0.5}
                    }}
                    src={BannerPng} alt="" 
                    className='relative z-10 w-full lg:max-w-[280px] 
                    img-shadow'/>
                    <motion.div 
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className='absolute top-[50%] right-[50%] 
                    transform translate-x-[50%] translate-y-[-50%] 
                    h-[320px] w-[320px] 
                    bg-lightYellow rounded-full'>
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Testimonial