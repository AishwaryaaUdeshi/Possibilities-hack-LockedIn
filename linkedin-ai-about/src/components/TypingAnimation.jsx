import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ text = '', onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!text) return;
    
    if (currentIndex < text.length) {
      // Calculate typing speed based on text length
      const baseSpeed = 30; // base speed in ms
      const speed = Math.max(baseSpeed, Math.min(50, baseSpeed + (text.length * 0.5))); // adjust speed based on length

      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <span>{displayedText}</span>;
};

export default TypingAnimation; 