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

  it('renders input field with correct placeholder', () => {
    render(<AskAnything {...mockProps} />);
    expect(screen.getByPlaceholderText('Ask anything')).toBeInTheDocument();
  });

  it('handles input click', () => {
    render(<AskAnything {...mockProps} />);
    fireEvent.click(screen.getByPlaceholderText('Ask anything'));
    expect(mockProps.onInputClick).toHaveBeenCalled();
  });

  it('handles input change', () => {
    render(<AskAnything {...mockProps} />);
    fireEvent.change(screen.getByPlaceholderText('Ask anything'), { target: { value: 'test' } });
    expect(mockProps.onInputChange).toHaveBeenCalled();
  });

  it('handles key down', () => {
    render(<AskAnything {...mockProps} />);
    fireEvent.keyDown(screen.getByPlaceholderText('Ask anything'), { key: 'Enter' });
    expect(mockProps.onKeyDown).toHaveBeenCalled();
  });
}); 