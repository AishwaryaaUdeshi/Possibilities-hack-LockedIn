import React from 'react';

const aboutText = `Hi! My name is Kenny, and I am a QuestBridge match to Columbia University. At Columbia, I am building a deep intuition for problem-solving with the goal of utilizing technology to make tangible impacts in my areas of interest, which include education, climate change, artificial intelligence, and quantitative finance. Feel free to reach out to kenny.frias@columbia.edu!`;

const AboutSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">About</h2>
      <p className="text-gray-700 mb-2">{aboutText}</p>
      <span className="text-gray-400 text-sm">kenny.frias@columbia.edu</span>
    </div>
  );
};

export default AboutSection; 