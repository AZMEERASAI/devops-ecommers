
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();

  const fetchCart = () => {
    API.get('/cart').then(res => setCart(res.data));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`);
    fetchCart();
  };

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // const total = cart.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
  const total = cart.reduce((acc, item) => {
  if (item && item.item && item.item.price) {
    return acc + item.item.price * item.quantity;
  }
  return acc;
}, 0);


  return (
    <div style={styles.container}>
      {/* Navbar */}
      <header style={styles.navbar}>
        <div style={styles.logo}>🛍️ ShopEase</div>
        <nav style={styles.navLinks}>
          <button onClick={() => navigate('/')} style={styles.navBtn}>Home</button>
          <button onClick={() => scrollToSection(aboutRef)} style={styles.navBtn}>About</button>
          <button onClick={() => scrollToSection(contactRef)} style={styles.navBtn}>Contact</button>
          <button onClick={() => navigate('/cart')} style={styles.navBtn}>🛒 Cart</button>
          <button onClick={handleLogout} style={styles.navBtn}>Logout</button>
        </nav>
      </header>

      {/* Cart Section */}
      <section style={styles.cartSection}>
        <h2 style={styles.sectionTitle}>Your Cart</h2>
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '16px' }}>Your cart is empty.</p>
        ) : (
          // 
          cart.map((c, i) => (
  <div key={i} style={styles.card}>
    <div>
      <h3 style={styles.cardTitle}>{c.item?.name || 'Unnamed Item'}</h3>
      <p style={styles.cardPrice}>₹{c.item?.price ?? 0} × {c.quantity}</p>
    </div>
    <button style={styles.removeBtn} onClick={() => removeItem(c._id)}>Remove</button>
  </div>
))
        )}
        {cart.length > 0 && <h3 style={styles.total}>Total: ₹{total}</h3>}
      </section>

      {/* About Section */}
      <section style={styles.section} ref={aboutRef}>
        <h2 style={styles.sectionTitle}>About</h2>
        <p style={styles.sectionText}>
          Welcome to ShopEase – your trusted destination for hassle-free shopping.
          We bring you a wide range of products with the best deals and fast delivery.
          Enjoy shopping with us!
        </p>
      </section>

      {/* Contact Section */}
      <section style={styles.section} ref={contactRef}>
        <h2 style={styles.sectionTitle}>Contact</h2>
        <p style={styles.sectionText}>
          📞 Phone: <a href="tel:9010854701" style={styles.link}>9010854701</a><br />
          📧 Email: <a href="mailto:azmeerasai123456789@gmail.com" style={styles.link}>azmeerasai123456789@gmail.com</a>
        </p>
      </section>

      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  navbar: {
    backgroundColor: '#1f2937',
    color: '#fff',
    padding: '15px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  navBtn: {
    background: 'none',
    color: '#fff',
    border: 'none',
    fontSize: '15px',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'background 0.3s ease',
  },
  cartSection: {
    padding: '40px 60px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '26px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#111827',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '14px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: '18px',
    marginBottom: '6px',
  },
  cardPrice: {
    fontSize: '16px',
    color: '#10b981',
  },
  removeBtn: {
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  total: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '30px',
  },
  section: {
    backgroundColor: '#fff',
    padding: '60px 40px',
    borderTop: '1px solid #e5e7eb',
  },
  sectionText: {
    fontSize: '17px',
    lineHeight: '1.6',
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#1f2937',
    color: '#fff',
    fontSize: '14px',
  },
};

export default Cart;
