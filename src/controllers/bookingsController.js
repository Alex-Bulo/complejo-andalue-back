const {RES_URL} = require('../helpers/config')
const { Op } = require('sequelize');
const db = require('../database/models');
const { validationResult } = require('express-validator')


const bookingsController = {

    getByCode : async (req, res) => {
        
        try {

            // const needForCancelled = {cancelled: req.query.cancelled==='all' ? undefined : req.query.cancelled}
            const needForCode = {code: { [Op.eq]: req.params.code }}
  
            const bookingInfo = await db.Booking.findAll({
                where: needForCode,
                include:[
                    {
                        model: db.User, as: 'user', required: true,
                        attributes: ['id', 'name', 'lastName', 'phoneNumber', 'email', 'access']
                    },

                    {
                        model: db.Source, as: 'source', required: true,
                        attributes: ['name']
                    },

                    {
                        model:db.Product, as:'product', required: true,
                        attributes:['id', 'name'],
                        include:[ {model: db.Image, as: 'mainImage', required: true, attributes: ['name']}]    
                    }
                ]
            })
            const info = bookingInfo.map( booking => {
                    return {
                        code: booking.code,
                        cancelled: booking.cancelled, 
                        startDate: booking.startDate,
                        endDate: booking.endDate,
                        adults: booking.adults,
                        kids: booking.kids,
                        pets: booking.pets,
                        price: booking.price,
                        discount: booking.discount,
                        firstPayment: booking.firstPayment,
                        firstPaymentDate: booking.firstPaymentDate,
                        secondPayment: booking.secondPayment,
                        secondPaymentDate: booking.secondPaymentDate,
                        source: booking.source.name,
                        cabinID: booking.product.id,
                        cabin: booking.product.name,
                        cabinImage: `${RES_URL}images/${booking.product.mainImage.name}`,
                        userID: booking.user.id,
                        userName: booking.user.name,
                        userLastName: booking.user.lastName,
                        userPhone: booking.user.phoneNumber,
                        userEmail: booking.user.email,
                        userAccess: booking.user.access,
                        rating: [], // traer ratings puestos por el admin en cada booking ~booking.ratings.map
                        feedback: [] // traer feedbacks puestos por el user en cada booking ~booking.feedbacks.map
                    }
                })
                    
            
            
            res.status(200).json({
            meta:{

                status:'success',
            },
            data: info,
            // userInfo
            })

  
        } catch (error) {
          console.log(error);
          res.status(500).json({
            meta:{
              status:'error',
            },
            errorMsg: error.message,
            error
          })
        }
            
    },
  
    getByUser : async (req, res) => {
        
        try {

            const needForUser = {id: { [Op.eq]: req.params.id }}
  
            const userInfo = await db.User.findAll({
                attributes:['id', 'name', 'lastName', 'phoneNumber', 'email', 'access'],
                where: needForUser,
                include:[
                    {
                        model: db.Booking, as: 'bookings', required: true,
                        attributes: ['code', 'startDate', 'endDate','cancelled', 'adults', 'kids', 'pets'],
                        include:[
                            {
                                model: db.Source, as: 'source', required: true,
                                attributes: ['name']
                            },
                            {
                                model:db.Product, as:'product', required: true,
                                attributes:['id', 'name'],
                                include:[ {model: db.Image, as: 'mainImage', required: true, attributes: ['name']}]    
                            },
                            // {MODELO VALORACION}
                        ]
                    }                    
                ]
            })
            const info = userInfo.map( user => {
                    
                return {
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    phone: user.phoneNumber,
                    email: user.email,
                    userAccess: user.access,
                    rating: null, //promedio de ratings puesto por el admin en cada booking
                    feedback: null, // promedio de feedback puesto por el user en cada booking
                    totalBookings: user.bookings.length,
                    bookings: user.bookings.map( booking => {

                            return {
                                code: booking.code,
                                cancelled: booking.cancelled, 
                                startDate: booking.startDate,
                                endDate: booking.endDate,
                                adults: booking.adults,
                                kids: booking.kids,
                                pets: booking.pets,
                                price: booking.price,
                                discount: booking.discount,
                                firstPayment: booking.firstPayment,
                                firstPaymentDate: booking.firstPaymentDate,
                                secondPayment: booking.secondPayment,
                                secondPaymentDate: booking.secondPaymentDate,
                                source: booking.source.name,
                                cabinID: booking.product.id,
                                cabin: booking.product.name,
                                cabinImage: `${RES_URL}images/${booking.product.mainImage.name}`,
                                ratings: [], // traer ratings puestos por el admin en cada booking ~booking.ratings.map
                                feedback: [] // traer feedbacks puestos por el user en cada booking ~booking.feedbacks.map
                            }
                    })       
                
                }
            })
                    
            
            
            res.status(200).json({
            meta:{

                status:'success',
            },
            data: info,
            // userInfo
            })

  
        } catch (error) {
          console.log(error);
          res.status(500).json({
            meta:{
              status:'error',
            },
            errorMsg: error.message,
            error
          })
        }
            
    },

    getByProduct : async (req, res) => {
        
        try {

            // const needForCancelled = {cancelled: req.query.cancelled==='all' ? undefined : req.query.cancelled}
            const needForProduct = req.params.id ? {id: { [Op.eq]: req.params.id }} : {}
  
            const bookingInfo = await db.Booking.findAll({
                order:[['startDate','DESC']],
                include:[
                    {
                        model: db.User, as: 'user', required: true,
                        attributes: ['id', 'name', 'lastName', 'phoneNumber', 'email', 'access']
                    },

                    {
                        model: db.Source, as: 'source', required: true,
                        attributes: ['name']
                    },

                    {
                        model:db.Product, as:'product', 
                        where: needForProduct, required: true,
                        attributes:['id', 'name','color'],
                        include:[ {model: db.Image, as: 'mainImage', required: true, attributes: ['name']}]    
                    }
                ]
            })
            const info = bookingInfo.map( booking => {
                    return {
                        code: booking.code,
                        cancelled: booking.cancelled, 
                        startDate: booking.startDate,
                        endDate: booking.endDate,
                        adults: booking.adults,
                        kids: booking.kids,
                        pets: booking.pets,
                        price: booking.price,
                        discount: booking.discount,
                        firstPayment: booking.firstPayment,
                        firstPaymentDate: booking.firstPaymentDate,
                        secondPayment: booking.secondPayment,
                        secondPaymentDate: booking.secondPaymentDate,
                        source: booking.source.name,
                        cabinID: booking.product.id,
                        cabin: booking.product.name,
                        color: booking.product.color,
                        cabinImage: `${RES_URL}images/${booking.product.mainImage.name}`,
                        userID: booking.user.id,
                        userName: booking.user.name,
                        userLastName: booking.user.lastName,
                        userPhone: booking.user.phoneNumber,
                        userEmail: booking.user.email,
                        userAccess: booking.user.access,
                        rating: [], // traer ratings puestos por el admin en cada booking ~booking.ratings.map
                        feedback: [] // traer feedbacks puestos por el user en cada booking ~booking.feedbacks.map
                    }
                })
                    
                const cabinsArray = [] 
                info.forEach(b => {
                    if(!cabinsArray.some(c => c.cabinID === b.cabinID)){
                        const cabin = {
                            cabinID: b.cabinID, cabin: b.cabin,
                            color: b.color, cabinImage: b.cabinImage
                        }
                        cabinsArray.push(cabin)
                    }

                    })
            
            res.status(200).json({
            meta:{

                status: 'success',
                total: info.length,
                totalCabins: [...new Set(info.map(b => b.cabinID))].length,
                cabins: cabinsArray
            },
            data: info,
            // userInfo
            })

  
        } catch (error) {
          console.log(error);
          res.status(500).json({
            meta:{
              status:'error',
            },
            errorMsg: error.message,
            error
          })
        }
            
    },

    getInfo : async (req, res) => {
        
        try {
  
            const userInfo = await db.User.findAll({
                attributes: ['id', ['email','name'], 'access'],
                // where:{access: true}
            })
            
            const sourceInfo = await db.Source.findAll({
                attributes: ['id', 'name']
            })

            const productInfo = await db.Product.findAll({
                attributes: ['id', 'name']
            })

            const info = {
                cabins: [...productInfo],
                sources: [...sourceInfo],
                users: [...userInfo]
            }
            
            
            res.status(200).json({
            meta:{

                status: 'success',
                total: {
                    cabins: info.cabins.length,
                    sources: info.sources.length,
                    users: info.users.length
                }
            },
            data: info,
            // bookingInfo
            })

  
        } catch (error) {
          console.log(error);
          res.status(500).json({
            meta:{
              status:'error',
            },
            errorMsg: error.message,
            error
          })
        }
            
    },
  
    newBooking : async (req, res) => {
        // console.log('controller INPUTS:', req.inputs);
        // console.log('controller BODY:', req.body);
        
        const formValidation = validationResult(req)
        //validErrors devuelve meta.status:'error', data:[inputs]
        if (!formValidation.isEmpty()){
            const errors = formValidation.mapped()

            const newInputs = req.inputs.map(input => {
                let newInput = input
                
                if(errors[input.name]){
                    newInput = {
                        ...input,
                        error:true,
                        errorMsg:errors[input.name].msg
                    }
                }
                return newInput  
            })

            res.status(400).json({
                meta:{
                    status:'error',
                  },
                  data: newInputs
            })
            return
        }
        try {
            //ok devuelve status:'success', data: {name,mail,code}
            let userInfo

            if(req.body.user !== ''){

                const userFound = await db.User.findOne({
                    where: {email: {[Op.eq]:req.body.user}}
                })
                userInfo = userFound
            }else{
                userInfo = await db.User.create({
                        name: req.body.userName,
                        lastName: req.body.userLastName,
                        phoneNumber: req.body.userPhone,
                        email: req.body.userEmail
                    })
            }

            const cabinFound = await db.Product.findOne({
                where: {name:{ [Op.eq]: req.body.cabinID }}
            })
            
            const sourceFound = await db.Source.findOne({
                where: {name: {[Op.eq]:req.body.source}}
            })
            const code = req.body.startDate.slice(-2) + cabinFound.id + '-' + req.body.startDate.slice(-5,-3) + userInfo.id + '-' + req.body.startDate.slice(2,4) + (req.body.adults + req.body.kids) 
            
            const info = {
                code,
                idProduct: cabinFound.id,
                idUser: userInfo.id,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                adults: req.body.adults,
                kids:req.body.kids,
                pets:req.body.pets,
                idSource: sourceFound.id,
                cancelled:false,
                price: req.body.price,
                discount: req.body.discount,
                firstPayment: req.body.firstPayment,
                firstPaymentDate:req.body.firstPaymentDate,
                secondPayment: req.body.secondPayment,
                secondPaymentDate: req.body.secondPaymentDate,
            }

            console.log('NEW BOOKING',info);
            const newBooking = await db.Booking.create(info)
            
            
            res.status(200).json({
            meta:{
                status: 'success',
            },
            data: {name:userInfo.name, mail:userInfo.email, code:newBooking.code},
            // userInfo
            })

  
        } catch (error) {
          console.log(error);
          res.status(500).json({
            meta:{
              status:'error',
            },
            errorMsg: error.message,
            error
          })
        }
            
    },
    
    editBooking : async (req, res) => {
        // console.log('controller INPUTS:', req.inputs);
        // console.log('controller BODY:', req.body);
        const code = req.body.code
        
        const formValidation = validationResult(req)
        //validErrors devuelve meta.status:'error', data:[inputs]
        if (!formValidation.isEmpty()){
            const errors = formValidation.mapped()

            const newInputs = req.inputs.map(input => {
                let newInput = input
                
                if(errors[input.name]){
                    newInput = {
                        ...input,
                        error:true,
                        errorMsg:errors[input.name].msg
                    }
                }
                return newInput  
            })

            res.status(400).json({
                meta:{
                    status:'error',
                  },
                  data: newInputs
            })
            return
        }
        try {
            //ok devuelve status:'success', data: {name,mail,code}
            let userInfo

            if(req.body.user !== ''){

                const userFound = await db.User.findOne({
                    where: {email: {[Op.eq]:req.body.user}}
                })
                userInfo = userFound
            }else{
                userInfo = await db.User.create({
                        name: req.body.userName,
                        lastName: req.body.userLastName,
                        phoneNumber: req.body.userPhone,
                        email: req.body.userEmail
                    })
            }

            const cabinFound = await db.Product.findOne({
                where: {name:{ [Op.eq]: req.body.cabinID }}
            })
            
            const sourceFound = await db.Source.findOne({
                where: {name: {[Op.eq]:req.body.source}}
            })
            
            const info = {
                idProduct: cabinFound.id,
                idUser: userInfo.id,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                adults: req.body.adults,
                kids:req.body.kids,
                pets:req.body.pets,
                idSource: sourceFound.id,
                cancelled:req.body.cancelled,
                price: req.body.price,
                discount: req.body.discount,
                firstPayment: req.body.firstPayment,
                firstPaymentDate:req.body.firstPaymentDate,
                secondPayment: req.body.secondPayment,
                secondPaymentDate: req.body.secondPaymentDate,
            }

            console.log('Edit BOOKING',info);
            const newBooking = await db.Booking.update(
                    {...info},
                    {where: {code:{[Op.eq]:code} } }
                )
            
            
            res.status(200).json({
            meta:{
                status: 'success',
            },
            data: {name:userInfo.name, mail:userInfo.email, code:code},
            // userInfo
            })

  
        } catch (error) {
          console.log(error);
          res.status(500).json({
            meta:{
              status:'error',
            },
            errorMsg: error.message,
            error
          })
        }
            
    },

  }

  module.exports = bookingsController