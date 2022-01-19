const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');
const adminValidation = require('../middlewares/adminValidation');
// const testController = require('../../controllers/testController')


// productRouter.get('/test/:id', testController.test );

adminRouter.post('/login',adminValidation, adminController.login );



module.exports = adminRouter;
