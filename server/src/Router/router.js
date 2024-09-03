const express = require('express');
const router = express.Router();
const userRouter = require("./userRouter/userRoute");
const roomRouter = require("./roomRouter/roomRouter");
const taskRouter = require("./taskRouter/taskRouter");

router.use('/users', userRouter);
router.use('/rooms', roomRouter);
router.use('/tasks', taskRouter);

module.exports = router;
