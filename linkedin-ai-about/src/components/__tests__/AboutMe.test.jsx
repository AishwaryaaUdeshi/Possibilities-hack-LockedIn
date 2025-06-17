import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AboutMe from '../AboutMe';

describe('AboutMe', () => {
  const mockProps = {
    onPromptClick: jest.fn(),
    onOpenChat: jest.fn(),
    onSend: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders prompt suggestions', () => {
    render(<AboutMe {...mockProps} />);
    expect(screen.getByText("What's your current role?")).toBeInTheDocument();
    expect(screen.getByText("What are your key skills?")).toBeInTheDocument();
    expect(screen.getByText("What's your career goal?")).toBeInTheDocument();
    expect(screen.getByText("What's your role?")).toBeInTheDocument();
  });

  it('handles prompt click and triggers all callbacks', () => {
    render(<AboutMe {...mockProps} />);
    fireEvent.click(screen.getByText("What's your role?"));
    
    expect(mockProps.onPromptClick).toHaveBeenCalledWith("What's your role?");
    expect(mockProps.onOpenChat).toHaveBeenCalled();
    
    jest.advanceTimersByTime(100);
    expect(mockProps.onSend).toHaveBeenCalled();
  });
}); 