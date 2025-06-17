# LinkedIn AI About - System Architecture

## Overview
LinkedIn AI About is a Next.js application that creates an interactive AI-powered profile experience. The system allows users to create profiles through guided questions and enables visitors to interact with an AI that mimics the profile owner's communication style.

## Tech Stack
- **Frontend Framework**: Next.js 14.1.0
- **Language**: TypeScript/JavaScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI Integration**: OpenAI GPT-3.5 Turbo
- **Testing**: Jest, React Testing Library

## System Components

### 1. Pages
- **`/` (Home)**: Redirects to prompt questions
- **`/prompt-questions`**: Guided profile creation flow
- **`/test-chat`**: Chat interface testing page
- **`/api/chat`**: OpenAI integration endpoint
- **`/api/prompt`**: Dynamic system prompt generation

### 2. Core Components
- **`ChatModal`**: Main chat interface component
  - Handles message display
  - Manages typing animations
  - Controls chat state
  - Integrates with scheduling functionality

- **`AboutMe`**: Profile information display
  - Shows prompt suggestions
  - Manages user interactions
  - Integrates with chat functionality

- **`AskAnything`**: Chat input component
  - Handles user input
  - Manages keyboard events
  - Provides UI feedback

### 3. Data Flow

#### Profile Creation Flow
1. User answers guided questions
2. Answers are validated
3. Profile is saved to Firestore
4. System prompt is generated
5. Chat interface becomes available

#### Chat Flow
1. User sends message
2. Message is processed by OpenAI
3. Response is generated using profile context
4. Response is displayed with typing animation
5. Optional: Connection/scheduling flow is triggered

### 4. State Management
- React hooks for local state
- Firebase for persistent storage
- Context API for shared state (if needed)

### 5. API Structure

#### `/api/chat`
- Handles chat message processing
- Integrates with OpenAI
- Manages conversation context
- Returns formatted responses

#### `/api/prompt`
- Generates dynamic system prompts
- Fetches profile data
- Creates personalized AI context

### 6. Database Schema

#### User Profile
```typescript
interface UserProfile {
  mentor: string;
  'describe-yourself': string;
  'decisions-you-make': string;
  'what-you-value': string;
  misunderstood: string;
  conversations: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: string;
}
```

### 7. Security Considerations
- Firebase Authentication for user management
- API route protection
- Environment variable management
- Input validation and sanitization

### 8. Testing Strategy
- Unit tests for components
- Integration tests for API routes
- End-to-end testing for critical flows
- Mock implementations for external services

## Development Guidelines

### Code Organization
```
src/
├── components/     # React components
├── pages/         # Next.js pages
├── styles/        # CSS modules
├── lib/           # Utility functions
├── types/         # TypeScript definitions
├── constants/     # Application constants
└── hooks/         # Custom React hooks
```

### Best Practices
1. TypeScript for type safety
2. Component-based architecture
3. Responsive design principles
4. Error boundary implementation
5. Loading state management
6. Accessibility compliance

## Deployment
- Vercel for hosting
- Environment variable configuration
- Build optimization
- Performance monitoring

## Future Considerations
1. Enhanced AI capabilities
2. Real-time chat features
3. Analytics integration
4. Performance optimization
5. Additional profile customization
6. Enhanced scheduling system

## Performance Optimization
1. Code splitting
2. Image optimization
3. Caching strategies
4. Lazy loading
5. Bundle size optimization

## Monitoring and Maintenance
1. Error tracking
2. Performance monitoring
3. User analytics
4. Regular dependency updates
5. Security audits 