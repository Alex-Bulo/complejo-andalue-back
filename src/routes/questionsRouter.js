const express = require('express');
const questionsRouter = express.Router();
const questionsController = require('../controllers/questionsController');
const surveyValidation = require('../middlewares/surveyValidation');
// const loginValidation = require('../middlewares/loginValidation');


// 
questionsRouter.get('/onBooking/:code?', questionsController.getSurveyOnBooking );
questionsRouter.post('/onBooking/:code', surveyValidation, questionsController.postSurveyOnBooking );
// questionsRouter.get('/onUser', questionsController.getSurveyOnUser );


module.exports = questionsRouter;
