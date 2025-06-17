import { useState } from "react";

export default function TestChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (data.answer) {
        setAnswer(data.answer);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (err) {
      setError("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h2>Test Chat API</h2>
      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ask something..."
        style={{ width: 300, marginRight: 10, padding: 6 }}
      />
      <button onClick={handleAsk} disabled={loading || !question.trim()}>
        {loading ? "Loading..." : "Ask"}
      </button>
      <div style={{ marginTop: 20 }}>
        <strong>Answer:</strong>
        <div style={{ marginTop: 8, color: error ? 'red' : 'black' }}>
          {error ? error : answer}
        </div>
      </div>
    </div>
  );
} 