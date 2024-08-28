const express = require('express');
const router = express.Router();
const userRouter = require("./userRouter/userRoute");

router.use('/users', userRouter);

module.exports = router;
