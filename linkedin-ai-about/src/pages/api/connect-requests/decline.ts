import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { requestId, userId } = req.body;

  if (!requestId || !userId) {
    return res.status(400).json({ message: 'Request ID and User ID are required' });
  }

  try {
    // In a real application, you would:
    // 1. Update the connection status in your database
    // 2. Send notification to the other user
    // 3. Update any relevant metrics
    
    console.log(`User ${userId} declined connection request ${requestId}`);
    
    // Mock successful response
    res.status(200).json({ 
      message: 'Connection request declined successfully',
      requestId,
      userId
    });
  } catch (error) {
    console.error('Error declining connection request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 