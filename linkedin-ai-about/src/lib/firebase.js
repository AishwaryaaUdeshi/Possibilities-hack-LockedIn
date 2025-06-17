import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// You'll need to replace these with your actual Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyAG0R9mfLxaebZB2DfGnzFR6YHHZgHP5OA",
    authDomain: "linkedin2025.firebaseapp.com",
    projectId: "linkedin2025",
    storageBucket: "linkedin2025.firebasestorage.app",
    messagingSenderId: "834178383373",
    appId: "1:834178383373:web:a360edafbb9533b5019f44"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app; 