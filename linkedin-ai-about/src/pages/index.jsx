import React, { useState, useRef, useEffect } from 'react';
import AboutSection from '../components/AboutSection';
import AskAnything from '../components/AskAnything';
import ChatModal from '../components/ChatModal';

const aboutText = `Hi! My name is Kenny, and I am a QuestBridge match to Columbia University. At Columbia, I am building a deep intuition for problem-solving with the goal of utilizing technology to make tangible impacts in my areas of interest, which include education, climate change, artificial intelligence, and quantitative finance. Feel free to reach out to kenny.frias@columbia.edu!`;

const promptSuggestions = [
  'Where did you go to school?',
  'What are your interests?',
  'Are you open to mentorship?'
];

export default function Home() {
  const [input, setInput] = useState('');
  const [modalInput, setModalInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const chatEndRef = useRef(null);
  const modalInputRef = useRef(null);

  const handleSend = async () => {
    if (!modalInput.trim() || loading) return;
    const userMsg = { from: 'user', text: modalInput };
    setChat(prev => [...prev, userMsg]);
    setModalInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      });
      const data = await res.json();
      setChat(prev => [...prev, { from: 'bot', text: data.reply }]);
    } catch (err) {
      setChat(prev => [...prev, { from: 'bot', text: 'Sorry, something went wrong.' }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!chatOpen) {
        setChatOpen(true);
        setModalInput(input);
        setInput('');
      } else {
        handleSend();
      }
    }
  };

  const handleMainInputClick = () => {
    setChatOpen(true);
    setModalInput(input);
    setInput('');
    setTimeout(() => {
      if (modalInputRef.current) {
        modalInputRef.current.focus();
      }
    }, 0);
  };

  const handlePromptClick = (prompt) => {
    setModalInput(prompt);
    if (modalInputRef.current) {
      modalInputRef.current.focus();
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat, chatOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-lg flex flex-col gap-8">
        <AboutSection />
        
        <AskAnything
          input={input}
          onInputChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onInputClick={handleMainInputClick}
        />

        <ChatModal
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          chat={chat}
          loading={loading}
          modalInput={modalInput}
          onModalInputChange={(e) => setModalInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onSend={handleSend}
          onPromptClick={handlePromptClick}
          modalInputRef={modalInputRef}
          chatEndRef={chatEndRef}
        />
      </div>
    </div>
  );
} 