// src/pages/Contact.jsx

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  IoLocationOutline, IoCallOutline, IoMailOutline, IoTimeOutline, IoCarOutline,
  IoChevronForwardOutline, IoPersonOutline, IoTextOutline, IoChatboxOutline,
  IoCheckmarkCircleOutline, IoChevronDownOutline, IoNavigateOutline,
  IoRestaurantOutline, IoCardOutline, IoHelpCircleOutline
} from 'react-icons/io5'

// ⭐ 1. Import Config (你的 API 網址設定)
import { API_URL } from '../config';

// ⭐ 2. Import Firebase
import { db } from '../firebase/config'
import { ref, push } from 'firebase/database'
import { useAuth } from '../contexts/AuthContext'

// ⭐ 3. Import Map Components
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Custom Icon for Branches
const branchIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', 
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

// Branch Data
const branches = [
    { id: 1, name: "Main Branch (Downtown)", lat: 40.7128, lng: -74.0060, address: "123 Main St, New York, NY" },
    { id: 2, name: "Uptown Branch", lat: 40.7580, lng: -73.9855, address: "456 Uptown Ave, New York, NY" },
    { id: 3, name: "Brooklyn Branch", lat: 40.6782, lng: -73.9442, address: "789 Brooklyn Blvd, NY" }
];

