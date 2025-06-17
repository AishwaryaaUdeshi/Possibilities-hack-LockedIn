import React from 'react';

const promptSuggestions = [
  'Where did you go to school?',
  'What are your interests?',
  'Are you open to mentorship?'
];

const ChatModal = ({ 
  isOpen, 
  onClose, 
  chat, 
  loading, 
  modalInput, 
  onModalInputChange, 
  onKeyDown, 
  onSend, 
  onPromptClick,
  modalInputRef,
  chatEndRef 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md flex flex-col animate-slideUp" style={{ minHeight: 420, maxHeight: 520 }}>
        {/* LinkedIn-style header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img 
              src="/profile.jpg" 
              alt="Profile" 
              className="w-8 h-8 rounded-full hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
              }}
            />
            <div>
              <div className="font-sans text-[16px] leading-[20px] font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200">Kenny Frias</div>
              <div className="text-[14px] leading-[16px] text-gray-500 hover:text-gray-700 transition-colors duration-200">SDE Intern @ Amazon | Math + CS @ Columbia</div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 transition-colors duration-200 hover:scale-110 transform"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Prompt suggestions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {promptSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-[14px] leading-[16px] px-3 py-1.5 rounded-full border border-blue-200 transition-all duration-200 hover:scale-105 hover:shadow-md"
                onClick={() => onPromptClick(prompt)}
                type="button"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="space-y-3">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`px-4 py-2 rounded-2xl text-[14px] leading-[20px] transition-all duration-200 ${
                  msg.from === 'user' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="px-4 py-2 rounded-2xl bg-gray-100 text-gray-500 text-[14px] leading-[20px] animate-pulse">
                  Typing...
                </div>
              </div>
            )}
          </div>
          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 hover:border-blue-400 transition-colors duration-200">
            <input
              ref={modalInputRef}
              className="flex-1 px-3 py-2 bg-transparent outline-none text-[14px] leading-[20px] text-gray-900 placeholder-gray-500"
              type="text"
              placeholder="Write a message..."
              value={modalInput}
              onChange={onModalInputChange}
              onKeyDown={onKeyDown}
              disabled={loading}
            />
            <button
              className={`px-3 py-2 transition-all duration-200 ${
                modalInput.trim() 
                  ? 'text-blue-600 hover:text-blue-700 hover:scale-105' 
                  : 'text-gray-400'
              }`}
              onClick={onSend}
              disabled={loading || !modalInput.trim()}
              type="button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal; 