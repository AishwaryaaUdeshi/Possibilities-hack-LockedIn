'use client';

import React, { useState } from 'react';
import { formatTimeWithTimezone, getTimezoneAbbreviation } from '../lib/timezone';

const CalendarPopup = ({
  availability,
  menteeEmail,
  mentorEmail,
  menteeName,
  onClose,
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Sending meeting request:', {
        date: selectedDate,
        time: selectedTime,
        menteeEmail,
        mentorEmail,
        menteeName,
      });

      const response = await fetch('/api/schedule-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          menteeEmail,
          mentorEmail,
          menteeName,
        }),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('Meeting scheduled successfully:', result);
        
        if (result.emailSent) {
          alert('Meeting scheduled successfully! Check your email for calendar invites.');
        } else {
          alert('Meeting scheduled successfully! (Email notifications not available)');
        }
        onClose();
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        console.error('API Error:', errorData);
        alert(`Error scheduling meeting: ${errorData.message || 'Unknown error occurred'}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = availability?.timeSlots || [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-blue-600">
            Schedule Meeting with {menteeName}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Date Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-600 mb-2">
              Select Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Choose a date</option>
              {getNextDays().map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                </option>
              ))}
            </select>
          </div>

          {/* Time Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-blue-600 mb-2">
              Select Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Choose a time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {formatTimeWithTimezone(time, availability?.timezone || 'UTC')}
                </option>
              ))}
            </select>
            {availability?.timezone && (
              <p className="text-xs text-blue-600 mt-1">
                Times shown in {getTimezoneAbbreviation(availability.timezone)}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalendarPopup; 