'use client';

import React from 'react';

interface SummaryTooltipProps {
  summary: string;
}

const SummaryTooltip: React.FC<SummaryTooltipProps> = ({ summary }) => {
  return (
    <div className="absolute z-50 w-80 p-4 bg-gray-800 text-white rounded-lg shadow-xl -top-3 left-1/2 transform -translate-x-1/2 -translate-y-full">
      {/* Arrow pointing down to the icon */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-yellow-300">Chatbot Interaction Summary</h4>
        <p className="text-sm text-gray-200 leading-relaxed">
          {summary}
        </p>
      </div>
    </div>
  );
};

export default SummaryTooltip; 