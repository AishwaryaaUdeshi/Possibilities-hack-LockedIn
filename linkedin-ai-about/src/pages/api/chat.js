import { getDynamicSystemPrompt } from "./prompt";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Default system prompt if profile not found
const defaultSystemPrompt = `
You are a friendly AI assistant. You're chatting with visitors through a custom AI interface.
Keep responses casual, direct, and helpful. Avoid long messages and keep it personal.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question } = req.body;
    console.log('Received question:', question);
    
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return res.status(500).json({ error: "OpenAI API key is not configured" });
    }

    // Try to get dynamic prompt, fallback to default if it fails
    let systemPrompt;
    try {
      console.log('Attempting to fetch demo-user profile...');
      systemPrompt = await getDynamicSystemPrompt("demo-user");
      console.log('Successfully got system prompt');
    } catch (error) {
      console.error("Error getting profile:", error);
      systemPrompt = defaultSystemPrompt;
      console.log('Using default system prompt');
    }

    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ],
      max_tokens: 300,
      temperature: 0.8,
    });

    const answer = completion.choices[0].message.content;
    console.log('Received answer from OpenAI');

    res.status(200).json({ answer });
  } catch (error) {
    console.error('Error in chat handler:', error);
    res.status(500).json({ 
      error: "Failed to send message",
      details: error.message 
    });
  }
} 