// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {type:String,required:true},
//   email: { type: String, unique: true,required:true },
//   password: { type:String,required:true},
//   role: { type: String, enum: ['admin', 'user'] }
// });

// module.exports = mongoose.model('User', userSchema);



// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true 
  },
  email: { 
    type: String, 
    unique: true,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'],
    default: 'user'
  },
  cart: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: { type: Number, default: 1 }
    }
  ]
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);