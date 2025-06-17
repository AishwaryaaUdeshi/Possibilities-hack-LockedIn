// Question interface for type safety
export interface Question {
  id: string;
  question: string;
  placeholder: string;
}

// User profile interface for Firebase
export interface UserProfile {
  mentor: string;
  'describe-yourself': string;
  'decisions-you-make': string;
  'what-you-value': string;
  misunderstood: string;
  conversations: string;
  createdAt: string;
  updatedAt: string;
  status: string;
} 