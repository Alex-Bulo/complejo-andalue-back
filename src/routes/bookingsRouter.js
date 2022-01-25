const express = require('express');
const bookingsRouter = express.Router();
const bookingsController = require('../controllers/bookingsController');
// const testController = require('../../controllers/testController')


// featureRouter.get('/test/:id', testController.test );

bookingsRouter.get('/code/:code', bookingsController.getByCode );
bookingsRouter.get('/user/:id', bookingsController.getByUser );
bookingsRouter.get('/product/:id?', bookingsController.getByProduct );

bookingsRouter.get('/neededInfo', bookingsController.getInfo );



module.exports = bookingsRouter;
