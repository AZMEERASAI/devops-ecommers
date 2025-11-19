// src/pages/UserDashboard.js
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
    <div className="page">
      {/* Navbar */}
      <header className="header">
        <div className="header__logo">🛍️ ShopEase</div>
        <nav>
          <ul className="header__nav">
            <li className="header__nav-item">
              <button onClick={() => navigate('/')} className="header__nav-button">Home</button>
            </li>
            <li className="header__nav-item">
              <button onClick={() => scrollToSection(aboutRef)} className="header__nav-button">About</button>
            </li>
            <li className="header__nav-item">
              <button onClick={() => scrollToSection(contactRef)} className="header__nav-button">Contact</button>
            </li>
            <li className="header__nav-item">
              <button onClick={() => navigate('/cart')} className="header__nav-button">🛒 Cart</button>
            </li>
            <li className="header__nav-item">
              <button onClick={handleLogout} className="header__nav-button header__nav-button--logout">Logout</button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Products Section */}
      <section className="products-section">
        {items.map(item => (
          <div key={item._id} className="card card--product">
            <img 
              src={`http://localhost:5000${item.image}`} 
              alt={item.name} 
              className="card__image" 
            />
            <div className="card__body">
              <h3 className="card__title">{item.name}</h3>
              <p className="card__description">{item.description}</p>
              <p className="card__price">₹{item.price}</p>
              <div className="card__actions">
                <button 
                  onClick={() => addToCart(item._id)} 
                  className="button button--primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section className="section" ref={aboutRef}>
        <h2 className="section__title">About</h2>
        <p className="section__text">
          Welcome to ShopEase – your trusted destination for hassle-free shopping.
          We bring you a wide range of products with the best deals and fast delivery.
          Enjoy shopping with us!
        </p>
      </section>

      {/* Contact Section */}
      <section className="section section--alt" ref={contactRef}>
        <h2 className="section__title">Contact</h2>
        <p className="section__text">
          📞 Phone: <a href="tel:9010854701" className="section__link">9010854701</a><br />
          📧 Email: <a href="mailto:azmeerasai123456789@gmail.com" className="section__link">azmeerasai123456789@gmail.com</a>
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </footer>
    </div>
  );
};

export default UserDashboard;
