//------------------------------------------------------------------------------------
//Entry point of the API
//------------------------------------------------------------------------------------

//Import required modules/dependencies
const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
//Import the router for "/states" API endpoints
const statesRouter = require('./routes/api/states');

//Pull env variables
require('dotenv').config();

//Initialize express 
const app = express();

//Set the server port from environment variable or default to 3500
const PORT = process.env.PORT || 3500;

//Middleware stack
app.use(cors());            //Enable CORS for all requests
app.use(express.json());    //Parse JSON payloads

//Mount the /states router for handling API requests related to U.S. states
app.use('/states', statesRouter);

//Serve the homepage when the root URL or /index.html is accessed
app.get(['/', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

//Handle 404 errors: serve custom 404.html page for undefined routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Connect DB and start server
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});