function Contact() {
  const { user } = useAuth();
  
  // Form State
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill email if logged in
  useEffect(() => {
      if (user) {
          setForm(prev => ({ ...prev, email: user.email }));
      }
  }, [user]);

  // FAQ State
  const [openFaqs, setOpenFaqs] = useState([])
  const toggleFaq = (id) => {
    setOpenFaqs(prev => prev.includes(id) ? prev.filter(faqId => faqId !== id) : [...prev, id])
  }

  // Refs
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const subjectRef = useRef(null)
  const messageRef = useRef(null)
  const successRef = useRef(null)

  // Validation
  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name'
    if (!form.email.trim()) errs.email = 'Please enter your email'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Please enter a valid email'
    if (!form.subject.trim()) errs.subject = 'Please enter a subject'
    if (!form.message.trim()) errs.message = 'Please enter a message'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  // ⭐ ⭐ ⭐ 修改後的核心提交邏輯 ⭐ ⭐ ⭐
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    
    if (Object.keys(errs).length > 0) {
      if (errs.name) nameRef.current?.focus()
      else if (errs.email) emailRef.current?.focus()
      else if (errs.subject) subjectRef.current?.focus()
      else if (errs.message) messageRef.current?.focus()
      return
    }

    setIsSubmitting(true);

    try {
        // 準備要傳送的資料
        const messageData = {
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
            userId: user ? user.uid : 'guest'
        };

        // -----------------------------------------------------
        // 動作 1：傳送給 Spring Boot API (PostgreSQL)
        // 使用你的 API_URL 設定
        // -----------------------------------------------------
        const postgresPromise = fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messageData)
        }).then(async res => {
            if (!res.ok) {
                throw new Error('PostgreSQL API Error');
            }
            return res.json();
        });

        // -----------------------------------------------------
        // 動作 2：傳送給 Firebase (Realtime DB)
        // -----------------------------------------------------
        const msgRef = ref(db, 'contact_messages');
        const firebasePromise = push(msgRef, {
            ...messageData,
            createdAt: new Date().toISOString(),
            status: 'unread',
            source: 'website_form'
        });

        // ⭐ 等待兩邊都完成 (雙保險)
        await Promise.all([postgresPromise, firebasePromise]);

        // 成功處理
        setSubmitted(true)
        setTimeout(() => successRef.current?.focus(), 50)
        setForm({ name: '', email: user ? user.email : '', subject: '', message: '' }) 
        setTimeout(() => setSubmitted(false), 3000)

    } catch (error) {
        console.error("Error sending contact message:", error);
        alert("發送失敗，請稍後再試 (請確認後端是否開啟)");
    } finally {
        setIsSubmitting(false);
    }
  }

  // Animation variants
  const containerLeft = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { delayChildren: 0.05, staggerChildren: 0.06 } } }
  const containerRight = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.12 } } }
  const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

  // Static Data
  const faqItems = [
    { id: 'delivery', icon: IoCarOutline, question: 'Do you offer delivery service?', answer: 'Yes! We offer delivery within a 5-mile radius. Orders can be placed through our website or mobile app. Delivery fees vary based on distance.' },
    { id: 'payment', icon: IoCardOutline, question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, debit cards, and digital wallets including Apple Pay and Google Pay. Cash is also accepted for in-store purchases.' },
    { id: 'reservation', icon: IoRestaurantOutline, question: 'How can I make a reservation?', answer: 'Reservations can be made online through our website, by phone, or through popular booking platforms. We recommend booking at least 2 days in advance for weekend dining.' },
    { id: 'allergies', icon: IoHelpCircleOutline, question: 'How do you handle food allergies?', answer: 'We take allergies very seriously. Please inform our staff about any allergies when ordering. We can provide detailed ingredient information and make reasonable accommodations.' }
  ]
  
  const contactCards = [
    { id: 'location', icon: IoLocationOutline, title: 'Our Location', lines: ['123 Main Street', 'New York, NY 10001'], action: { href: 'https://goo.gl/maps/xyz', label: 'Open in Google Maps' } },
    { id: 'phone', icon: IoCallOutline, title: 'Call Us', lines: ['+1 (555) 123-4567', 'Mon–Fri 9:00–18:00'], action: { href: 'tel:+15551234567', label: 'Call us now' } },
    { id: 'email', icon: IoMailOutline, title: 'Email Us', lines: ['hello@restaurant.com', 'We reply within 24h'], action: { href: 'mailto:hello@restaurant.com', label: 'Send us an email' } }
  ]

  const hoursData = {
    title: 'Opening Hours',
    left: ['Monday: 9:00–22:00', 'Tuesday: 9:00–22:00', 'Wednesday: 9:00–22:00', 'Thursday: 9:00–22:00'],
    right: ['Friday: 9:00–23:00', 'Saturday: 10:00–23:00', 'Sunday: 10:00–22:00', 'Kitchen closes 30min earlier']
  }

  return (
    <div className="min-h-screen bg-[#fffaf6] py-12">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div className="flex flex-col items-center" variants={item} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <div className="border border-gray-700 rounded-md px-6 py-1 w-48 text-center text-sm">Contact</div>
          <div className="mt-4 h-2 w-80 bg-gray-200 rounded-full"></div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          
          {/* Left: Contact Form */}
          <motion.form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm" variants={containerLeft}>
            <motion.div className="space-y-2" variants={item}>
              <h2 className="text-2xl font-medium text-gray-900">Send us a message</h2>
              <p className="text-gray-500">Got questions about our menu or services? We'd love to hear from you.</p>
            </motion.div>
            
            <div className="space-y-4 mt-6">
              {/* Name Input */}
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">Full Name <span className="text-red-500">*</span></label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoPersonOutline className="h-5 w-5 text-gray-400" />
                  </div>
                  <input ref={nameRef} type="text" id="name" name="name" value={form.name} onChange={handleChange} className={`block w-full pl-10 px-4 py-2.5 border ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'} rounded-md shadow-sm focus:ring-1 outline-none`} required />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </motion.div>

              {/* Email Input */}
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email Address <span className="text-red-500">*</span></label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoMailOutline className="h-5 w-5 text-gray-400" />
                  </div>
                  <input ref={emailRef} type="email" id="email" name="email" value={form.email} onChange={handleChange} className={`block w-full pl-10 px-4 py-2.5 border ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'} rounded-md shadow-sm focus:ring-1 outline-none`} required />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </motion.div>

              {/* Subject Input */}
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-gray-700" htmlFor="subject">Subject <span className="text-red-500">*</span></label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoTextOutline className="h-5 w-5 text-gray-400" />
                  </div>
                  <input ref={subjectRef} type="text" id="subject" name="subject" value={form.subject} onChange={handleChange} className={`block w-full pl-10 px-4 py-2.5 border ${errors.subject ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'} rounded-md shadow-sm focus:ring-1 outline-none`} required />
                </div>
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </motion.div>

              {/* Message Input */}
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-gray-700" htmlFor="message">Message <span className="text-red-500">*</span></label>
                <div className="relative mt-1">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <IoChatboxOutline className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea ref={messageRef} id="message" name="message" value={form.message} onChange={handleChange} rows={4} className={`block w-full pl-10 px-4 py-2.5 border ${errors.message ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-yellow-500'} rounded-md shadow-sm focus:ring-1 outline-none`} required />
                </div>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </motion.div>
            </div>

            <motion.div variants={item} className="mt-6">
              <button type="submit" disabled={isSubmitting} className={`w-full px-6 py-3 text-white bg-yellow-500 rounded-md shadow-sm hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}>
                <IoMailOutline className="text-xl" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitted && (
                <div ref={successRef} tabIndex={-1} className="mt-3 text-sm text-green-600 flex items-center justify-center gap-2">
                  <IoCheckmarkCircleOutline className="text-lg" />
                  <span>Message sent successfully!</span>
                </div>
              )}
            </motion.div>
          </motion.form>

          {/* Right: Info Cards */}
          <motion.div className="space-y-4" variants={containerRight}>
            {/* Top time indicator */}
            <div className="flex justify-end lg:justify-start">
              <motion.div variants={item} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border rounded-md inline-flex items-center gap-2">
                <IoTimeOutline className="text-lg" />
                <span>Open today until 10 PM</span>
              </motion.div>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactCards.map((card) => (
                <motion.a key={card.id} href={card.action.href} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 group hover:shadow-md transition-shadow" variants={item} whileHover="hover" whileTap="tap">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center text-2xl text-gray-700">
                    <card.icon />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{card.title}</h3>
                    {card.lines.map((line, idx) => <p key={idx} className="text-gray-500">{line}</p>)}
                  </div>
                  <IoChevronForwardOutline className="text-xl text-gray-400 group-hover:text-gray-600 transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Hours Card */}
            <motion.div className="bg-white border border-gray-200 rounded-lg p-6" variants={item}>
              <div className="flex items-center gap-3 mb-6">
                <IoTimeOutline className="text-2xl text-gray-700" />
                <h3 className="text-lg font-medium text-gray-900">{hoursData.title}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  {hoursData.left.map((line, idx) => <p key={idx} className="text-gray-600">{line}</p>)}
                </div>
                <div className="space-y-3">
                  {hoursData.right.map((line, idx) => <p key={idx} className="text-gray-600">{line}</p>)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Map Section */}
      <div className="container mx-auto px-6 mt-12">
        <motion.div 
          className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md"
          variants={containerRight} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={item} className="h-[450px] w-full relative z-0">
             {/* Map Container */}
             <MapContainer center={[40.7128, -74.0060]} zoom={11} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Branch Markers */}
                {branches.map(branch => (
                    <Marker key={branch.id} position={[branch.lat, branch.lng]} icon={branchIcon}>
                        <Popup>
                            <div className="text-center">
                                <h3 className="font-bold text-sm">{branch.name}</h3>
                                <p className="text-xs text-gray-500 m-0">{branch.address}</p>
                                <a 
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 text-xs underline mt-1 block"
                                >
                                    Get Directions
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}
             </MapContainer>
          </motion.div>
          
          {/* Overlay Info */}
          <motion.div variants={item} className="absolute bottom-4 left-4 bg-white/90 p-4 rounded-lg shadow-lg z-[400] max-w-sm">
             <h2 className="text-lg font-bold text-gray-800 mb-2">Our Branches</h2>
             <ul className="space-y-2 max-h-32 overflow-y-auto">
                 {branches.map(b => (
                     <li key={b.id} className="text-sm text-gray-600 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                         {b.name}
                     </li>
                 ))}
             </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 bg-yellow-50 py-12">
        <div className="container mx-auto px-6">
          <motion.div className="flex flex-col gap-6 max-w-3xl mx-auto" variants={containerLeft} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <motion.div variants={item} className="text-center space-y-2 mb-4">
              <h2 className="text-2xl font-medium text-gray-900">Common Questions</h2>
              <p className="text-gray-500">Find quick answers to frequently asked questions about our services</p>
            </motion.div>

            {faqItems.map((faq) => (
              <motion.div key={faq.id} variants={item} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button onClick={() => toggleFaq(faq.id)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900 flex items-center gap-3">
                    {faq.icon && <faq.icon className="text-xl text-yellow-600" />}
                    {faq.question}
                  </span>
                  <IoChevronDownOutline className={`text-xl text-gray-400 transition-transform ${openFaqs.includes(faq.id) ? 'rotate-180' : ''}`} />
                </button>
                <motion.div initial={false} animate={{ height: openFaqs.includes(faq.id) ? 'auto' : 0, opacity: openFaqs.includes(faq.id) ? 1 : 0 }} className="overflow-hidden">
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact