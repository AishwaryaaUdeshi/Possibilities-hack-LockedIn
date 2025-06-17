# LinkedIn My Network Clone

A React-based LinkedIn "My Network" page clone that focuses on mentor-mentee matching with AI-powered verification and scheduling capabilities.

## Features

### Core Functionality
- **LinkedIn-style My Network page** - Imitates the look and feel of LinkedIn's network page
- **Connect Requests** - Display pending connection requests with profile pictures, names, and taglines
- **Verified Match System** - Gold "Verified Match" badges for AI-verified mentor-mentee pairs
- **Smart Filtering** - Verified matches are automatically sorted to the top of the list

### Interactive Features
- **Summary Tooltips** - Hover over the summary icon to view chatbot interaction summaries
- **Calendar Integration** - Click the calendar icon to schedule meetings with mentees
- **Accept/Decline Actions** - Standard LinkedIn-style connection management
- **Email Notifications** - Automatic calendar invites sent to both parties

### Technical Features
- **TypeScript** - Full type safety throughout the application
- **Next.js API Routes** - Backend functionality for data management
- **Tailwind CSS** - Modern, responsive styling
- **Mock Database** - Sample data structure ready for real database integration

## Project Structure

```
linkedin-ai-about/
├── components/
│   ├── MyNetwork.tsx          # Main network page component
│   ├── ConnectRequest.tsx     # Individual connection request
│   ├── VerifiedMatchBadge.tsx # Gold verified match badge
│   ├── SummaryTooltip.tsx     # Chatbot summary tooltip
│   └── CalendarPopup.tsx      # Meeting scheduling popup
├── types/
│   └── network.ts             # TypeScript type definitions
├── src/
│   ├── pages/
│   │   ├── mynetwork.tsx      # Demo page
│   │   └── api/               # Backend API routes
│   │       ├── connect-requests.ts
│   │       ├── connect-requests/
│   │       │   ├── accept.ts
│   │       │   └── decline.ts
│   │       └── schedule-meeting.ts
│   └── styles/
│       └── globals.css        # Global styles
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd linkedin-ai-about
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup

**⚠️ IMPORTANT: Never commit sensitive files to GitHub!**

Create a `.env.local` file in the project root with the following variables:

```env
# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Gmail App Password Setup:**
1. Enable 2-Step Verification on your Google account
2. Go to Google Account settings → Security → App passwords
3. Generate an app password for "Mail"
4. Use this password in `EMAIL_PASS`

**Firebase Setup:**
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Get your config from Project Settings → General → Your apps
3. Download your service account key and save as `serviceAccountKey.json` (this file is automatically ignored by git)

4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000/mynetwork](http://localhost:3000/mynetwork) in your browser

## Usage

### Viewing the Demo
- Visit `/mynetwork` to see the LinkedIn My Network page
- The demo uses mock data with user ID "1" as the current user
- You'll see 3 connection requests, with 2 being verified matches

### Verified Match Features
- **Gold Badge**: Verified matches display a gold "Verified Match" badge
- **Summary Icon**: Hover to see the chatbot interaction summary
- **Calendar Icon**: Click to schedule a meeting with the mentee
- **Top Priority**: Verified matches appear at the top of the list

### Scheduling Meetings
1. Click the calendar icon next to a verified match
2. Select a date from the next 7 days
3. Choose an available time slot
4. Click "Schedule Meeting" to send calendar invites

## API Endpoints

### GET /api/connect-requests
Fetches connection requests for a user
- Query params: `userId` (string)

### POST /api/connect-requests/accept
Accepts a connection request
- Body: `{ requestId: string, userId: string }`

### POST /api/connect-requests/decline
Declines a connection request
- Body: `{ requestId: string, userId: string }`

### POST /api/schedule-meeting
Schedules a meeting and sends calendar invites
- Body: `{ date: string, time: string, menteeEmail: string, mentorEmail: string, menteeName: string }`

## Database Integration

The current implementation uses mock data. To integrate with a real database:

1. Replace the mock data in `/src/pages/api/connect-requests.ts`
2. Update the API routes to use your database connection
3. Implement proper email sending functionality
4. Add authentication and user management

## Customization

### Styling
- Modify `src/styles/globals.css` for global styles
- Update Tailwind classes in components for specific styling
- The design closely follows LinkedIn's visual patterns

### Data Structure
- Update types in `types/network.ts` to match your database schema
- Modify the mock data structure in the API routes
- Add additional fields as needed for your use case

## Technologies Used

- **React 19** - UI framework
- **Next.js 15** - Full-stack framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **ESLint** - Code linting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes and demonstrates LinkedIn-style functionality.
