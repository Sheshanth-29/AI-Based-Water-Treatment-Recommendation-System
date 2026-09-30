import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = false, ...props }) => {
  const baseClass = `glass-card ${className}`;
  
  if (hover) {
    return (
      <motion.div 
        className={baseClass}
        whileHover={{ y: -5, boxShadow: 'var(--shadow-glow)' }}
        transition={{ type: 'spring', stiffness: 300 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClass} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
