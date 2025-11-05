import React, { useState } from 'react'
import Logo from "../../assets/food/logo.png";
import { IoCarOutline } from 'react-icons/io5';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { animate, m, motion } from "framer-motion";
import { Link } from 'react-router-dom'

const NavMenu = [
    {
        id : 1,
        title: "Home",
        path: "/",
        delay: 0.1
    },
    {
        id : 2,
        title: "About",
        path: "/about",
        delay: 0.2
    },
    {
        id : 3,
        title: "Menu",
        path: "/menu",
        delay: 0.3
    },
    {
        id : 4,
        title: "Delivery",
        path: "/delivery",
        delay: 0.4
    },
    {
        id: 5,
        title: "Contact Us",
        path: "/contact",
        delay: 0.5
    },
];

const SlideDown = (delay) => {
    return {
        initial: {
            y: "-100%",
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                delay: delay,
            }
        }
    }
};

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='container flex justify-between
    items-center font-league relative'>
        {/* logo section */}
        <motion.img 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5}}
        src={Logo} alt="" className='w-36'/>
        
        {/* desktop menu section */}
        <div className='hidden md:block'>
            <ul className='flex gap-6'>
                {
                    NavMenu.map((menu) => {
                        return (
                            <motion.li 
                            variants={SlideDown(menu.delay)}
                            initial="initial"
                            animate="animate"
                            key={menu.id} className='nav-menu'
                            data-delay={menu.delay}>
                                <Link to={menu.path}
                                className='inline-block px-2 py-2
                                text-2xl'>
                                    {menu.title}
                                </Link>
                            </motion.li>
                        )
                    })
                }
            </ul>
        </div>

        {/* mobile menu button */}
        <div className='md:hidden'>
            <button onClick={toggleMenu} className='h-[40px] w-[40px] grid
            place-items-center rounded-full text-dark text-2xl'>
                {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
            </button>
        </div>

        {/* mobile menu */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : -20
            }}
            transition={{ duration: 0.3 }}
            className={`${isMenuOpen ? 'flex' : 'hidden'} 
            absolute top-full left-0 right-0 bg-white shadow-lg
            flex-col w-full mt-2 py-4 rounded-lg md:hidden z-50`}
        >
            {
                NavMenu.map((menu) => (
                    <Link 
                        key={menu.id}
                        to={menu.path}
                        onClick={toggleMenu}
                        className='px-6 py-2 text-xl hover:bg-gray-100'
                    >
                        {menu.title}
                    </Link>
                ))
            }
        </motion.div>

        {/* button section */}
        <motion.div variants={SlideDown(1)}
        initial="initial" animate="animate"
        className='hidden md:block'>
            <button className='h-[40px] w-[40px] grid
            place-items-center rounded-full text-white
            bg-dark'>
                <IoCarOutline />
            </button>
        </motion.div>
    </div>
  )
}

export default Navbar