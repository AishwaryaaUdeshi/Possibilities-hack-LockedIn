import React, { useState, useRef, useEffect } from 'react';

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
    // Focus the modal input after opening
    setTimeout(() => {
      if (modalInputRef.current) {
        modalInputRef.current.focus();
      }
    }, 0);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat, chatOpen]);

  const handlePromptClick = (prompt) => {
    setModalInput(prompt);
    if (modalInputRef.current) {
      modalInputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-lg flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">About</h2>
          <p className="text-gray-700 mb-2">{aboutText}</p>
          <span className="text-gray-400 text-sm">kenny.frias@columbia.edu</span>
        </div>
        {/* Ask anything input area under About Me */}
        <div className="w-full flex items-center bg-white rounded-lg border border-gray-300 hover:border-blue-400 transition-colors">
          <input
            className="flex-1 bg-transparent outline-none text-[14px] leading-[20px] text-gray-900 px-4 py-3 cursor-pointer"
            type="text"
            placeholder="Ask anything"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={handleMainInputClick}
            readOnly
          />
          <div className="flex items-center gap-2 px-3">
            <button className="text-gray-500 hover:text-gray-700" type="button" tabIndex={-1}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700" type="button" tabIndex={-1}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat window modal */}
        {chatOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md flex flex-col" style={{ minHeight: 420, maxHeight: 520 }}>
              {/* LinkedIn-style header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <img 
                    src="/profile.jpg" 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                    }}
                  />
                  <div>
                    <div className="font-sans text-[16px] leading-[20px] font-medium text-gray-900">Kenny Frias</div>
                    <div className="text-[14px] leading-[16px] text-gray-500">SDE Intern @ Amazon | Math + CS @ Columbia</div>
                  </div>
                </div>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Chat content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Prompt suggestions */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {promptSuggestions.map((prompt, idx) => (
                    <button
                      key={idx}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-[14px] leading-[16px] px-3 py-1.5 rounded-full border border-blue-200 transition"
                      onClick={() => handlePromptClick(prompt)}
                      type="button"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Messages */}
                <div className="space-y-3">
                  {chat.map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`px-4 py-2 rounded-2xl text-[14px] leading-[20px] ${
                        msg.from === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="px-4 py-2 rounded-2xl bg-gray-100 text-gray-500 text-[14px] leading-[20px] animate-pulse">
                        Typing...
                      </div>
                    </div>
                  )}
                </div>
                <div ref={chatEndRef} />
              </div>

              {/* Input area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300">
                  <input
                    ref={modalInputRef}
                    className="flex-1 px-3 py-2 bg-transparent outline-none text-[14px] leading-[20px] text-gray-900 placeholder-gray-500"
                    type="text"
                    placeholder="Write a message..."
                    value={modalInput}
                    onChange={e => setModalInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                  />
                  <button
                    className={`px-3 py-2 ${modalInput.trim() ? 'text-blue-600' : 'text-gray-400'}`}
                    onClick={handleSend}
                    disabled={loading || !modalInput.trim()}
                    type="button"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 