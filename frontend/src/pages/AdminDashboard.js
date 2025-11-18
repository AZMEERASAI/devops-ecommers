
// export default AdminDashboard;
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

  // const deleteItem = async (id) => {
  //   console.log("correct");
  //   await API.delete(`/items/${id}`);
  //   fetchItems();
  // };
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
    <div style={styles.container}>
      {/* Navbar */}
      <header style={styles.header}>
        <h2 style={styles.logo}>Ecommerce Admin</h2>
        <nav style={styles.nav}>
          <button onClick={() => navigate('/')} style={styles.navLink}>Home</button>
          <button onClick={() => scrollToSection(aboutRef)} style={styles.navLink}>About</button>
          <button onClick={() => scrollToSection(contactRef)} style={styles.navLink}>Contact</button>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </nav>
      </header>

      {/* Form */}
      <section style={styles.formSection}>
        <h3 style={styles.sectionTitle}>{isEditing ? 'Update Item' : 'Add New Item'}</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={styles.input} />
          <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required style={styles.input} />
          <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required style={styles.input} />
          <input type="file" onChange={e => setForm({ ...form, image: e.target.files[0] })} style={styles.input} />
          <button type="submit" style={styles.button}>{isEditing ? 'Update Item' : 'Add Item'}</button>
        </form>
      </section>

      {/* Items List */}
      <section style={styles.cardSection}>
        {items.map(item => (
          <div key={item._id} style={styles.card}>
            <img src={`http://localhost:5000${item.image}`} alt={item.name} style={styles.cardImage} />
            <small style={{ fontSize: '12px', color: 'gray' }}>{`http://localhost:5000${item.image}`}</small>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>₹{item.price}</strong></p>
            <div>
              <button onClick={() => handleEdit(item)} style={styles.cardBtn}>Edit</button>
              <button onClick={() => deleteItem(item._id)} style={{ ...styles.cardBtn, backgroundColor: '#e74c3c' }}>Delete</button>
            </div>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section ref={aboutRef} style={styles.infoSection}>
        <h3>About</h3>
        <p>Welcome to ShopEase Admin – Manage your products efficiently and seamlessly from this dashboard.</p>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} style={styles.infoSection}>
        <h3>Contact</h3>
        <p>📧 Email: <a href="mailto:azmeerasai123456789@gmail.com">azmeerasai123456789@gmail.com</a><br />
           📞 Phone: <a href="tel:9010854701">9010854701</a>
        </p>
      </section>

      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} ShopEase Admin. All rights reserved.
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f4f6f8',
    color: '#333',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  },
  logo: {
    margin: 0,
    fontSize: '24px',
  },
  nav: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
  },
  navLink: {
    background: 'none',
    border: 'none',
    color: '#ecf0f1',
    fontSize: '16px',
    cursor: 'pointer',
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  formSection: {
    padding: '40px',
    backgroundColor: '#fff',
    margin: '20px auto',
    maxWidth: '600px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#2980b9',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  cardSection: {
    padding: '30px 40px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    width: '250px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  cardImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  cardBtn: {
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    margin: '5px',
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: '60px 40px',
    textAlign: 'center',
    borderTop: '1px solid #e0e0e0',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    fontSize: '14px',
  },
};

export default AdminDashboard;
