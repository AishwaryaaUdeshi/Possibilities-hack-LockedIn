import { Question } from '../types';

// Questions data for user profile creation
export const QUESTIONS: Question[] = [
  {
    id: 'mentor',
    question: 'Are you looking to mentor someone? If so, what are you looking to mentor them in?',
    placeholder: 'e.g., Yes, I am looking to mentor someone.'
  },
  {
    id: 'describe-yourself',
    question: 'Describe yourself in 3 words.',
    placeholder: 'Enter your description'
  },
  {
    id: 'decisions-you-make',
    question: 'When you make big decisions, what matters most to you: logic, emotion, gut instict, or something else? Can you give an example?',
    placeholder: 'e.g., I make decisions based on logic because I like to think things through step by step.'
  },
  {
    id: 'what-you-value',
    question: 'What are the most important things to you in life? (e.g., family, career, health, etc.)',
    placeholder: 'e.g., I value family and health because they bring me joy and fulfillment.'
  },
  {
    id: 'misunderstood',
    question: 'What is something that people misunderstand about you?',
    placeholder: 'e.g., I think people often misunderstand my sense of humor.'
  },
  {
    id: 'conversations',
    question: 'In conversations, do you prefer to explore ideas, share experiences, or discuss practical matters?',
    placeholder: 'e.g., I prefer to share experiences because I like to learn from others.'
  }
]; 