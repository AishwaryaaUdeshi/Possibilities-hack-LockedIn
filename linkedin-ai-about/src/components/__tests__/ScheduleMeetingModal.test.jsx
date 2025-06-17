import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScheduleMeetingModal from '../ScheduleMeetingModal';

describe('ScheduleMeetingModal', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    onSchedule: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('does not render when isOpen is false', () => {
    render(<ScheduleMeetingModal {...mockProps} isOpen={false} />);
    expect(screen.queryByText('Select Date')).not.toBeInTheDocument();
  });

  it('renders step 1 (date selection) when open', () => {
    render(<ScheduleMeetingModal {...mockProps} />);
    expect(screen.getByText('Select Date')).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
  });

  it('completes the scheduling flow', () => {
    render(<ScheduleMeetingModal {...mockProps} />);
    
    // Select date
    const dateButton = screen.getAllByRole('button')[7];
    fireEvent.click(dateButton);
    
    // Select time
    const timeButton = screen.getByText('9:00 AM');
    fireEvent.click(timeButton);
    
    // Send request
    const sendButton = screen.getByText('Send Availability Request');
    fireEvent.click(sendButton);
    
    expect(mockProps.onSchedule).toHaveBeenCalled();
    expect(screen.getByText('Congratulations!')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<ScheduleMeetingModal {...mockProps} />);
    const closeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(closeButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });
}); 