import React from 'react'
import { motion } from 'framer-motion'
import { SlideUp } from '../components/Hero/Hero'
import { IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5'

const contactCards = [
  {
    id: 1,
    icon: <IoLocationOutline className="text-4xl" />,
    title: "Location",
    details: [
      "123 Foodie Street",
      "Taipei City, Taiwan"
    ],
    delay: 0.2
  },
  {
    id: 2,
    icon: <IoCallOutline className="text-4xl" />,
    title: "Contact",
    details: [
      "+886 123 456 789",
      "+886 987 654 321"
    ],
    delay: 0.4
  },
  {
    id: 3,
    icon: <IoMailOutline className="text-4xl" />,
    title: "Email",
    details: [
      "info@foodies.com",
      "support@foodies.com"
    ],
    delay: 0.6
  }
]

const teamMembers = [
  {
    id: 1,
    name: "陳小明",
    role: "Head Chef",
    delay: 0.3
  },
  {
    id: 2,
    name: "王美麗",
    role: "Pastry Chef",
    delay: 0.4
  },
  {
    id: 3,
    name: "林大文",
    role: "Kitchen Manager",
    delay: 0.5
  },
  {
    id: 4,
    name: "張小華",
    role: "Service Manager",
    delay: 0.6
  }
]

function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <motion.div 
        variants={SlideUp(0.1)}
        initial="hidden"
        whileInView="show"
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Have questions about our menu, services, or want to join our team? 
          We're here to help!
        </p>
      </motion.div>

      {/* Contact Cards - Yellow Circle Background */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {contactCards.map(card => (
          <motion.div
            key={card.id}
            variants={SlideUp(card.delay)}
            initial="hidden"
            whileInView="show"
            className="bg-lightYellow rounded-2xl p-8 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full 
            flex items-center justify-center shadow-md">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{card.title}</h3>
            {card.details.map((detail, index) => (
              <p key={index} className="text-gray-700 mb-2">{detail}</p>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Team Section */}
      <motion.h2 
        variants={SlideUp(0.2)}
        initial="hidden"
        whileInView="show"
        className="text-3xl font-bold text-center mb-12"
      >
        Meet Our Team
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {teamMembers.map(member => (
          <motion.div
            key={member.id}
            variants={SlideUp(member.delay)}
            initial="hidden"
            whileInView="show"
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-4 
            flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
            <h4 className="font-bold text-lg mb-1">{member.name}</h4>
            <p className="text-gray-600">{member.role}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div
        variants={SlideUp(0.3)}
        initial="hidden"
        whileInView="show"
        className="mt-20 max-w-xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-center mb-8">Send Us a Message</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none 
              focus:ring-2 focus:ring-darkGreen"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none 
              focus:ring-2 focus:ring-darkGreen"
            />
          </div>
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none 
            focus:ring-2 focus:ring-darkGreen"
          ></textarea>
          <button 
            type="submit"
            className="w-full bg-darkGreen text-white py-4 rounded-lg 
            hover:bg-opacity-90 transition-colors font-semibold text-lg"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default About