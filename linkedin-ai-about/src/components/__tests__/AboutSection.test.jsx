import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutSection from '../AboutSection';

describe('AboutSection', () => {
  it('renders the about section with correct content', () => {
    render(<AboutSection />);
    
    // Check if title exists
    expect(screen.getByText('About')).toBeInTheDocument();
    
    // Check if email is displayed
    expect(screen.getByText('kenny.frias@columbia.edu')).toBeInTheDocument();
    
    // Check if about text contains key information
    const aboutText = screen.getByText(/QuestBridge match to Columbia University/i);
    expect(aboutText).toBeInTheDocument();
    expect(aboutText.textContent).toContain('education');
    expect(aboutText.textContent).toContain('climate change');
    expect(aboutText.textContent).toContain('artificial intelligence');
  });
}); 