import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

// Mock TypingAnimation component
jest.mock('../TypingAnimation', () => {
  const React = require('react');
  return function MockTypingAnimation({ text, onComplete }) {
    React.useEffect(() => {
      onComplete();
    }, [onComplete]);
    return <span>{text}</span>;
  };
});

import ChatModal from '../ChatModal';

describe('ChatModal', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    chat: [],
    loading: false,
    modalInput: '',
    onModalInputChange: jest.fn(),
    onKeyDown: jest.fn(),
    onSend: jest.fn(),
    onPromptClick: jest.fn(),
    modalInputRef: React.createRef(),
    chatEndRef: React.createRef(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('does not render when isOpen is false', () => {
    render(<ChatModal {...mockProps} isOpen={false} />);
    expect(screen.queryByText('Kenny Frias')).not.toBeInTheDocument();
  });

  it('renders header and prompt suggestions', () => {
    render(<ChatModal {...mockProps} />);
    expect(screen.getByText('Kenny Frias')).toBeInTheDocument();
    expect(screen.getByText('SDE Intern @ Amazon | Math + CS @ Columbia')).toBeInTheDocument();
    expect(screen.getByText('Where did you go to school?')).toBeInTheDocument();
    expect(screen.getByText('What are your interests?')).toBeInTheDocument();
  });

  it('handles chat messages and shows connect button on match', async () => {
    const matchMsg = 'You seem like a great match for mentorship!';
    const propsWithChat = {
      ...mockProps,
      chat: [
        { from: 'user', text: 'I am interested in mentorship' },
        { from: 'bot', text: matchMsg },
      ],
    };
    render(<ChatModal {...propsWithChat} />);
    
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText('I am interested in mentorship')).toBeInTheDocument();
    expect(screen.getByText(matchMsg)).toBeInTheDocument();
    // Wait for the button to appear
    expect(await screen.findByText('Connect & Schedule Meeting', {}, {timeout: 3000})).toBeInTheDocument();
  });

  it('handles user input and sending messages', () => {
    render(<ChatModal {...mockProps} modalInput="test message" />);
    
    const input = screen.getByPlaceholderText('Write a message...');
    fireEvent.change(input, { target: { value: 'new message' } });
    
    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);
    
    expect(mockProps.onModalInputChange).toHaveBeenCalled();
    expect(mockProps.onSend).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<ChatModal {...mockProps} loading={true} />);
    expect(screen.getByText('Typing...')).toBeInTheDocument();
  });
}); 