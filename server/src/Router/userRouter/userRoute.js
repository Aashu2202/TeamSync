const express = require('express');
const router = express.Router();
const {UserRegister, UserLogin, UserUpdate } = require('../../Controller/userController');
const upload = require('../../Middleware/upload');
const { authenticateToken } = require('../../Middleware/auth');

// Define the routes
router.post('/register', UserRegister);
router.post('/login', UserLogin);
router.put('/update', authenticateToken, upload.single('profile'), UserUpdate);

module.exports = router;
