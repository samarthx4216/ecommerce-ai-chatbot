import React, { useState } from 'react';
import API from '../api/axios';

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await API.post('/api/chat/', {
        message: input,
        history: messages,
      });
      setMessages([...newMessages, {
        role: 'assistant',
        content: res.data.response
      }]);
    } catch (err) {
      setMessages([...newMessages, {
        role: 'assistant',
        content: 'Sorry, something went wrong!'
      }]);
    }
    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      {open && (
        <div style={styles.box}>
          <div style={styles.header}>
            🤖 AI Assistant
            <button onClick={() => setOpen(false)} style={styles.close}>✕</button>
          </div>
          <div style={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} style={{
                ...styles.msg,
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                background: m.role === 'user' ? '#e94560' : '#16213e',
              }}>
                {m.content}
              </div>
            ))}
            {loading && <div style={{...styles.msg, background: '#16213e'}}>Typing...</div>}
          </div>
          <div style={styles.inputArea}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} style={styles.sendBtn}>Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} style={styles.fab}>
        💬
      </button>
    </div>
  );
};

const styles = {
  wrapper: { position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 },
  box: {
    width: '320px',
    height: '450px',
    background: '#0f3460',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    overflow: 'hidden',
  },
  header: {
    background: '#16213e',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
  },
  close: { background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem' },
  messages: {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  msg: {
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    maxWidth: '80%',
    fontSize: '0.9rem',
  },
  inputArea: { display: 'flex', padding: '0.5rem', gap: '0.5rem', background: '#16213e' },
  input: {
    flex: 1,
    padding: '0.5rem',
    borderRadius: '5px',
    border: 'none',
    background: '#0f3460',
    color: 'white',
  },
  sendBtn: {
    background: '#e94560',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  fab: {
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    background: '#e94560',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ChatBot;