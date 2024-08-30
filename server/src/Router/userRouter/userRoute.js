const express = require('express');
const userRouter = express.Router();
const {UserRegister, UserLogin, UserUpdate } = require('../../Controller/userController');
const upload = require('../../Middleware/upload');
const { authenticateToken } = require('../../Middleware/auth');

// Define the routes
userRouter.post('/register', UserRegister);
userRouter.post('/login', UserLogin);
// userRouter.put('/update', authenticateToken, upload.single('profile'), UserUpdate);

module.exports = userRouter;
