import { NextApiRequest, NextApiResponse } from 'next';
import { Speechify } from "@speechify/api-sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { audioData } = req.body;

    if (!audioData) {
      return res.status(400).json({ error: 'Audio data is required' });
    }

    console.log('Received audio data length:', audioData.length);

    const speechify = new Speechify({ 
      apiKey: process.env.NEXT_PUBLIC_SPEECHIFY_API_KEY 
    });

    console.log('Sending request to Speechify...');
    
    // Process the audio using Speechify's API
    const response = await speechify.audioGenerate({
      input: audioData,
      voiceId: "george",
      audioFormat: "mp3"
    });

    console.log('Received response from Speechify');

    // Create a blob URL for the audio
    const audioBlob = new Blob([response.audioData], { type: 'audio/mp3' });
    const audioUrl = URL.createObjectURL(audioBlob);

    return res.status(200).json({ audioUrl });
  } catch (error) {
    console.error('Speechify API error:', error);
    return res.status(500).json({ 
      error: 'Failed to process audio',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 