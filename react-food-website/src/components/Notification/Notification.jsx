// src/components/Notification/Notification.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const Notification = ({ message, isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-100"
        >
          <FaCheckCircle className="text-green-500 text-xl" />
          <div>
            <h4 className="font-bold text-gray-800 text-sm">Success!</h4>
            <p className="text-gray-500 text-xs">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;