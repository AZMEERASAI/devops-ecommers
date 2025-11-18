// src/pages/Landing.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h2 style={styles.logo}>Ecommerce App</h2>
        <nav>
          <ul style={styles.navList}>
            <li><a href="#home" style={styles.navLink}>Home</a></li>
            <li><a href="#about" style={styles.navLink}>About</a></li>
            <li><a href="#contact" style={styles.navLink}>Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to Ecommerce App</h1>
        <div style={styles.buttonGroup}>
          <button onClick={() => navigate('/login')} style={styles.button}>Login</button>
          <button onClick={() => navigate('/signup')} style={styles.buttonOutline}>Signup</button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={styles.section}>
        <h2 style={styles.sectionTitle}>About</h2>
        <p style={styles.sectionText}>
          Our Ecommerce App makes online shopping simple and fast. You can browse products,
          add them to your cart, and place orders securely. Whether you're buying clothes,
          gadgets, or groceries – we’ve got it all!
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.section}>
        <h2 style={styles.sectionTitle}>Contact</h2>
        <p style={styles.sectionText}>
          📞 Phone: <a href="tel:9010854701" style={styles.contactLink}>9010854701</a><br />
          📧 Email: <a href="mailto:azmeerasai123456789@gmail.com" style={styles.contactLink}>azmeerasai123456789@gmail.com</a>
        </p>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Ecommerce App. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    color: '#fff',
    fontSize: '24px',
    margin: 0,
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '25px',
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s',
  },
  hero: {
    height: '100vh',
    textAlign: 'center',
    padding: '0 20px',
    backgroundColor: '#ecf0f1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: '42px',
    marginBottom: '30px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    backgroundColor: '#2980b9',
    color: '#fff',
    padding: '12px 30px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    color: '#2980b9',
    border: '2px solid #2980b9',
    padding: '10px 28px',
    fontSize: '16px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  section: {
    padding: '80px 40px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  sectionTitle: {
    fontSize: '28px',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  sectionText: {
    fontSize: '18px',
    lineHeight: '1.6',
  },
  contactLink: {
    color: '#2980b9',
    textDecoration: 'none',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#2c3e50',
    color: '#fff',
  },
};

export default Landing;

