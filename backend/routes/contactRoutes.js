// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { submitContact, getAllContacts, deleteContact } = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post('/submit', submitContact);
router.get('/all', authMiddleware, getAllContacts);
router.delete('/:id', authMiddleware, deleteContact); // ✅ यह line होनी चाहिए

module.exports = router;