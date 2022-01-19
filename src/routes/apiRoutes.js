const express = require('express');
const apiRouter = express.Router();
const imageRouter = require('./imageRouter')
const featureRouter = require('./featureRouter')
const productRouter = require('./productRouter')
const availRouter = require('./availRouter');
const usersRouter = require('./usersRouter');
const generalController = require('../controllers/generalController');
const contactFormsValidations = require('../middlewares/contactFormsValidations');
const bookingsRouter = require('./bookingsRouter');
const questionsRouter = require('./questionsRouter');
const adminRouter = require('./adminRouter');
// const testController = require('../../controllers/testController')


// apiRouter.get('/:id?', testController.Feattest );

apiRouter.use('/images', imageRouter );
apiRouter.use('/products', productRouter );
apiRouter.use('/avail', availRouter );
apiRouter.use('/features', featureRouter );

apiRouter.use('/users', usersRouter );
apiRouter.use('/bookings', bookingsRouter );

apiRouter.use('/questions', questionsRouter );
apiRouter.use('/admin', adminRouter );

apiRouter.post('/bookingMail',contactFormsValidations.bookingMail, generalController.bookingMail)
apiRouter.post('/contactUs', contactFormsValidations.contactUs, generalController.contactUs)
apiRouter.get('/webInfo', generalController.webData)

module.exports = apiRouter;
