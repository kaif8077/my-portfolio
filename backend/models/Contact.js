// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  subject: {
    type: String,
    default: 'No Subject',
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  // Extra fields for Contact Page
  phone: {
    type: String,
    trim: true
  },
  contactMethod: {
    type: String,
    enum: ['email', 'phone', 'whatsapp'],
    default: 'email'
  },
  // Track which form submitted (Home or Contact page)
  source: {
    type: String,
    enum: ['home', 'contact'],
    default: 'home'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add index for better performance
contactSchema.index({ createdAt: -1 });
contactSchema.index({ source: 1 });

module.exports = mongoose.model('Contact', contactSchema);