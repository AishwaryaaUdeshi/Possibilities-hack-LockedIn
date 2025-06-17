const profile = {
  name: "Kenny",
  university: "Columbia University",
  program: "QuestBridge match",
  interests: [
    "education",
    "climate change",
    "artificial intelligence",
    "quantitative finance"
  ],
  email: "kenny.frias@columbia.edu",
  description:
    "Hi! My name is Kenny, and I am a QuestBridge match to Columbia University. At Columbia, I am building a deep intuition for problem-solving with the goal of utilizing technology to make tangible impacts in my areas of interest, which include education, climate change, artificial intelligence, and quantitative finance. Feel free to reach out to kenny.frias@columbia.edu!",
  threeWords: ["Curious", "Driven", "Empathetic"],
  lookingForMentorship: true,
  mentorshipCriteria: ["growth mindset", "interest in technology", "passion for impact"],
  role: "SDE Intern @ Amazon | Math + CS @ Columbia"
};

function isMentorshipMatch(message) {
  // Simple logic: if user mentions growth, technology, or impact, it's a match
  const matchWords = ["growth", "technology", "impact", "mentor", "mentorship"];
  return matchWords.some(word => message.toLowerCase().includes(word));
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }
    const msg = message.toLowerCase();
    let reply = '';

    // Direct Q&A from profile
    if (msg.includes('name')) {
      reply = `My name is ${profile.name}.`;
    } else if (msg.includes('university') || msg.includes('school')) {
      reply = `I attend ${profile.university}.`;
    } else if (msg.includes('questbridge')) {
      reply = `Yes, I am a QuestBridge match at ${profile.university}.`;
    } else if (msg.includes('email')) {
      reply = `You can reach me at ${profile.email}.`;
    } else if (msg.includes('describe')) {
      reply = `Three words to describe me: ${profile.threeWords.join(', ')}.`;
    } else if (msg.includes('interest') || msg.includes('passion')) {
      reply = `I'm interested in ${profile.interests.join(', ')}.`;
    } else if (msg.includes('goal')) {
      reply = `My goal is to utilize technology to make tangible impacts in my areas of interest.`;
    } else if (msg.includes('role') || msg.includes('job') || msg.includes('position')) {
      reply = `I am currently a ${profile.role}.`;
    } else if (msg.includes('mentor') || msg.includes('mentorship')) {
      if (isMentorshipMatch(message)) {
        reply = `You seem like a great match for mentorship! Would you like to have a deeper chat about how we can work together?`;
      } else {
        reply = `Mentorship is important to me. What are you looking for in a mentor or mentee?`;
      }
    } else if (msg.includes('hello') || msg.includes('hi')) {
      reply = `Hi there! How can I help you today?`;
    } else if (msg.includes('thank')) {
      reply = `You're welcome! Let me know if you have more questions.`;
    } else {
      // Generic fallback
      reply = `I'm here to help with any questions about my background, interests, or mentorship!`;
    }

    res.status(200).json({ reply });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 