'use client';

import React, { useState } from 'react';

interface SummaryTooltipProps {
  summary?: string;
}

const SummaryTooltip: React.FC<SummaryTooltipProps> = ({ summary }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <span
        className="text-gray-400 hover:text-gray-600 cursor-pointer"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        tabIndex={0}
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 16v-4M12 8h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {visible && (
        <div className="absolute z-10 bg-gray-100 border border-gray-300 rounded-lg shadow-lg top-full left-1/2 transform -translate-x-1/2 mt-2 p-3 max-w-xs">
          <div>
            <div className="font-semibold text-gray-900">Chat Summary</div>
            <div className="text-gray-700 text-sm whitespace-pre-line">{summary}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryTooltip; 