import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('does not render when isOpen is false', () => {
    render(<ChatModal {...mockProps} isOpen={false} />);
    expect(screen.queryByText('Kenny Frias')).not.toBeInTheDocument();
  });

  it('renders header with correct information when open', () => {
    render(<ChatModal {...mockProps} />);
    expect(screen.getByText('Kenny Frias')).toBeInTheDocument();
    expect(screen.getByText('SDE Intern @ Amazon | Math + CS @ Columbia')).toBeInTheDocument();
  });

  it('displays prompt suggestions', () => {
    render(<ChatModal {...mockProps} />);
    expect(screen.getByText('Where did you go to school?')).toBeInTheDocument();
    expect(screen.getByText('What are your interests?')).toBeInTheDocument();
    expect(screen.getByText('Are you open to mentorship?')).toBeInTheDocument();
  });

  it('handles prompt clicks', () => {
    render(<ChatModal {...mockProps} />);
    fireEvent.click(screen.getByText('Where did you go to school?'));
    expect(mockProps.onPromptClick).toHaveBeenCalledWith('Where did you go to school?');
  });

  it('renders chat messages correctly', () => {
    const propsWithChat = {
      ...mockProps,
      chat: [
        { from: 'user', text: 'Hello' },
        { from: 'bot', text: 'Hi there!' },
      ],
    };
    render(<ChatModal {...propsWithChat} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<ChatModal {...mockProps} loading={true} />);
    expect(screen.getByText('Typing...')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<ChatModal {...mockProps} />);
    const input = screen.getByPlaceholderText('Write a message...');
    fireEvent.change(input, { target: { value: 'test message' } });
    expect(mockProps.onModalInputChange).toHaveBeenCalled();
  });

  it('handles send button click', () => {
    render(<ChatModal {...mockProps} modalInput="test message" />);
    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);
    expect(mockProps.onSend).toHaveBeenCalled();
  });

  it('disables send button when input is empty', () => {
    render(<ChatModal {...mockProps} modalInput="" />);
    expect(screen.getByText('Send')).toBeDisabled();
  });

  it('calls onClose when close button is clicked', () => {
    render(<ChatModal {...mockProps} />);
    const closeButton = screen.getByRole('button', { name: '' }); // The X button
    fireEvent.click(closeButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });
}); 