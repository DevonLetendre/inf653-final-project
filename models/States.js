//------------------------------------------------------------------------------------
//Mongoose schema for state funfacts
//------------------------------------------------------------------------------------

//Import dependency
const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    stateCode: { 
        type: String, 
        required: true, 
        unique: true 
    },
    funfacts: [String]
});

//Export the model to be used in controller
module.exports = mongoose.model('State', stateSchema);