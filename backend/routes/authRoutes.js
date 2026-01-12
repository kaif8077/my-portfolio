const express = require('express');
const router = express.Router();

const { adminLogin, createAdmin } = require('../controllers/authController');

router.post('/login', adminLogin);
router.post('/create', createAdmin);

module.exports = router;