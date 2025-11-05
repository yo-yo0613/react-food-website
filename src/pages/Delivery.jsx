import React from 'react'
import { motion } from 'framer-motion'
import { SlideUp } from '../components/Hero/Hero'
import { BiPackage, BiTime, BiMap, BiCurrentLocation } from 'react-icons/bi'

const topFeatures = [
  { id: 1, icon: <BiPackage className="text-2xl" />, title: 'Packaging', label: 'Secure' },
  { id: 2, icon: <BiTime className="text-2xl" />, title: 'Speed', label: 'Fast' },
  { id: 3, icon: <BiMap className="text-2xl" />, title: 'Tracking', label: 'Live' },
  { id: 4, icon: <BiCurrentLocation className="text-2xl" />, title: 'Coverage', label: 'Wide' }
]

const trackingSteps = [
  { id: 1, title: 'Order Confirmed', desc: 'Your order has been received' },
  { id: 2, title: 'Preparing', desc: 'Cooking and packing' },
  { id: 3, title: 'Out for Delivery', desc: 'Driver on the way' },
  { id: 4, title: 'Arriving', desc: 'Arriving soon' },
  { id: 5, title: 'Delivered', desc: 'Enjoy your meal' }
]

const serviceCards = [
  { id: 1, icon: <BiTime className="text-4xl text-gray-700" />, title: 'Fast Service', desc: 'We deliver quickly and reliably' },
  { id: 2, icon: <BiMap className="text-4xl text-gray-700" />, title: 'Wide Reach', desc: 'Coverage across major neighborhoods' },
  { id: 3, icon: <BiPackage className="text-4xl text-gray-700" />, title: 'Safe Packing', desc: 'Food packaged for freshness' }
]

function TopFeature({ icon, title, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-yellow-100 w-14 h-14 flex items-center justify-center border border-gray-300 shadow-sm">
        {icon}
      </div>
      <div className="mt-3">
        <div className="w-12 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-sm text-gray-700"> </div>
      </div>
      <div className="mt-4 text-center">
        <div className="h-2 w-24 bg-gray-300 rounded-full mx-auto mb-2"></div>
        <div className="h-2 w-36 bg-gray-200 rounded-full mx-auto"></div>
      </div>
    </div>
  )
}

function TrackingStep({ title, desc, checked }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-md p-3 border border-gray-200">
      <input type="checkbox" checked={checked} readOnly className="w-5 h-5 rounded-sm border-gray-300" />
      <div>
        <div className="h-3 w-36 bg-gray-300 rounded-md mb-2"></div>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  )
}

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="rounded-full bg-yellow-100 w-16 h-16 flex items-center justify-center border border-gray-300">{icon}</div>
      </div>
      <div className="h-3 w-28 bg-gray-300 rounded-md mx-auto mb-3"></div>
      <div className="h-2 w-48 bg-gray-200 rounded-md mx-auto"></div>
    </div>
  )
}

export default function Delivery() {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Top features row (wireframe 1) */}
      <motion.div variants={SlideUp(0.1)} initial="hidden" whileInView="show" className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-20">
        {topFeatures.map(f => (
          <TopFeature key={f.id} {...f} />
        ))}
      </motion.div>

      {/* Middle section: left big square + right list (wireframe 2) */}
      <motion.div variants={SlideUp(0.15)} initial="hidden" whileInView="show" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
        {/* Left big grey square */}
        <div className="w-full rounded-lg bg-gray-100 h-[520px] border border-gray-300 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-300 mx-auto"></div>
            </div>
            <div className="h-3 w-36 bg-gray-300 rounded-md mx-auto mb-2"></div>
            <div className="h-3 w-24 bg-gray-200 rounded-md mx-auto"></div>
          </div>
        </div>

        {/* Right list with search box + rounded items */}
        <div className="w-full">
          <div className="mb-6">
            <div className="w-96 h-10 border border-gray-300 rounded-md mx-auto"></div>
          </div>
          <div className="space-y-4">
            {trackingSteps.map((s, i) => (
              <div key={s.id} className="bg-yellow-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-4">
                  <input type="checkbox" className="w-5 h-5 rounded-sm border-gray-300" checked={i < 2} readOnly />
                  <div className="flex-1">
                    <div className="h-3 w-48 bg-gray-300 rounded-md mb-2"></div>
                    <div className="h-2 w-80 bg-gray-200 rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom service cards (wireframe 3) */}
      <motion.div variants={SlideUp(0.2)} initial="hidden" whileInView="show" className="bg-yellow-50 py-16 -mx-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <div className="w-72 h-10 border border-gray-300 rounded-md mx-auto mb-6"></div>
            <div className="h-3 w-3/4 bg-gray-200 rounded-md mx-auto mb-2"></div>
            <div className="h-3 w-2/3 bg-gray-200 rounded-md mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCards.map(c => (
              <ServiceCard key={c.id} {...c} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
