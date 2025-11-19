// src/pages/AdminDashboard.js
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    fetchItems();
  }, []);

  const fetchItems = () => API.get('/items').then(res => setItems(res.data));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('price', form.price);
    if (form.image) data.append('image', form.image);

    if (isEditing) {
      await API.put(`/items/${editItemId}`, data);
      setIsEditing(false);
      setEditItemId(null);
    } else {
      await API.post('/items', data);
    }

    fetchItems();
    setForm({ name: '', description: '', price: '', image: null });
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      image: null
    });
    setIsEditing(true);
    setEditItemId(item._id);
  };

  const deleteItem = async (id) => {
    try {
      await API.delete(`/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Delete failed');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const scrollToSection = (ref) => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page">
      {/* Navbar */}
      <header className="header">
        <h2 className="header__logo">Ecommerce Admin</h2>
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
              <button onClick={handleLogout} className="header__nav-button header__nav-button--logout">Logout</button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Form */}
      <section className="admin-form-section">
        <h3 className="admin-form-section__title">{isEditing ? 'Update Item' : 'Add New Item'}</h3>
        <form onSubmit={handleSubmit} className="form">
          <div className="form__group">
            <input 
              placeholder="Name" 
              value={form.name} 
              onChange={e => setForm({ ...form, name: e.target.value })} 
              required 
              className="form__input" 
            />
          </div>
          <div className="form__group">
            <input 
              placeholder="Description" 
              value={form.description} 
              onChange={e => setForm({ ...form, description: e.target.value })} 
              required 
              className="form__input" 
            />
          </div>
          <div className="form__group">
            <input 
              placeholder="Price" 
              type="number" 
              value={form.price} 
              onChange={e => setForm({ ...form, price: e.target.value })} 
              required 
              className="form__input" 
            />
          </div>
          <div className="form__group">
            <input 
              type="file" 
              onChange={e => setForm({ ...form, image: e.target.files[0] })} 
              className="form__input form__file-input" 
            />
          </div>
          <button type="submit" className="button button--primary">
            {isEditing ? 'Update Item' : 'Add Item'}
          </button>
        </form>
      </section>

      {/* Items List */}
      <section className="admin-cards-section">
        {items.map(item => (
          <div key={item._id} className="card card--product">
            <img 
              src={`http://localhost:5000${item.image}`} 
              alt={item.name} 
              className="card__image" 
            />
            <div className="card__body">
            <small className="card__meta">
              {`http://localhost:5000${item.image}`}
            </small>
              <h3 className="card__title">{item.name}</h3>
              <p className="card__description">{item.description}</p>
              <p className="card__price"><strong>₹{item.price}</strong></p>
              <div className="card__actions">
                <button 
                  onClick={() => handleEdit(item)} 
                  className="button button--secondary button--small"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteItem(item._id)} 
                  className="button button--danger button--small"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="section">
        <h3 className="section__title">About</h3>
        <p className="section__text">
          Welcome to ShopEase Admin – Manage your products efficiently and seamlessly from this dashboard.
        </p>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="section section--alt">
        <h3 className="section__title">Contact</h3>
        <p className="section__text">
          📧 Email: <a href="mailto:azmeerasai123456789@gmail.com" className="section__link">azmeerasai123456789@gmail.com</a><br />
          📞 Phone: <a href="tel:9010854701" className="section__link">9010854701</a>
        </p>
      </section>

      <footer className="footer">
        &copy; {new Date().getFullYear()} ShopEase Admin. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminDashboard;
