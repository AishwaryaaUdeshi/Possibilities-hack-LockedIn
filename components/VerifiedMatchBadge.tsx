'use client';

import React from 'react';
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
  const handleCalendarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Calendar icon clicked!');
    onCalendarClick();
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Gold Verified Match Badge */}
      <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
        <span>✓</span>
        <span>Verified Match</span>
      </div>

      {/* Summary Tooltip */}
      <SummaryTooltip summary={summary} />

      {/* Calendar Icon */}
      <button
        onClick={handleCalendarClick}
        className="text-gray-400 hover:text-gray-600 cursor-pointer"
        title="Schedule meeting"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
};

export default VerifiedMatchBadge; 