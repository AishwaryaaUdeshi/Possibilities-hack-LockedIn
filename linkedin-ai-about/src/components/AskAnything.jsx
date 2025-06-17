import React from 'react';

const AskAnything = ({ input, onInputChange, onKeyDown, onInputClick }) => {
  return (
    <div className="w-full flex items-center bg-white rounded-lg border border-gray-300 hover:border-blue-400 transition-colors">
      <input
        className="flex-1 bg-transparent outline-none text-[14px] leading-[20px] text-gray-900 px-4 py-3 cursor-pointer"
        type="text"
        placeholder="Ask anything"
        value={input}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        onClick={onInputClick}
        readOnly
      />
      <div className="flex items-center gap-2 px-3">
        <button className="text-gray-500 hover:text-gray-700" type="button" tabIndex={-1}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </button>
        <button className="text-gray-500 hover:text-gray-700" type="button" tabIndex={-1}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AskAnything; 