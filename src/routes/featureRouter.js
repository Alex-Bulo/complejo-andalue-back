const express = require('express');
const featureRouter = express.Router();
const featureController = require('../controllers/featureController')
// const testController = require('../../controllers/testController')


// featureRouter.get('/test/:id', testController.test );

featureRouter.get('/categories/:id?', featureController.getCategoryFeatureData );
featureRouter.get('/products/:id?', featureController.getProductFeatureData );
featureRouter.get('/:id?', featureController.getAllFeatureData );


module.exports = featureRouter;
