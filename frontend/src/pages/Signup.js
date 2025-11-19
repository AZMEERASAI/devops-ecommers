// src/pages/Signup.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!form.name || !form.email || !form.password) {
      alert('Please fill in all required fields');
      return;
    }

    if (form.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await API.post('/auth/signup', form);
      if (response.data.message) {
        alert('Signup successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Signup failed. Please try again.';
      alert(errorMessage);
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="page">
      {/* Navbar */}
      <header className="header">
        <h2 className="header__logo">Ecommerce App</h2>
        <nav>
          <ul className="header__nav">
            <li className="header__nav-item">
              <a href="/" className="header__nav-link">Home</a>
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

      {/* Signup Form */}
      <div className="form__wrapper">
        <div className="form__container">
          <form onSubmit={handleSubmit} className="form">
            <h2 className="form__title">Signup</h2>
            <div className="form__group">
              <input
                placeholder="Name"
                required
                className="form__input"
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form__group">
              <input
                placeholder="Email"
                required
                type="email"
                className="form__input"
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="form__group">
              <input
                placeholder="Password"
                required
                type="password"
                className="form__input"
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="form__group">
              <select
                className="form__select"
                onChange={e => setForm({ ...form, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="button button--primary button--large">
              Signup
            </button>
          </form>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="section section--spaced">
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
}

export default Signup;
