import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    API.get('/api/products/').then(res => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  const addToCart = async (product_id) => {
    try {
      await API.post('/api/cart/add', { product_id, quantity: 1 });
      setMsg('Added to cart! ✅');
      setTimeout(() => setMsg(''), 2000);
    } catch {
      setMsg('Please login first!');
      setTimeout(() => setMsg(''), 2000);
    }
  };

  if (loading) return <div style={styles.loading}>Loading products...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Products</h2>
      {msg && <div style={styles.toast}>{msg}</div>}
      <div style={styles.grid}>
        {products.map(p => (
          <div key={p.id} style={styles.card}>
            <div style={styles.imageBox}>🛍️</div>
            <h3 style={styles.name}>{p.name}</h3>
            <p style={styles.desc}>{p.description}</p>
            <p style={styles.price}>₹{p.price}</p>
            <p style={styles.category}>{p.category}</p>
            <button onClick={() => addToCart(p.id)} style={styles.btn}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { background: '#1a1a2e', minHeight: '100vh', padding: '2rem' },
  heading: { color: 'white', textAlign: 'center', marginBottom: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' },
  card: { background: '#16213e', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  imageBox: { fontSize: '3rem', textAlign: 'center' },
  name: { color: 'white', margin: 0 },
  desc: { color: '#aaa', fontSize: '0.9rem', margin: 0 },
  price: { color: '#e94560', fontWeight: 'bold', fontSize: '1.2rem', margin: 0 },
  category: { color: '#888', fontSize: '0.8rem', margin: 0 },
  btn: { background: '#e94560', color: 'white', border: 'none', padding: '0.7rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '0.5rem' },
  loading: { color: 'white', textAlign: 'center', marginTop: '5rem', fontSize: '1.5rem', background: '#1a1a2e', minHeight: '100vh' },
  toast: { background: '#e94560', color: 'white', padding: '0.8rem', borderRadius: '8px', textAlign: 'center', marginBottom: '1rem' },
};

export default Home;