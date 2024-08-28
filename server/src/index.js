const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import cors
const connectDB = require('./Utils/db');
const router = require("./Router/router")

require('dotenv').config();

const app = express();
async function  index(req, res) {
    

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend origin
    credentials: true, // Allow cookies to be sent
}));
app.use("/api", router);

// Database Connection
connectDB();

// Routes


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
}
module.exports = {index}