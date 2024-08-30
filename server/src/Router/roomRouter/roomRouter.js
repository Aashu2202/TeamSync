const express = require('express');
const roomRouter = express.Router();
const {createRoom} = require('../../Controller/roomController');
const { authenticateToken } = require('../../Middleware/auth');


roomRouter.post('/', authenticateToken, createRoom);

module.exports = roomRouter;
