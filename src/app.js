const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const getRouter = require('./routes/apiRoutes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('Secret Cookies'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors())

//routes
app.use('/api', getRouter);



module.exports = app;
