'use client';

import React from 'react';

const SummaryTooltip = ({ summary }) => {
  return (
    <div className="absolute z-50 w-80 p-4 bg-white border border-gray-200 rounded-lg shadow-lg -top-2 left-8">
      <div className="relative">
        {/* Arrow */}
        <div className="absolute -left-2 top-3 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-200"></div>
        <div className="absolute -left-1 top-3 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white"></div>
        
        {/* Content */}
        <h4 className="font-semibold text-gray-900 mb-2">Chatbot Interaction Summary</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {summary}
        </p>
      </div>
    </div>
  );
};

export default SummaryTooltip; 