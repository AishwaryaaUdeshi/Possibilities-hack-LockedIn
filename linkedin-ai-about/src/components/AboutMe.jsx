import React from 'react';

const AboutMe = ({ onPromptClick, onOpenChat, onSend }) => {
  const promptSuggestions = [
    "What's your current role?",
    "What are your key skills?",
    "What's your career goal?",
    "What's your work experience?"
  ];

  const handlePromptClick = (prompt) => {
    onPromptClick(prompt);
    onOpenChat();
    // Small delay to ensure the modal is open and input is focused
    setTimeout(() => {
      onSend();
    }, 100);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {promptSuggestions.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handlePromptClick(prompt)}
            className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AboutMe; 