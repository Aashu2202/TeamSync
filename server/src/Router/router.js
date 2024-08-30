const express = require('express');
const router = express.Router();
const userRouter = require("./userRouter/userRoute");
const roomRouter = require("./roomRouter/roomRouter");

router.use('/users', userRouter);
router.use('/rooms', roomRouter);

module.exports = router;
