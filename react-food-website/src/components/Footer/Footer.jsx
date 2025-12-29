import React from 'react'
import Logo from "../../assets/food/logo.png";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{opacity: 1 }}
        transition={{ duration: 1}}
        className='bg-lightYellow rounded-t-3xl'
    >
        <div className='container py-14'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* brand info */}
                <div className='space-y-3 lg:max-w-[300px'> 
                    <img src={Logo} alt="" className='w-24'/>
                    <p>
                        Bringing people together through great taste and fresh ingredients.  
                        Visit us or order online to enjoy your favorite dishes anytime.
                    </p>
                    <a 
                      href="mailto:chengyouli37@gmail.com" 
                      className='inline-block mt-6 text-sm hover:text-darkGreen transition-colors'
                      aria-label="Send us an email"
                    >
                        chengyouli37@gmail.com
                    </a>
                </div>
                {/* Quick Links */}
                <div className='col-span-2 grid grid-cols-2 
                md:grid-cols-3 gap-6'>
                    <div>
                        <h1 className='text-xl font-semibold'>Quick Links</h1>
                        <ul className='space-y-3 mt-6'>
                            <li className='footer-link'><Link to='/'>Home</Link></li>
                            <li className='footer-link'><Link to='/about'>About</Link></li>
                            <li className='footer-link'><Link to='/contact'>Contact</Link></li>
                            <li className='footer-link'><Link to='/menu'>Menu</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h1 className='text-xl font-semibold'>Our Services</h1>
                        <ul className='space-y-3 mt-6'>
                            <li className='footer-link'><Link to='/order'>Online Order</Link></li>
                            <li className='footer-link'><Link to='/reservation'>Reservation</Link></li>
                            <li className='footer-link'><Link to='/delivery'>Delivery</Link></li>
                            <li className='footer-link'><Link to='/catering'>Catering</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h1 className='text-xl font-semibold'>Follow Us</h1>
                        <ul className='space-y-3 mt-6 gap-4'>
                            <a 
                              href="https://facebook.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className='footer-link hover:text-darkGreen transition-colors'
                              aria-label="Visit our Facebook page"
                            >
                              <i className='fab fa-facebook text-xl'></i>
                            </a>
                            <br />
                            <a 
                              href="https://instagram.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className='footer-link hover:text-darkGreen transition-colors'
                              aria-label="Visit our Instagram page"
                            >
                              <i className='fab fa-instagram text-xl'></i>
                            </a>
                            <br />
                            <a 
                              href="https://twitter.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className='footer-link hover:text-darkGreen transition-colors'
                              aria-label="Visit our Twitter page"
                            >
                              <i className='fab fa-twitter text-xl'></i>
                            </a>
                            <br />
                            <a 
                              href="https://youtube.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className='footer-link hover:text-darkGreen transition-colors'
                              aria-label="Visit our YouTube channel"
                            >
                              <i className='fab fa-youtube text-xl'></i>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </motion.footer>
  )
}

export default Footer