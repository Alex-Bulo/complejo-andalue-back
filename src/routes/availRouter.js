const express = require('express');
const availRouter = express.Router();
const availController = require('../controllers/availController');
const availFormValidation = require('../middlewares/availFormValidation');
// const testController = require('../../controllers/testController')


// productRouter.get('/test/:id', testController.test );

availRouter.get('/form', availFormValidation, availController.getAvailForForm );

availRouter.get('/product/:id?/?', availController.getAvailForProduct );
availRouter.get('/product/:id?', availController.getAvailForProduct );


module.exports = availRouter;
