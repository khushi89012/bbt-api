require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authroutes.js');
const dataRoutes = require("./routes/dataRoutes.js")
const connectDB = require("./config/dbconfig.js");
const cors = require('cors')

const app = express();
// Static folder to serve uploaded files (optional)
app.use('/uploads', express.static('uploads'));
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // If you need cookies or authorization headers
  }));

// Middleware
app.use(bodyParser.json());

//Routes
app.use('/auth', authRoutes);
app.use('/', dataRoutes);
// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB(); // Ensure the database connection is established
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error.message);
        process.exit(1); // Exit the process on failure
    }
};

startServer();
