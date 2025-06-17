import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { db } from './firebase';

// Collection names
export const COLLECTIONS = {
  PROFILES: 'profiles',
  CHAT_LOGS: 'chatLogs',
  SPECIAL_REQUESTS: 'specialRequests'
};

// Save user profile data
export const saveProfile = async (profileData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.PROFILES), {
      ...profileData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
};

// Save chat log
export const saveChatLog = async (userId, messages, matchScore = null) => {
  try {
    const chatLog = {
      userId,
      messages,
      matchScore,
      timestamp: serverTimestamp(),
      messageCount: messages.length
    };
    
    const docRef = await addDoc(collection(db, COLLECTIONS.CHAT_LOGS), chatLog);
    return docRef.id;
  } catch (error) {
    console.error('Error saving chat log:', error);
    throw error;
  }
};

// Get chat logs for a user
export const getChatLogs = async (userId) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.CHAT_LOGS),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting chat logs:', error);
    throw error;
  }
};

// Save special connection request
export const saveSpecialRequest = async (fromUserId, toUserId, isSpecial = true) => {
  try {
    const request = {
      fromUserId,
      toUserId,
      isSpecial,
      timestamp: serverTimestamp(),
      status: 'pending'
    };
    
    const docRef = await addDoc(collection(db, COLLECTIONS.SPECIAL_REQUESTS), request);
    return docRef.id;
  } catch (error) {
    console.error('Error saving special request:', error);
    throw error;
  }
};

// Get all special requests (for recruiter view)
export const getSpecialRequests = async () => {
  try {
    const q = query(
      collection(db, COLLECTIONS.SPECIAL_REQUESTS),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting special requests:', error);
    throw error;
  }
};

export const getProfile = async (userId) => {
  const docRef = doc(db, "profiles", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("Profile not found");
  }
}; 