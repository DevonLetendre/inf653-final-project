//------------------------------------------------------------------------------------
//Middleware to validate state codes (e.g., MO, NY)
//------------------------------------------------------------------------------------

//Import the static JSON data
const statesData = require('../models/statesData.json');

//Extract state codes from statesData.json to compare user input against
const stateCodes = statesData.map(state => state.code);

module.exports = (req, res, next) => {
    // Get the state code from the request parameters, convert to uppercase for consistency
    const code = req.params.state?.trim().toUpperCase();
    
    // Check if the code exists and is a valid US state code
    if (!code || !stateCodes.includes(code)) {
        return res.status(404).json({ message: "Invalid state abbreviation parameter" });   //If not valid, send 404 w/ error message
    }
    //Attach the standardized state code to the request object for downstream use
    req.code = code;

    //Continue to the next middleware/route handler
    next();
};