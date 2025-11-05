import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  IoLocationOutline, 
  IoCallOutline, 
  IoMailOutline,
  IoTimeOutline,
  IoCarOutline,
  IoChevronForwardOutline,
  IoPersonOutline,
  IoTextOutline,
  IoChatboxOutline,
  IoCheckmarkCircleOutline,
  IoChevronDownOutline,
  IoNavigateOutline,
  IoRestaurantOutline,
  IoCardOutline,
  IoHelpCircleOutline
} from 'react-icons/io5'

function Contact() {
  // FAQ accordion state
  const [openFaqs, setOpenFaqs] = useState([])
  
  const toggleFaq = (id) => {
    setOpenFaqs(prev =>
      prev.includes(id) 
        ? prev.filter(faqId => faqId !== id)
        : [...prev, id]
    )
  }

  // FAQ data
  const faqItems = [
    {
      id: 'delivery',
      icon: IoCarOutline,
      question: 'Do you offer delivery service?',
      answer: 'Yes! We offer delivery within a 5-mile radius. Orders can be placed through our website or mobile app. Delivery fees vary based on distance.'
    },
    {
      id: 'payment',
      icon: IoCardOutline,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and digital wallets including Apple Pay and Google Pay. Cash is also accepted for in-store purchases.'
    },
    {
      id: 'reservation',
      icon: IoRestaurantOutline,
      question: 'How can I make a reservation?',
      answer: 'Reservations can be made online through our website, by phone, or through popular booking platforms. We recommend booking at least 2 days in advance for weekend dining.'
    },
    {
      id: 'allergies',
      icon: IoHelpCircleOutline,
      question: 'How do you handle food allergies?',
      answer: 'We take allergies very seriously. Please inform our staff about any allergies when ordering. We can provide detailed ingredient information and make reasonable accommodations.'
    }
  ]

  // Animation variants
  const containerLeft = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.05,
        staggerChildren: 0.06,
      },
    },
  }

  const containerRight = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.12,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  }

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.01, y: -4 },
    tap: { scale: 0.995 }
  }

  // contact info data
  const contactCards = [
    {
      id: 'location',
      icon: IoLocationOutline,
      title: 'Our Location',
      lines: ['123 Main Street', 'New York, NY 10001'],
      action: { href: 'https://goo.gl/maps/xyz', label: 'Open in Google Maps' }
    },
    {
      id: 'phone',
      icon: IoCallOutline,
      title: 'Call Us',
      lines: ['+1 (555) 123-4567', 'Mon–Fri 9:00–18:00'],
      action: { href: 'tel:+15551234567', label: 'Call us now' }
    },
    {
      id: 'email',
      icon: IoMailOutline,
      title: 'Email Us',
      lines: ['hello@restaurant.com', 'We reply within 24h'],
      action: { href: 'mailto:hello@restaurant.com', label: 'Send us an email' }
    }
  ]

  const hoursData = {
    title: 'Opening Hours',
    left: ['Monday: 9:00–22:00', 'Tuesday: 9:00–22:00', 'Wednesday: 9:00–22:00', 'Thursday: 9:00–22:00'],
    right: ['Friday: 9:00–23:00', 'Saturday: 10:00–23:00', 'Sunday: 10:00–22:00', 'Kitchen closes 30min earlier']
  }

  // form state
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // refs for focus management
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const subjectRef = useRef(null)
  const messageRef = useRef(null)
  const successRef = useRef(null)

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
    // clear single field error as user types
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      // focus first invalid field for screen reader / keyboard users
      if (errs.name) nameRef.current?.focus()
      else if (errs.email) emailRef.current?.focus()
      else if (errs.subject) subjectRef.current?.focus()
      else if (errs.message) messageRef.current?.focus()
      return
    }

    // simulate success
    setSubmitted(true)
    // move focus to success message for screen readers and keyboard users
    setTimeout(() => {
      successRef.current?.focus()
    }, 50)

    // reset form after a short delay
    setTimeout(() => setForm({ name: '', email: '', subject: '', message: '' }), 400)
    // clear submitted flag after 2s
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#fffaf6] py-12">
      <div className="container mx-auto px-6">
        {/* header small box + divider */}
        <motion.div className="flex flex-col items-center" variants={item} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <div className="border border-gray-700 rounded-md px-6 py-1 w-48 text-center text-sm">
            Contact
          </div>
          <div className="mt-4 h-2 w-80 bg-gray-200 rounded-full"></div>
        </motion.div>

        {/* main grid: left form, right info cards */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {/* left: form wireframe card */}
          <motion.form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6" variants={containerLeft}>
            <motion.div className="space-y-2" variants={item}>
              <h2 className="text-2xl font-medium text-gray-900">Send us a message</h2>
              <p className="text-gray-500">Got questions about our menu or services? We'd love to hear from you.</p>
            </motion.div>
            
            <div className="space-y-4 mt-6">
              {/* Name */}
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoPersonOutline className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 px-4 py-2.5 border ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'} rounded-md shadow-sm focus:ring-1`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    required
                  />
                </div>
                {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </motion.div>

              {/* Email */}
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoMailOutline className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 px-4 py-2.5 border ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'} rounded-md shadow-sm focus:ring-1`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    required
                  />
                </div>
                {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </motion.div>

              {/* Subject */}
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-gray-700" htmlFor="subject">
                  Subject <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoTextOutline className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    ref={subjectRef}
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`block w-full pl-10 px-4 py-2.5 border ${errors.subject ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'} rounded-md shadow-sm focus:ring-1`}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    required
                  />
                </div>
                {errors.subject && <p id="subject-error" className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </motion.div>

              {/* Message */}
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-gray-700" htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <IoChatboxOutline className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <textarea
                    ref={messageRef}
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className={`block w-full pl-10 px-4 py-2.5 border ${errors.message ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'} rounded-md shadow-sm focus:ring-1`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    required
                  />
                </div>
                {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </motion.div>
            </div>

            <motion.div variants={item} className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-yellow-500 rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
              >
                <IoMailOutline className="text-xl" aria-hidden="true" />
                Send Message
              </button>
              {submitted && (
                <div
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="mt-3 text-sm text-green-600 flex items-center justify-center gap-2"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1.5"
                  >
                    <IoCheckmarkCircleOutline className="text-lg" />
                    <span>Message sent successfully!</span>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.form>

          {/* right: contact info cards */}
          <motion.div className="space-y-4" variants={containerRight}>
            {/* top small search-like box centered on wide screens */}
            <div className="flex justify-end lg:justify-start">
              <motion.div variants={item} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border rounded-md inline-flex items-center gap-2">
                <IoTimeOutline className="text-lg" aria-hidden="true" />
                <span>Open today until 10 PM</span>
              </motion.div>
            </div>

            {/* three info cards */}
            <div className="space-y-4">
              {contactCards.map((card) => (
                <motion.a
                  key={card.id}
                  href={card.action.href}
                  aria-label={card.action.label}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 group hover:shadow-md transition-shadow"
                  variants={item}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="h-12 w-12 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center text-2xl text-gray-700">
                    <card.icon aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{card.title}</h3>
                    {card.lines.map((line, idx) => (
                      <p key={idx} className="text-gray-500">{line}</p>
                    ))}
                  </div>
                  <IoChevronForwardOutline className="text-xl text-gray-400 group-hover:text-gray-600 transition-colors" aria-hidden="true" />
                </motion.a>
              ))}
            </div>

            {/* hours card with two columns */}
            <motion.div className="bg-white border border-gray-200 rounded-lg p-6" variants={item}>
              <div className="flex items-center gap-3 mb-6">
                <IoTimeOutline className="text-2xl text-gray-700" aria-hidden="true" />
                <h3 className="text-lg font-medium text-gray-900">{hoursData.title}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  {hoursData.left.map((line, idx) => (
                    <p key={idx} className="text-gray-600">{line}</p>
                  ))}
                </div>
                <div className="space-y-3">
                  {hoursData.right.map((line, idx) => (
                    <p key={idx} className="text-gray-600">{line}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* map section */}
      <div className="container mx-auto px-6 mt-12">
        <motion.div 
          className="relative bg-white border border-gray-200 rounded-lg overflow-hidden"
          variants={containerRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={item} className="aspect-[16/9] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=your-map-embed-url"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Location Map"
            />
          </motion.div>
          
          <motion.div 
            variants={item}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-6 text-white"
          >
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-xl font-medium">Visit Our Restaurant</h2>
                <p className="text-gray-200">123 Main Street, New York, NY 10001</p>
              </div>
              <a
                href="https://goo.gl/maps/xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors flex items-center gap-2"
              >
                <IoNavigateOutline className="text-lg" aria-hidden="true" />
                Get Directions
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* services FAQ accordion section */}
      <div className="mt-12 bg-yellow-50 py-12">
        <div className="container mx-auto px-6">
          <motion.div 
            className="flex flex-col gap-6 max-w-3xl mx-auto"
            variants={containerLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={item} className="text-center space-y-2 mb-4">
              <h2 className="text-2xl font-medium text-gray-900">Common Questions</h2>
              <p className="text-gray-500">Find quick answers to frequently asked questions about our services</p>
            </motion.div>

            {faqItems.map((faq) => (
              <motion.div
                key={faq.id}
                variants={item}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={openFaqs.includes(faq.id)}
                  aria-controls={`faq-content-${faq.id}`}
                >
                  <span className="font-medium text-gray-900 flex items-center gap-3">
                    {faq.icon && <faq.icon className="text-xl text-yellow-600" aria-hidden="true" />}
                    {faq.question}
                  </span>
                  <IoChevronDownOutline
                    className={`text-xl text-gray-400 transition-transform ${
                      openFaqs.includes(faq.id) ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <motion.div
                  id={`faq-content-${faq.id}`}
                  initial={false}
                  animate={{
                    height: openFaqs.includes(faq.id) ? 'auto' : 0,
                    opacity: openFaqs.includes(faq.id) ? 1 : 0
                  }}
                  className="overflow-hidden"
                >
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