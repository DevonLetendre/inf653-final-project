
//------------------------------------------------------------------------------------
//Database Connection Logic for MongoDB
//------------------------------------------------------------------------------------
const mongoose = require('mongoose');

//For connecting to MongoDB
const connectDB = async () => {
    try {
        //Connect to MongoDB using the connection string from .env
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('MongoDB connection established');  //Log success message
    } catch (err) {
        console.error(err); // Log DB connection errors
    }
};

module.exports = connectDB;
