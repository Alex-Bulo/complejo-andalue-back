const express = require('express');
const bookingsRouter = express.Router();
const bookingsController = require('../controllers/bookingsController');
const bookingValidation = require('../middlewares/bookingValidation');
const formsValidations = require('../middlewares/formsMiddleware');
// const testController = require('../../controllers/testController')


// featureRouter.get('/test/:id', testController.test );

bookingsRouter.get('/code/:code', bookingsController.getByCode );
bookingsRouter.get('/user/:id', bookingsController.getByUser );
bookingsRouter.get('/product/:id?', bookingsController.getByProduct );

bookingsRouter.get('/neededInfo', bookingsController.getInfo );

bookingsRouter.post('/new', formsValidations, bookingValidation, bookingsController.newBooking );
bookingsRouter.put('/edit', formsValidations, bookingValidation, bookingsController.editBooking );
// bookingsRouter.put('/edit', bookingsController.getByProduct );



module.exports = bookingsRouter;
