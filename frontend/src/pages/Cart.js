// src/pages/Cart.js
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

  const total = cart.reduce((acc, item) => {
    if (item && item.item && item.item.price) {
      return acc + item.item.price * item.quantity;
    }
    return acc;
  }, 0);

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

      {/* Cart Section */}
      <section className="cart-section">
        <h2 className="section__title">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="cart__empty">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((c, i) => (
              <div key={i} className="card card--cart">
                <div className="card__body">
                  <h3 className="card__title">{c.item?.name || 'Unnamed Item'}</h3>
                  <p className="card__price">₹{c.item?.price ?? 0} × {c.quantity}</p>
                </div>
                <div className="card__actions">
                  <button 
                    className="button button--danger button--small" 
                    onClick={() => removeItem(c._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <h3 className="cart__total">Total: ₹{total}</h3>
          </>
        )}
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

      <footer className="footer">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </footer>
    </div>
  );
};

export default Cart;
