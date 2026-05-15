import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = () => {
    API.get('/api/cart/').then(res => {
      setCart(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchCart(); }, []);

  const remove = async (product_id) => {
    await API.delete(`/api/cart/remove/${product_id}`);
    fetchCart();
  };

  const total = cart.reduce((sum, item) => sum + item.total, 0);

  if (loading) return <div style={styles.loading}>Loading cart...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p style={styles.empty}>Cart is empty!</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i} style={styles.item}>
              <div>
                <h3 style={styles.name}>{item.name}</h3>
                <p style={styles.qty}>Quantity: {item.quantity}</p>
              </div>
              <div style={styles.right}>
                <p style={styles.price}>₹{item.total}</p>
                <button onClick={() => remove(item.product_id)} style={styles.removeBtn}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={styles.total}>
            Total: ₹{total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { background: '#1a1a2e', minHeight: '100vh', padding: '2rem', maxWidth: '800px', margin: '0 auto' },
  heading: { color: 'white', textAlign: 'center' },
  empty: { color: '#aaa', textAlign: 'center', fontSize: '1.2rem' },
  item: { background: '#16213e', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  name: { color: 'white', margin: 0 },
  qty: { color: '#aaa', margin: '0.3rem 0 0' },
  right: { textAlign: 'right' },
  price: { color: '#e94560', fontWeight: 'bold', fontSize: '1.2rem', margin: 0 },
  removeBtn: { background: 'transparent', color: '#e94560', border: '1px solid #e94560', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer', marginTop: '0.5rem' },
  total: { color: 'white', textAlign: 'right', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem', padding: '1rem', background: '#16213e', borderRadius: '8px' },
  loading: { color: 'white', textAlign: 'center', marginTop: '5rem', fontSize: '1.5rem', background: '#1a1a2e', minHeight: '100vh' },
};

export default Cart;