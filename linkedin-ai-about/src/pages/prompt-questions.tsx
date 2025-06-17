import { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { QUESTIONS } from '../constants/questions';
import { UserProfile } from '../types';
import styles from '../styles/PromptQuestions.module.css';
import { saveProfile } from '../lib/firestore';

export default function PromptQuestions() {
  const router = useRouter();
  // Track current question and loading state for smooth user experience
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Store user responses with specific keys for structured data storage
  const [answers, setAnswers] = useState<Omit<UserProfile, 'createdAt' | 'updatedAt' | 'status'>>({
    mentor: '',
    'describe-yourself': '',
    'decisions-you-make': '',
    'what-you-value': '',
    misunderstood: '',
    conversations: ''
  });

  // Update answers state while maintaining previous responses
  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [QUESTIONS[currentQuestion].id]: value
    }));
  };

  // Enable keyboard navigation for better user experience
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  // Ensure current question is answered before proceeding
  const isCurrentAnswerValid = () => {
    const currentAnswer = answers[QUESTIONS[currentQuestion].id as keyof typeof answers];
    return currentAnswer && currentAnswer.length > 0;
  };

  // Validate all questions are answered before final submission
  const areAllAnswersValid = () => {
    return Object.values(answers).every(answer => answer && answer.length > 0);
  };

  // Handle navigation and data submission with proper validation
  const handleNext = async () => {
    if (!isCurrentAnswerValid()) {
      alert('Please fill out the current question before proceeding.');
      return;
    }

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      if (!areAllAnswersValid()) {
        alert('Please fill out all questions before proceeding.');
        return;
      }

      try {
        setIsNavigating(true);
        console.log('Starting save process...');
        console.log('Current answers state:', answers);
        
        // Clean and validate answers for database storage
        const validatedAnswers = Object.entries(answers).reduce((acc, [key, value]) => {
          if (!value || value.trim().length === 0) {
            throw new Error(`Answer for ${key} is empty`);
          }
          return { ...acc, [key]: value.trim() };
        }, {});

        console.log('Validated answers:', validatedAnswers);
        
        // Save to Cloud Firestore using the saveProfile function
        const profileData = {
          ...validatedAnswers,
          status: 'completed'
        };
        
        console.log('Attempting to save to Cloud Firestore...');
        const profileId = await saveProfile(profileData);
        
        console.log('Successfully saved to Cloud Firestore with ID:', profileId);
        alert('Your answers have been saved successfully!');
        setIsNavigating(false);
        
        // Optionally redirect to another page after successful save
        // router.push('/profile');
      } catch (error) {
        console.error('Error in save process:', error);
        if (error instanceof Error) {
          console.error('Error details:', {
            message: error.message,
            name: error.name,
            stack: error.stack
          });
          
          // Provide user-friendly error messages based on error type
          if (error.message.includes('empty')) {
            alert('Please fill out all questions before proceeding.');
          } else if (error.message.includes('Firebase')) {
            alert('Failed to connect to the database. Please check your internet connection and try again.');
          } else {
            alert('An error occurred while saving your answers. Please try again.');
          }
        }
        setIsNavigating(false);
      }
    }
  };

  // Enable backward navigation through questions
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Create Your AI Profile</h1>
        <div className={styles.progress}>
          Question {currentQuestion + 1} of {QUESTIONS.length}
        </div>
        
        <div className={styles.questionContainer}>
          <h2 className={styles.question}>{QUESTIONS[currentQuestion].question}</h2>
          <textarea
            className={styles.answer}
            value={answers[QUESTIONS[currentQuestion].id as keyof typeof answers]}
            onChange={(e) => handleAnswerChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={QUESTIONS[currentQuestion].placeholder}
            rows={4}
            disabled={isNavigating}
          />
          <p className={styles.hint}>Press Enter to continue (Shift + Enter for new line)</p>
        </div>

        <div className={styles.navigation}>
          <button 
            onClick={handlePrevious}
            className={`${styles.button} ${styles.previous}`}
            disabled={currentQuestion === 0 || isNavigating}
          >
            Previous
          </button>
          <button 
            onClick={handleNext}
            className={`${styles.button} ${styles.next}`}
            disabled={isNavigating}
          >
            {isNavigating ? 'Saving...' : currentQuestion === QUESTIONS.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>

        {isNavigating && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}></div>
            <p>Saving your answers...</p>
          </div>
        )}
      </div>
    </div>
  );
} 