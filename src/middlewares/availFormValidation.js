const { isAfter, isDate } = require('../helpers/dateHelper')

const availFormValidation = (req, res, next) => {
    const start = req.query.startDate
    const end = req.query.endDate
    const adults = req.query.adults
    req.errors = {}

    if (start === undefined){ req.errors.startDate = {status: true, msg:'Ingresar fecha de ingreso'} }
    if(!isDate(start)){ req.errors.startDate = {status: true, msg:'Ingresar fecha de ingreso válida'} }
    
    if (end === undefined){ req.errors.endDate = {status: true, msg:'Ingresar fecha de egreso'} }
    if(!isDate(end)){ req.errors.endDate = {status: true, msg:'Ingresar fecha de egreso válida'} }
    if(!isAfter(start,end)){ req.errors.endDate = {status: true, msg:'Fecha de egreso no puede ser anterior al ingreso'} }
    
    if(adults === undefined || Number(adults) === 0) { req.errors.adults = {status: true, msg:'Ingresar adultos'} }
    
 
    next();
   
}


module.exports = availFormValidation