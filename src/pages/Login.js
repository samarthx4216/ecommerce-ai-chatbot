import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
        <button onClick={handleSubmit} style={styles.btn}>Login</button>
        <p style={{color: 'white', textAlign: 'center'}}>
          Account nahi hai? <Link to="/register" style={{color: '#e94560'}}>Register</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a2e' },
  box: { background: '#16213e', padding: '2rem', borderRadius: '12px', width: '350px', display: 'flex', flexDirection: 'column', gap: '1rem' },
  title: { color: 'white', textAlign: 'center', margin: 0 },
  input: { padding: '0.8rem', borderRadius: '8px', border: '1px solid #0f3460', background: '#0f3460', color: 'white' },
  btn: { padding: '0.8rem', background: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  error: { color: '#e94560', textAlign: 'center' },
};

export default Login;