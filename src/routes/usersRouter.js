const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');
const loginValidation = require('../middlewares/loginValidation');
// const testController = require('../../controllers/testController')


// featureRouter.get('/test/:id', testController.test );

usersRouter.post('/login', loginValidation, usersController.login );


module.exports = usersRouter;
