import { NextApiRequest, NextApiResponse } from 'next';
import { Speechify } from "@speechify/api-sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_SPEECHIFY_API_KEY;
    
    if (!apiKey) {
      console.error('API key is missing');
      return res.status(500).json({ error: 'API key is not configured' });
    }

    console.log('API Key length:', apiKey.length);
    
    const speechify = new Speechify({ 
      apiKey: apiKey
    });

    console.log('Getting access token...');
    const token = await speechify.accessTokenIssue("audio:speech");
    console.log('Token received successfully');
    
    res.json(token);
  } catch (error) {
    console.error('Speechify token error:', error);
    res.status(500).json({ 
      error: 'Failed to get access token',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 