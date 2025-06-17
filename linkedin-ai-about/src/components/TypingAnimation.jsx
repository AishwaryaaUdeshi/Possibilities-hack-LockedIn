import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      // Calculate typing speed based on text length
      const baseSpeed = 30; // base speed in ms
      const speedFactor = Math.min(1, 100 / text.length); // faster for longer texts
      const typingSpeed = Math.max(10, baseSpeed * speedFactor); // minimum 10ms

      const timeout = setTimeout(() => {
        // Add multiple characters at once for long texts
        const chunkSize = Math.max(1, Math.floor(text.length / 50)); // adjust chunk size based on text length
        const nextIndex = Math.min(currentIndex + chunkSize, text.length);
        setDisplayedText(text.slice(0, nextIndex));
        setCurrentIndex(nextIndex);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <span>{displayedText}</span>;
};

export default TypingAnimation; 