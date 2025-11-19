// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.signup = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   console.log(req.body);

//   try {
//     // Check if user already exists with same email and role
//     const existingUser = await User.findOne({ email, role });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists with this email and role' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//       console.log("completed1");
//     // Create and save the new user
//     const newUser = new User({ name, email, password: hashedPassword, role });
//     await newUser.save();
//     console.log("completed2");

//     res.status(201).json({ message: 'User registered successfully' });

//   } catch (err) {
//     res.status(500).json({ error: 'Server error during signup' });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     const user = await User.findOne({ email, role });
//     if (!user) {
//       console.log('Login failed: user not found with email and role', email, role);
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       console.log('Login failed: password mismatch for', email);
//       return res.status(400).json({ error: 'Invalid password' });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
//     res.json({ token, user: { name: user.name, email: user.email, role: user.role } });

//   } catch (err) {
//     console.error('Server error during login:', err);
//     res.status(500).json({ error: 'Server error during login' });
//   }
// };


// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  
  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  // Validate role
  if (role && !['user', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role. Must be "user" or "admin"' });
  }

  try {
    // Check if user already exists with same email (email is unique in schema)
    // Normalize email to lowercase for consistent checking
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create and save the new user
    const user = new User({ 
      name: name.trim(), 
      email: normalizedEmail, 
      password: hashedPassword, 
      role: role || 'user' 
    });
    
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    
    // Handle duplicate key error (MongoDB unique constraint)
    if (err.code === 11000) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message).join(', ');
      return res.status(400).json({ error: `Validation error: ${errors}` });
    }
    
    // Generic server error
    res.status(500).json({ error: 'Server error during signup. Please try again later.' });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  
  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find user by email (email is unique)
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // If role is specified, check if it matches
    if (role && user.role !== role) {
      return res.status(400).json({ error: 'Invalid role for this account' });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ 
      token, 
      user: { 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login. Please try again later.' });
  }
};