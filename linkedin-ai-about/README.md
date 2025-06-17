# LinkedIn BioBot

An interactive AI-powered profile experience that extends LinkedIn's static "About Me" section. Users build rich personal profiles through guided prompts, and visitors can engage with a personalized AI that mimics the user's communication style.

---

## 🚀 Overview

LinkedIn BioBot is a full-stack Next.js application that leverages OpenAI's GPT models to create dynamic, conversational "About Me" profiles. By combining structured user inputs with AI-driven chat, it allows users to showcase their personality far beyond static text.

---

## 🧰 Tech Stack

- **Frontend Framework:** Next.js 14.1.0
- **Language:** TypeScript / JavaScript
- **Styling:** CSS
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **AI Integration:** OpenAI GPT-3.5 Turbo
- **Testing:** Jest, React Testing Library

---

## 🏗️ System Components

### Pages

| Route              | Description |
|--------------------|-------------|
| `/`                | Redirects to guided profile creation |
| `/prompt-questions`| Guided questions for profile building |
| `/test-chat`       | AI chat interface for interaction |
| `/api/chat`        | Backend integration with OpenAI |
| `/api/prompt`      | Dynamic system prompt generator |

### Core Components

- **Further Familiarization** — Displays profile data and prompt suggestions.
- **Ask me Anything** — User input field for AI chat interaction.
- **Chat Model** — Full chat interface, chat state, scheduling integration.

---

## 🔄 Data Flow

### Profile Creation Flow

1️⃣ User answers guided questions  
2️⃣ Answers are validated  
3️⃣ Profile saved to Firestore  
4️⃣ System prompt is dynamically generated  
5️⃣ Chat interface becomes available

### Chat Flow

1️⃣ User sends a message  
2️⃣ Message processed by OpenAI  
3️⃣ AI generates context-aware response  
4️⃣ Response displayed with typing animation  
5️⃣ Scheduling flow triggered

---

## 🗄️ State Management

- React Hooks for local state
- Firebase Firestore for persistence
- Context API for shared global state (if needed)

---

## 🌐 API Endpoints

### `/api/chat`
- Handles chat request processing
- Integrates with OpenAI GPT-3.5 Turbo
- Manages user-specific context

### `/api/prompt`
- Fetches user profile data
- Generates personalized system prompts

---

## 🗃️ Database Schema

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
