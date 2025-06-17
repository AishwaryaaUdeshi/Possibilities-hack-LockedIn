'use client';

import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ConnectRequestData } from '../../types/network';
import VerifiedMatchBadge from './VerifiedMatchBadge';
import SummaryTooltip from './SummaryTooltip';
import CalendarPopup from './CalendarPopup';

interface ConnectRequestProps {
  request: ConnectRequestData;
  onAccept: (requestId: string) => void;
  onDecline: (requestId: string) => void;
}

const ConnectRequest: React.FC<ConnectRequestProps> = ({
  request,
  onAccept,
  onDecline,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleAccept = () => {
    onAccept(request.id);
  };

  const handleDecline = () => {
    onDecline(request.id);
  };

  const handleCalendarClick = () => {
    console.log('Calendar clicked for:', request.name);
    setShowCalendar(true);
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-start space-x-4">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {request.profilePicture ? (
              <img
                src={request.profilePicture}
                alt={`${request.name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {request.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {request.name}
            </h3>
            {request.isVerifiedMatch && (
              <VerifiedMatchBadge 
                summary={request.chatbotSummary || 'No summary available'}
                availability={request.availability}
                onCalendarClick={handleCalendarClick}
              />
            )}
          </div>
          
          <p className="text-gray-600 mb-3 line-clamp-2">
            {request.tagline}
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Accept
            </button>
            <button
              onClick={handleDecline}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Decline
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <CalendarPopup
          availability={request.availability}
          menteeEmail={request.email}
          mentorEmail={request.mentorEmail}
          menteeName={request.name}
          onClose={() => setShowCalendar(false)}
        />
      )}
    </div>
  );
};

export default ConnectRequest; 