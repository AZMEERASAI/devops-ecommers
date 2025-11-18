import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [email, setEmail] = useState(localStorage.getItem('email') || null);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const login = (newToken, newRole, newEmail) => {
    setToken(newToken);
    setRole(newRole);
    setEmail(newEmail);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
    localStorage.setItem('email', newEmail);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setEmail(null);
    setCart([]);
    localStorage.clear();
  };

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
    setEmail(localStorage.getItem('email'));
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, email, cart, login, logout, addToCart, removeFromCart }}>
      {children}
    </AuthContext.Provider>
  );
};
