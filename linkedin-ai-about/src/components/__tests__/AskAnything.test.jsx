import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AskAnything from '../AskAnything';

describe('AskAnything', () => {
  const mockProps = {
    input: '',
    onInputChange: jest.fn(),
    onKeyDown: jest.fn(),
    onInputClick: jest.fn(),
  };

  it('renders the input field with correct placeholder', () => {
    render(<AskAnything {...mockProps} />);
    expect(screen.getByPlaceholderText('Ask anything')).toBeInTheDocument();
  });

  it('calls onInputClick when clicking the input', () => {
    render(<AskAnything {...mockProps} />);
    fireEvent.click(screen.getByPlaceholderText('Ask anything'));
    expect(mockProps.onInputClick).toHaveBeenCalled();
  });

  it('calls onKeyDown when pressing a key', () => {
    render(<AskAnything {...mockProps} />);
    fireEvent.keyDown(screen.getByPlaceholderText('Ask anything'), { key: 'Enter' });
    expect(mockProps.onKeyDown).toHaveBeenCalled();
  });

  it('renders microphone and send icons', () => {
    render(<AskAnything {...mockProps} />);
    // Check for the presence of SVG icons
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2); // One for mic, one for send
  });

  it('displays the input value correctly', () => {
    const propsWithValue = {
      ...mockProps,
      input: 'test input',
    };
    render(<AskAnything {...propsWithValue} />);
    expect(screen.getByDisplayValue('test input')).toBeInTheDocument();
  });
}); 