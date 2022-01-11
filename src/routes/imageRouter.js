const express = require('express');
const imageRouter = express.Router();
const imageController = require('../controllers/imageController')
// const testController = require('../../controllers/testController')


// imageRouter.get('/test/:id', testController.test );

imageRouter.get('/categories/:id?', imageController.getCategoryImageData );

imageRouter.get('/products/main/:id?', imageController.getMainImageData );
imageRouter.get('/products/:id?', imageController.getProductImageData );

imageRouter.get('/features/:id?', imageController.getFeatureImageData );

imageRouter.get('/:id?', imageController.getAllImageData );

module.exports = imageRouter;
