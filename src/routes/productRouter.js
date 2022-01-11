const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController')
// const testController = require('../../controllers/testController')


// productRouter.get('/test/:id', testController.test );

productRouter.get('/:id?', productController.getAllProductData );



module.exports = productRouter;
