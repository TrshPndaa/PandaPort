import React from 'react';
import { ChevronRight } from 'lucide-react';
import './modern-button.css';

const modernButton = ({ 
  text, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`modern-button modern-button-${variant} ${className}`}
      aria-label={text}
    >
      <span className="modern-button-text">
        {text}
      </span>
      
      <ChevronRight 
        size={18} 
        className="modern-button-icon"
      />
      
      <div className="modern-button-shine" />
      <div className="modern-button-glow" />
    </button>
  );
};

export default modernButton;