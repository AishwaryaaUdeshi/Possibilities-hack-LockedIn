import React, { useState } from 'react';

const ScheduleMeetingModal = ({ isOpen, onClose, onSchedule }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isRequestSent, setIsRequestSent] = useState(false);

  // Generate time slots from 9 AM to 5 PM
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = Math.floor((i + 18) / 2);
    const minute = (i + 18) % 2 === 0 ? '00' : '30';
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute} ${period}`;
  });

  // Generate dates for current and next month
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Get end of current month
    const endOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInCurrentMonth = endOfCurrentMonth.getDate();
    
    // Calculate days remaining in current month
    const daysRemaining = daysInCurrentMonth - today.getDate() + 1;
    
    // If less than 30 days remaining, include next month
    if (daysRemaining < 30) {
      // Get end of next month
      const endOfNextMonth = new Date(currentYear, currentMonth + 2, 0);
      const daysToAddFromNextMonth = 30 - daysRemaining;
      
      // Generate dates from today until end of current month
      for (let d = new Date(today); d <= endOfCurrentMonth; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      
      // Add dates from next month
      const nextMonthStart = new Date(currentYear, currentMonth + 1, 1);
      for (let d = new Date(nextMonthStart); d <= endOfNextMonth && dates.length < 30; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
    } else {
      // If current month has enough days, just show current month
      for (let d = new Date(today); d <= endOfCurrentMonth; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
    }
    
    return dates;
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setStep(2);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleSendRequest = () => {
    setIsRequestSent(true);
    onSchedule(selectedDate);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-slideUp relative">
        {!isRequestSent ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {step === 1 ? 'Select Date' : step === 2 ? 'Select Time' : 'Confirm Request'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                  {getAvailableDates().map((date, index) => {
                    const isNewMonth = index === 0 || date.getMonth() !== getAvailableDates()[index - 1].getMonth();
                    return (
                      <React.Fragment key={index}>
                        {isNewMonth && (
                          <div className="col-span-7 py-2">
                            <h3 className="text-lg font-medium text-gray-900 text-center">
                              {formatMonthYear(date)}
                            </h3>
                          </div>
                        )}
                        <button
                          onClick={() => handleDateSelect(date)}
                          className={`p-2 text-sm rounded-lg transition-all duration-200 transform hover:scale-105 ${
                            date.toDateString() === selectedDate.toDateString()
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                        >
                          {date.getDate()}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className="px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-blue-600 hover:text-blue-700 text-sm transition-all duration-200 transform hover:scale-105"
                >
                  Back to Calendar
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Selected Date:</p>
                  <p className="font-medium">{selectedDate.toLocaleDateString()}</p>
                  <p className="text-gray-600 mt-2">Selected Time:</p>
                  <p className="font-medium">{selectedTime}</p>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="text-blue-600 hover:text-blue-700 text-sm transition-all duration-200 transform hover:scale-105"
                  >
                    Back to Time Selection
                  </button>
                  <button
                    onClick={handleSendRequest}
                    className="bg-amber-500 text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 hover:bg-amber-600 shadow-md hover:shadow-lg"
                  >
                    Send Availability Request
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <button
              onClick={onClose}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Congratulations!</h3>
            <p className="text-gray-600">You have officially sent a Verified Matched Connection request.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleMeetingModal; 