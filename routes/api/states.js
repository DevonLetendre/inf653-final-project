//------------------------------------------------------------------------------------
//All /states API routes
//------------------------------------------------------------------------------------

//Import dependencies
const express = require('express');
const router = express.Router();
const controller = require('../../controllers/statesController');
const verifyState = require('../../middleware/verifyState');

//General state routes
router.get('/', controller.getAllStates);
router.get('/:state', verifyState, controller.getState);

//Field-specific routes
router.get('/:state/funfact', verifyState, controller.getRandomFunFact);
router.get('/:state/capital', verifyState, controller.getStateField('capital'));
router.get('/:state/nickname', verifyState, controller.getStateField('nickname'));
router.get('/:state/population', verifyState, controller.getStateField('population'));
router.get('/:state/admission', verifyState, controller.getStateField('admission'));

//Post (create fun facts) route
router.post('/:state/funfact', verifyState, controller.addFunFacts);

//Patch (update) route
router.patch('/:state/funfact', verifyState, controller.updateFunFact);

//Delete (remove) route
router.delete('/:state/funfact', verifyState, controller.deleteFunFact);

module.exports = router;