const express = require('express');
const roomRouter = express.Router();
const {createRoom, enterInRoom, getRoomsAndProjectsForAdmin} = require('../../Controller/roomController');
const { authenticateToken } = require('../../Middleware/auth');


roomRouter.post('/', authenticateToken, createRoom);
roomRouter.get("/:roomId", enterInRoom);
roomRouter.get("/projects",authenticateToken, getRoomsAndProjectsForAdmin);

module.exports = roomRouter;
