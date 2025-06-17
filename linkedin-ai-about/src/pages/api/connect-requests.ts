import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { ConnectRequestData } from '../../../types/network';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Query Firebase for interactions where the current user is the mentor
    const interactionsRef = collection(db, 'interactions');
    const q = query(
      interactionsRef,
      where('mentorEmail', '==', 'aishwaryaa.udeshi@gmail.com'), // Assuming this is the current user
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const connectRequests: ConnectRequestData[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      connectRequests.push({
        id: doc.id,
        name: data.menteeProfile.name,
        tagline: data.menteeProfile.tagline,
        email: data.menteeEmail,
        mentorEmail: data.mentorEmail,
        profilePicture: data.menteeProfile.profilePicture,
        isVerifiedMatch: data.isVerifiedMatch,
        chatbotSummary: data.chatSummary,
        availability: data.availability,
        createdAt: data.createdAt.toDate().toISOString()
      });
    });

    // Sort: verified matches first, then by creation date
    const sortedRequests = connectRequests.sort((a, b) => {
      if (a.isVerifiedMatch && !b.isVerifiedMatch) return -1;
      if (!a.isVerifiedMatch && b.isVerifiedMatch) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    res.status(200).json(sortedRequests);
  } catch (error: any) {
    console.error('Error fetching connect requests:', error);
    
    // If it's an index error, return empty array instead of 500
    if (error.code === 'failed-precondition') {
      console.log('Firestore index not ready yet, returning empty array');
      res.status(200).json([]);
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 