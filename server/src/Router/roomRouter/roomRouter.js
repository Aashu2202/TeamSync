const express = require('express');
const roomRouter = express.Router();
const {createRoom, enterInRoom, getRoomsAndProjectsForAdmin, updateRoomStatus,getRoomsByUserId, getUsersByRoomId} = require('../../Controller/roomController');
const { authenticateToken } = require('../../Middleware/auth');


roomRouter.post('/', authenticateToken, createRoom);
roomRouter.get("/projects",authenticateToken, getRoomsAndProjectsForAdmin);
roomRouter.get('/user',authenticateToken, getRoomsByUserId);
roomRouter.get('/:roomId/users',authenticateToken, getUsersByRoomId);
roomRouter.put('/:roomId/status',authenticateToken, updateRoomStatus);
roomRouter.get("/:roomId",authenticateToken, enterInRoom);


module.exports = roomRouter;
