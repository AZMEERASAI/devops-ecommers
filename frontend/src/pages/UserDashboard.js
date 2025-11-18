
// export default UserDashboard;
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const UserDashboard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Refs for scrolling
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    API.get('/items').then(res => setItems(res.data));
  }, []);

  const addToCart = async (itemId) => {
    await API.post('/cart', { itemId });
    alert('Item added to cart');
  };
//   const addToCart = async (itemId) => {
//   try {
//     await API.post('/cart', { itemId });
//     setSuccessMessage('✅ Successfully added the course to your cart.');

//     setTimeout(() => setSuccessMessage(''), 3000); // Clear after 3 seconds
//   } catch (err) {
//     console.error(err);
//     setSuccessMessage('❌ Failed to add item to cart.');
//     setTimeout(() => setSuccessMessage(''), 3000);
//   }
// };


  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

      {/* Products Section */}
      <section style={styles.productsSection}>
        {items.map(item => (
          <div key={item._id} style={styles.card}>
            <img src={`http://localhost:5000${item.image}`} alt={item.name} style={styles.cardImage} />
            <h3 style={styles.cardTitle}>{item.name}</h3>
            <p>{item.description}</p>
            <p style={styles.price}>₹{item.price}</p>
            <button onClick={() => addToCart(item._id)} style={styles.addButton}>Add to Cart</button>
          </div>
        ))}
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

      {/* Footer */}
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
  productsSection: {
    padding: '40px 60px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '14px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '300px',
    height: '460px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
    transition: 'transform 0.2s ease-in-out',
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '12px',
  },
  cardTitle: {
    fontSize: '18px',
    margin: '10px 0 5px',
    flexShrink: 0,
  },
  price: {
    fontWeight: 'bold',
    color: '#10b981',
    margin: '10px 0',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '15px',
    marginTop: 'auto',
    cursor: 'pointer',
  },
  section: {
    backgroundColor: '#fff',
    padding: '60px 40px',
    borderTop: '1px solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: '26px',
    marginBottom: '15px',
    textAlign: 'center',
    color: '#111827',
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

export default UserDashboard;


