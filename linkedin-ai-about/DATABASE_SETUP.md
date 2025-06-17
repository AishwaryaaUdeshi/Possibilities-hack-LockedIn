# Database Setup Guide

This guide will help you set up the Firebase database and populate it with the 10 mentor-mentee interactions.

## Prerequisites

1. **Firebase Project**: You need a Firebase project set up
2. **Firebase CLI**: Install Firebase CLI if not already installed
3. **Node.js**: Ensure Node.js is installed

## Step 1: Firebase Configuration

### Get Your Firebase Config

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. Click on the web app or create a new one
6. Copy the config object

### Set Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Step 2: Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose the closest to your users)

## Step 3: Set Firestore Rules

Update your `firestore.rules` file:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /interactions/{document} {
      allow read, write: if true; // For development - make more restrictive for production
    }
  }
}
```

## Step 4: Populate Database

### Option A: Using Firebase Console (Manual)

1. Go to Firestore Database in Firebase Console
2. Click "Start collection"
3. Collection ID: `interactions`
4. Add documents manually using the data structure below

### Option B: Using Script (Recommended)

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase in your project**:
   ```bash
   firebase init firestore
   ```

4. **Create the population script**:
   Create a file `scripts/populate-database.js` with the content provided below.

5. **Run the script**:
   ```bash
   node scripts/populate-database.js
   ```

## Database Structure

Each interaction document contains:

```javascript
{
  mentorEmail: "aishwaryaa.udeshi@gmail.com",
  menteeEmail: "chris.gonzalez9388@gmail.com",
  mentorProfile: {
    name: "Aishwarya Udeshi",
    tagline: "Senior Software Engineer at Google | AI/ML Specialist | Mentor",
    company: "Google",
    role: "Senior Software Engineer",
    experience: "8+ years in AI/ML, Computer Vision, and Software Engineering"
  },
  menteeProfile: {
    name: "Chris Gonzalez",
    tagline: "Software Engineer at Microsoft | Looking to transition to AI/ML",
    company: "Microsoft",
    role: "Software Engineer",
    experience: "3 years in full-stack development, interested in AI/ML"
  },
  chatHistory: [
    {
      sender: "mentee",
      message: "Hi Aishwarya! I'm Chris...",
      timestamp: Timestamp
    },
    // ... more messages
  ],
  chatSummary: "Chris is a software engineer at Microsoft...",
  isVerifiedMatch: true,
  createdAt: Timestamp,
  availability: {
    timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    timezone: 'PST',
    preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday']
  }
}
```

## 10 Interactions Included

1. **Chris Gonzalez** (Microsoft) - Software Engineer → AI/ML transition
2. **Sarah Johnson** (Netflix) - Data Scientist → Deep learning
3. **Michael Chen** (Microsoft) - Product Manager → AI product perspective
4. **Emily Rodriguez** (Apple) - UX Designer → AI-powered design
5. **David Kim** (Facebook) - Frontend Developer → AI integration
6. **Lisa Wang** (Amazon) - DevOps Engineer → ML infrastructure
7. **Alex Thompson** (Stanford) - Research Scientist → Industry applications
8. **James Wilson** (Cisco) - Security Engineer → AI in cybersecurity
9. **Maria Garcia** (Uber) - Data Analyst → Predictive analytics
10. **Rachel Brown** (Airbnb) - Product Designer → AI-enhanced UX

## Verification Status

- **Verified Matches** (Gold Badge): Chris, Sarah, Michael, Emily, Alex, James
- **Regular Requests**: David, Lisa, Maria, Rachel

## Testing the Integration

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Visit the My Network page**:
   ```
   http://localhost:3000/mynetwork
   ```

3. **Verify the data**:
   - Check that all 10 interactions appear
   - Verify that verified matches show gold badges
   - Test summary tooltips and calendar functionality

## Troubleshooting

### Common Issues

1. **"Firebase not initialized" error**:
   - Check that environment variables are set correctly
   - Restart the development server

2. **"Permission denied" error**:
   - Check Firestore rules
   - Ensure you're in test mode for development

3. **"No data showing"**:
   - Verify the collection name is `interactions`
   - Check that documents have the correct structure
   - Ensure the mentor email matches `aishwaryaa.udeshi@gmail.com`

### Debug Steps

1. **Check Firebase Console**:
   - Verify documents exist in the `interactions` collection
   - Check document structure matches expected format

2. **Check Network Tab**:
   - Look for API calls to `/api/connect-requests`
   - Check for any error responses

3. **Check Console Logs**:
   - Look for any JavaScript errors
   - Check for Firebase initialization errors

## Production Considerations

For production deployment:

1. **Update Firestore Rules**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /interactions/{document} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.token.email == resource.data.mentorEmail;
       }
     }
   }
   ```

2. **Environment Variables**:
   - Set production environment variables
   - Use proper Firebase project for production

3. **Security**:
   - Enable authentication
   - Implement proper user management
   - Add data validation

## Support

If you encounter issues:

1. Check the Firebase Console for any errors
2. Verify your Firebase configuration
3. Check the browser console for JavaScript errors
4. Ensure all dependencies are installed correctly 