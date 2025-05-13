//------------------------------------------------------------------------------------
//Logic for handling state API requests
//------------------------------------------------------------------------------------

//Module imports
const statesData = require('../models/statesData.json');
const State = require('../models/States');

//------------------------------------------------------------------------------------
//GET - Get all states with optional filtering for contiguous or non-contiguous states
//Request: /states/   |   /states/?contig=<true><false> 
//------------------------------------------------------------------------------------
exports.getAllStates = async (req, res) => {
    let filteredStates = statesData;

    //Filter states based on 'contig' query parameter
    if (req.query.contig === 'true') {
        filteredStates = statesData.filter(s => s.code !== 'AK' && s.code !== 'HI');
    } else if (req.query.contig === 'false') {
        filteredStates = statesData.filter(s => s.code === 'AK' || s.code === 'HI');
    }

    //Fetch fun facts for the filtered states from the database
    const funfacts = await State.find({ stateCode: { $in: filteredStates.map(s => s.code) } });

    //Merge the fun facts with the states data
    const result = filteredStates.map(state => {
        const found = funfacts.find(f => f.stateCode === state.code);
        return found ? { ...state, funfacts: found.funfacts } : state;
    });

    res.json(result);
};
//------------------------------------------------------------------------------------
//GET - Gets a single state by it's code & includes fun facts (if available)
//Request: /states/:state  |   /states/:state/funfact
//------------------------------------------------------------------------------------
exports.getState = async (req, res) => {
    const state = statesData.find(s => s.code === req.code);
    if (!state) return res.status(404).json({ message: 'State not found' });
    const funfact = await State.findOne({ stateCode: req.code });
    if (funfact) state.funfacts = funfact.funfacts;
    res.json(state);
};
//------------------------------------------------------------------------------------
//GET - Gets a random fun fact for specific state when requested
//Resuest: /states/:state/funfact
//------------------------------------------------------------------------------------
exports.getRandomFunFact = async (req, res) => {
    const state = statesData.find(s => s.code === req.code);
    if (!state) {
        return res.status(404).json({ message: "Invalid state abbreviation parameter" });
    }
    const funfactDoc = await State.findOne({ stateCode: req.code });
    if (!funfactDoc || !funfactDoc.funfacts || funfactDoc.funfacts.length === 0) {
        return res.status(404).json({ message: `No Fun Facts found for ${state.state}` });
    }
    const random = funfactDoc.funfacts[Math.floor(Math.random() * funfactDoc.funfacts.length)];
    res.json({ funfact: random });
};
//------------------------------------------------------------------------------------
//GET - Gets a specific field for a state (pop, capital,etc)
//Request: /states/:state/<capital><nickname><population><admission>
//------------------------------------------------------------------------------------
exports.getStateField = (field) => (req, res) => {
    const state = statesData.find(s => s.code === req.code);
    if (!state) return res.status(404).json({ message: 'State not found' });

    switch (field) {
        case 'population':
            const popStr = state.population.toLocaleString('en-US');
            return res.json({ state: state.state, population: popStr });
        case 'capital':
            return res.json({ state: state.state, capital: state.capital_city });
        case 'nickname':
            return res.json({ state: state.state, nickname: state.nickname });
        case 'admission':
            return res.json({ state: state.state, admitted: state.admission_date });
        default:
            return res.status(400).json({ message: 'Invalid field' });
    }
};
//------------------------------------------------------------------------------------
//POST - Adds fun facts to specific state
//Request: "/states/:state/funfact"
//Required request body properties: index & funfact
//Behavior: Adds fun facts without overwriting pre-existing data
//------------------------------------------------------------------------------------
exports.addFunFacts = async (req, res) => {
    const { funfacts } = req.body;
    if (!funfacts) {
        return res.status(400).json({ message: 'State fun facts value required' });
    }
    if (!Array.isArray(funfacts)) {
        return res.status(400).json({ message: 'State fun facts value must be an array' });
    }

    let stateDoc = await State.findOne({ stateCode: req.code });
    if (stateDoc) {
        stateDoc.funfacts.push(...funfacts);
        await stateDoc.save();
    } else {
        stateDoc = await State.create({ stateCode: req.code, funfacts });
    }

    const stateData = statesData.find(s => s.code === req.code);
    const response = {
        _id: stateDoc._id,
        stateCode: stateData.code,
        funfacts: stateDoc.funfacts,
        __v: stateDoc.__v
    };
    res.json(response);
};
//------------------------------------------------------------------------------------
//PATCH - Updates an existing fun fact.
//Request: "/states/:state/funfact"  
//Required request body properties: index & funfact
//Behavior: Modifies an existing funfact(s) 
//------------------------------------------------------------------------------------
exports.updateFunFact = async (req, res) => {
    const { index, funfact } = req.body;
    const stateData = statesData.find(s => s.code === req.code);

    if (index === undefined) {
        return res.status(400).json({ message: 'State fun fact index value required' });
    }
    if (!funfact || typeof funfact !== 'string') {
        return res.status(400).json({ message: 'State fun fact value required' });
    }

    let stateDoc = await State.findOne({ stateCode: req.code });
    if (!stateDoc || !stateDoc.funfacts || stateDoc.funfacts.length === 0) {
        return res.status(404).json({ message: `No Fun Facts found for ${stateData.state}` });
    }

    const arrIndex = index - 1;
    if (arrIndex < 0 || arrIndex >= stateDoc.funfacts.length) {
        return res.status(404).json({ message: `No Fun Fact found at that index for ${stateData.state}` });
    }

    stateDoc.funfacts[arrIndex] = funfact;
    await stateDoc.save();

    const response = {
        _id: stateDoc._id,
        code: stateData.code,
        funfacts: stateDoc.funfacts,
        __v: stateDoc.__v
    };
    res.json(response);
};
//------------------------------------------------------------------------------------
//DELETE - Deletes a particular fun fact for a state
//Request: "/states/:state/funfact" 
//Required request body properties: index
//------------------------------------------------------------------------------------
exports.deleteFunFact = async (req, res) => {
    const { index } = req.body;
    const stateData = statesData.find(s => s.code === req.code);

    if (index === undefined) {
        return res.status(400).json({ message: 'State fun fact index value required' });
    }

    let stateDoc = await State.findOne({ stateCode: req.code });
    if (!stateDoc || !stateDoc.funfacts || stateDoc.funfacts.length === 0) {
        return res.status(404).json({ message: `No Fun Facts found for ${stateData.state}` });
    }

    const arrIndex = index - 1;
    if (arrIndex < 0 || arrIndex >= stateDoc.funfacts.length) {
        return res.status(404).json({ message: `No Fun Fact found at that index for ${stateData.state}` });
    }

    stateDoc.funfacts.splice(arrIndex, 1);
    await stateDoc.save();

    const response = {
        _id: stateDoc._id,
        code: stateData.code,
        funfacts: stateDoc.funfacts,
        __v: stateDoc.__v

    };
    res.json(response);
};
//------------------------------------------------------------------------------------
