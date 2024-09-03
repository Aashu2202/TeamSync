const express = require('express');
const {authenticateToken} = require('../../Middleware/auth'); // Ensure correct path
const {createTask , getTasks, updateTaskStatus } = require('../../Controller/taskController'); // Adjust path as needed

const taskRouter = express.Router();


taskRouter.post('/', authenticateToken, createTask);
taskRouter.get('/', authenticateToken, getTasks);
taskRouter.put('/:taskId/status',authenticateToken, updateTaskStatus);


module.exports = taskRouter;
