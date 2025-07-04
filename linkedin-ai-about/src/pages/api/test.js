export default function handler(req, res) {
  res.status(200).json({ 
    message: 'API is working!',
    method: req.method,
    timestamp: new Date().toISOString(),
    env: {
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      nodeEnv: process.env.NODE_ENV
    }
  });
} 