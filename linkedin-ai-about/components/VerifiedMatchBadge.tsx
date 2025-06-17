'use client';

import React, { useState } from 'react';
import SummaryTooltip from './SummaryTooltip';

interface VerifiedMatchBadgeProps {
  summary: string;
  availability: any;
  onCalendarClick: () => void;
}

const VerifiedMatchBadge: React.FC<VerifiedMatchBadgeProps> = ({
  summary,
  availability,
  onCalendarClick,
}) => {
  const [showSummary, setShowSummary] = useState(false);

  const handleCalendarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Calendar icon clicked!');
    onCalendarClick();
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Gold Verified Match Badge */}
      <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Verified Match</span>
      </div>

      {/* Summary Icon */}
      <div className="relative">
        <button
          onMouseEnter={() => setShowSummary(true)}
          onMouseLeave={() => setShowSummary(false)}
          className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded hover:bg-gray-100"
          title="View chatbot interaction summary"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
        
        {showSummary && (
          <SummaryTooltip summary={summary} />
        )}
      </div>

      {/* Calendar Icon */}
      <button
        onClick={handleCalendarClick}
        className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded hover:bg-gray-100"
        title="Schedule a meeting"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
};

export default VerifiedMatchBadge; 