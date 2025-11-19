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
    <div className="page">
      {/* Header */}
      <header className="header">
        <h2 className="header__logo">Ecommerce App</h2>
        <nav>
          <ul className="header__nav">
            <li className="header__nav-item">
              <a href="#home" className="header__nav-link">Home</a>
            </li>
            <li className="header__nav-item">
              <a href="#about" className="header__nav-link">About</a>
            </li>
            <li className="header__nav-item">
              <a href="#contact" className="header__nav-link">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <h1 className="hero__title">Welcome to Ecommerce App</h1>
        <div className="hero__actions">
          <button onClick={() => navigate('/login')} className="button button--primary">
            Login
          </button>
          <button onClick={() => navigate('/signup')} className="button button--outline">
            Signup
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <h2 className="section__title">About</h2>
        <p className="section__text">
          Our Ecommerce App makes online shopping simple and fast. You can browse products,
          add them to your cart, and place orders securely. Whether you're buying clothes,
          gadgets, or groceries – we've got it all!
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section section--alt">
        <h2 className="section__title">Contact</h2>
        <p className="section__text">
          📞 Phone: <a href="tel:9010854701" className="section__link">9010854701</a><br />
          📧 Email: <a href="mailto:azmeerasai123456789@gmail.com" className="section__link">azmeerasai123456789@gmail.com</a>
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Ecommerce App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
