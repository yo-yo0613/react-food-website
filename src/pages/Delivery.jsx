import React from 'react'
import { motion } from 'framer-motion'
import { SlideUp } from '../components/Hero/Hero'
import { 
  BiPackage, 
  BiTime, 
  BiMap, 
  BiCurrentLocation, 
  BiCheckCircle,
  BiReceipt,
  BiDish,
  BiCycling,
  BiHomeAlt,
  BiHeart
} from 'react-icons/bi'

const topFeatures = [
  { 
    id: 1, 
    icon: <BiPackage className="text-3xl" />, 
    title: 'Secure Packaging', 
    label: 'Safe', 
    description: 'Food sealed in temperature-controlled containers'
  },
  { 
    id: 2, 
    icon: <BiTime className="text-3xl" />, 
    title: 'Fast Delivery', 
    label: '30min', 
    description: 'Average delivery time under 30 minutes'
  },
  { 
    id: 3, 
    icon: <BiMap className="text-3xl" />, 
    title: 'Real-time Tracking', 
    label: 'Live', 
    description: 'Track your order from kitchen to doorstep'
  },
  { 
    id: 4, 
    icon: <BiCurrentLocation className="text-3xl" />, 
    title: 'Wide Coverage', 
    label: '5mi', 
    description: 'Serving all areas within 5-mile radius'
  }
]

const trackingSteps = [
  { 
    id: 1, 
    icon: <BiReceipt className="text-xl" />,
    title: 'Order Confirmed', 
    desc: "We've received your order #12345",
    time: '12:30 PM',
    isComplete: true
  },
  { 
    id: 2, 
    icon: <BiDish className="text-xl" />,
    title: 'Preparing Your Food', 
    desc: 'Our chefs are cooking your dishes',
    time: '12:35 PM',
    isComplete: true
  },
  { 
    id: 3, 
    icon: <BiPackage className="text-xl" />,
    title: 'Quality Check & Packing', 
    desc: 'Ensuring everything is perfect',
    time: '12:45 PM',
    isActive: true
  },
  { 
    id: 4, 
    icon: <BiCycling className="text-xl" />,
    title: 'Out for Delivery', 
    desc: 'Your food is on the way',
    time: 'Expected 1:00 PM'
  },
  { 
    id: 5, 
    icon: <BiHomeAlt className="text-xl" />,
    title: 'Delivered', 
    desc: 'Enjoy your meal!',
    time: 'Expected 1:15 PM'
  }
]

const serviceCards = [
  { 
    id: 1, 
    icon: <BiTime className="text-4xl text-gray-700" />, 
    title: "Express Delivery", 
    desc: "Experience lightning-fast food delivery with our optimized routes and dedicated drivers.",
    features: [
      "Average delivery time: 30 minutes",
      "Real-time GPS tracking",
      "Priority handling for hot food"
    ]
  },
  { 
    id: 2, 
    icon: <BiMap className="text-4xl text-gray-700" />, 
    title: "Service Areas", 
    desc: "We cover all major neighborhoods in the city with reliable and consistent service.",
    features: [
      "5-mile radius coverage",
      "No minimum order in central areas",
      "Special events catering citywide"
    ]
  },
  { 
    id: 3, 
    icon: <BiPackage className="text-4xl text-gray-700" />, 
    title: "Quality Guarantee", 
    desc: "Your food arrives fresh and at the perfect temperature, just as it left our kitchen.",
    features: [
      "Temperature-controlled containers",
      "Sealed packaging for safety",
      "Satisfaction guaranteed"
    ]
  }
]

function TopFeature({ icon, title, label, description }) {
  return (
    <motion.div 
      className="flex flex-col items-center group"
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { y: 0 },
        hover: { y: -4 }
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="rounded-full bg-yellow-100 w-16 h-16 flex items-center justify-center border border-yellow-200 shadow-sm group-hover:bg-yellow-200 group-hover:scale-110 transition-all duration-300"
        variants={{
          initial: { rotate: 0 },
          hover: { rotate: [0, -10, 10, -10, 0] }
        }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-gray-700">{icon}</span>
      </motion.div>
      <div className="mt-3">
        <span className="px-3 py-1 rounded-full bg-yellow-500 text-white text-sm font-medium">
          {label}
        </span>
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </motion.div>
  )
}

function TrackingStep({ title, desc, icon, isActive, isComplete }) {
  return (
    <motion.div 
      className={`flex items-center gap-4 rounded-lg p-4 transition-colors ${
        isActive ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-200'
      } border`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
        isComplete ? 'bg-green-100 border-green-200' : 
        isActive ? 'bg-yellow-100 border-yellow-200' : 
        'bg-gray-100 border-gray-200'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className={`font-medium ${
            isActive ? 'text-yellow-800' : 'text-gray-900'
          }`}>{title}</h3>
          {isComplete && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-green-500"
            >
              <BiCheckCircle className="text-xl" />
            </motion.div>
          )}
        </div>
        <p className={`text-sm ${
          isActive ? 'text-yellow-700' : 'text-gray-500'
        }`}>{desc}</p>
      </div>
    </motion.div>
  )
}

function ServiceCard({ icon, title, desc, features }) {
  return (
    <motion.div 
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="flex items-center justify-center mb-6"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="rounded-full bg-yellow-100 w-20 h-20 flex items-center justify-center border border-yellow-200 shadow-sm">
          {icon}
        </div>
      </motion.div>
      <h3 className="text-xl font-medium text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{desc}</p>
      {features && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-500">
              <BiCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

export default function Delivery() {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Top features row */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        {topFeatures.map(f => (
          <motion.div
            key={f.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <TopFeature {...f} />
          </motion.div>
        ))}
      </motion.div>

      {/* Middle section: delivery map + tracking */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3
            }
          }
        }}
      >
        {/* Left: Interactive delivery map */}
        <div className="w-full rounded-xl bg-white border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-medium text-gray-900 mb-2">Live Delivery Map</h2>
            <p className="text-gray-500">Track your order in real-time on our interactive map</p>
          </div>
          <div className="aspect-[4/3] relative bg-gray-50">
            <iframe
              src="https://www.google.com/maps/embed?pb=your-map-embed-url"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Delivery Area Map"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center max-w-sm mx-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <BiCurrentLocation className="text-4xl text-yellow-500 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Delivery Coverage</h3>
                <p className="text-gray-600">We deliver to all areas within a 5-mile radius of our restaurant</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right: Order tracking */}
        <div className="w-full">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Order Status</h2>
              <div className="flex items-center text-gray-500 gap-2">
                <BiTime className="text-xl" />
                <span>Estimated delivery time: 1:15 PM</span>
              </div>
            </div>
            <div className="p-6">
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  {trackingSteps.map((step) => (
                    <TrackingStep key={step.id} {...step} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom service cards section */}
      <motion.div 
        className="bg-yellow-50 py-16 -mx-6 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.1
            }
          }
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="mb-12 text-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <motion.div 
              className="inline-block px-4 py-1 bg-yellow-200 rounded-full text-yellow-700 text-sm font-medium mb-4"
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: -10 },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300
                  }
                }
              }}
            >
              Our Delivery Promise
            </motion.div>
            <motion.h2 
              className="text-3xl font-medium text-gray-900 mb-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.1 }
                }
              }}
            >
              Fast, Safe & Reliable Delivery
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2 }
                }
              }}
            >
              Experience our premium delivery service with real-time tracking and temperature-controlled packaging
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.3,
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {serviceCards.map((c, index) => (
              <motion.div
                key={c.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 24
                    }
                  }
                }}
              >
                <ServiceCard {...c} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
