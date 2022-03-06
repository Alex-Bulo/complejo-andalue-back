const { body } = require('express-validator')
const { Op } = require('sequelize');
const db = require('../database/models');
const { isAfter, getNextDay, isDate, isBooked } = require('../helpers/dateHelper');


const bookingValidation = [

    body('code')
    .custom( async (value,{req})=>{
        const {code} = req.body

        if (code !== ''){
            
            const codeFound = await db.Booking.findOne({
                where: {code}
            })

            if (!codeFound){
                throw new Error('Reserva inexistente.')
            }
            return true
        }
    }),

    body('cabinID')
    .notEmpty()
    .withMessage('Ingresar cabaña')
    .bail()
    .custom( async (value,{req}) => {
        const {cabinID} = req.body

        const cabinFound = await db.Product.findOne({
            where: {name:{ [Op.eq]: cabinID }}
        })

        if(!cabinFound){
            throw new Error('Cabaña inexistente.')
        }
        return true
    }),

    body('user')
    .custom( async (value,{req})=>{
        const {user} = req.body

        if (user !== ''){
            
            const userFound = await db.User.findOne({
                where: {email: {[Op.eq]:user}}
            })

            if (!userFound){
                throw new Error('Huésped inexistente.')
            }
            if(userFound && !userFound.access){
                throw new Error('Usuario sin acceso.')
            }
            return true
        }
    }),

    body('userName')
    .custom( (value,{req})=>{
        const {user, userName} = req.body

        if (userName === ''){
            if(user===''){
                throw new Error('Ingresar nombre del huésped.')
            }
        }
            return true
        
    })
    .bail()
    .isString()
    .withMessage('Ingresar nombre válido'),

    body('userLastName')
    .custom( (value,{req})=>{
        const {user, userLastName} = req.body

        if (userLastName === ''){
            if(user===''){
                throw new Error('Ingresar apellido del huésped.')
            }
        }
            return true
        
    })
    .bail()
    .isString()
    .withMessage('Ingresar apellido válido'),


    body('userPhone')
    .custom( (value,{req})=>{
        const {user, userPhone} = req.body

        if (userPhone === ''){
            if(user===''){
                throw new Error('Ingresar teléfono del huésped.')
            }
        }
            return true
        
    }),
    
    body('userEmail')
    .custom( async (value,{req})=>{
        const {user, userEmail} = req.body
        if(user==''){
            if (userEmail === ''){
                throw new Error('Ingresar mail del huésped.')
            }else{
                if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail))){ 
                    throw new Error('Ingresar con mail válido')
                }
    
                const userFound = await db.User.findOne({
                    where: {email: {[Op.eq]:userEmail}}
                })
    
                if (userFound){
                    throw new Error('Huésped ya registrado.')
                }
            }
        }
            return true
    }),

    body('startDate')
    .notEmpty()
    .withMessage('Ingresar fecha de ingreso.')
    .bail()
    .isDate()
    .withMessage('Ingresar fecha de ingreso válida.'),

    body('endDate')
    .notEmpty()
    .withMessage('Ingresar fecha de egreso.')
    .bail()
    .isDate()
    .withMessage('Ingresar fecha de egreso válida.')
    .custom( async (value,{req})=>{
        const {code, startDate, endDate, cabinID} = req.body
        
        if(!isAfter(startDate,endDate)){
            throw new Error('Fecha de egreso no puede ser anterior a la de ingreso.')
        }
        const bookings = await db.Booking.findAll({
            where:{cancelled : 0},
            include:[
                {
                    model: db.Product, as: 'product', required: true,
                    attributes: [], where:{name: cabinID.split(' ').map(i => i[0].toUpperCase() + i.slice(1)).join(' ')}
                }
            ]
        })

        if(code === '' && isBooked(bookings,startDate,endDate)){
            throw new Error('Ya existe una reserva para esas fechas.')
        }

        return true
    }),

    body('adults')
    .notEmpty()
    .withMessage('Ingresar cantidad de adultos.')
    .bail()
    .isNumeric()
    .withMessage('Ingresar cantidad de adultos válida.'),

    body('kids')
    .isNumeric()
    .withMessage('Ingresar cantidad de niños válida.'),

    body('source')
    .notEmpty()
    .withMessage('Ingresar un canal.')
    .bail()
    .custom( async (value,{req})=>{
        const {source} = req.body

        const sourceFound = await db.Source.findOne({
            where: {name: {[Op.eq]:source}}
        })

        if (!sourceFound){
            throw new Error('Canal inexistente.')
        }
            return true
    }),

    body('price')
    .notEmpty()
    .withMessage('Ingresar precio total.')
    .bail()
    .isNumeric()
    .withMessage('Ingresar sólo números.')
    .bail()
    .custom((value,{req})=>{
        const {price} = req.body

        if(price<=0){
            throw new Error('Ingresar precio válido.')
        }
        return true
    }),

    body('firstPayment')
    .notEmpty()
    .withMessage('Ingresar cantidad del primer pago.')
    .isNumeric()
    .withMessage('Ingresar sólo números.')
    .custom( (value,{req})=>{
        const {firstPayment, price} = req.body
        if(firstPayment<=0){
            throw new Error('Ingresar primer pago válido.')
        }
        if (price<firstPayment){
            throw new Error('Primer pago no puede ser mayor al precio total.')
        }
            return true
    }),

    body('firstPaymentDate')
    .custom((value,{req})=>{
        const {firstPaymentDate} = req.body
        
        if(firstPaymentDate){
            if(!isDate(firstPaymentDate)){
                throw new Error('Ingresar fecha válida.')
            }
            if(!isAfter(firstPaymentDate,getNextDay())){
                throw new Error('Fecha del primer pago no puede ser futura.')
            }
        }
        return true
    
    }),

    body('secondPayment')
    .notEmpty()
    .withMessage('Ingresar cantidad del segundo pago.')
    .isNumeric()
    .withMessage('Ingresar sólo números.')
    .custom( (value,{req})=>{
        const {secondPayment, firstPayment, price} = req.body

        if (price<secondPayment){
            throw new Error('Segundo pago no puede ser mayor al precio total.')
        }

        if (price!==(firstPayment+secondPayment)){
            throw new Error('La suma de ambos pagos deben dar el precio total.')
        }
            return true
    }),

    body('secondPaymentDate')
    .custom((value,{req})=>{
        const {firstPaymentDate, secondPaymentDate} = req.body
        if(secondPaymentDate){
            if(!isDate(secondPaymentDate)){
                throw new Error('Ingresar fecha válida.')
            }
            if(!isAfter(firstPaymentDate,secondPaymentDate)){
                throw new Error('Fecha del segundo pago no puede ser anterior al primer pago.')
            }
            if(!isAfter(secondPaymentDate,getNextDay())){
                throw new Error('Fecha del segundo pago no puede ser futura.')
            }
        }
        return true
    })

]


module.exports = bookingValidation