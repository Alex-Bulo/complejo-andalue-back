const DOMAIN = require('../helpers/config')
const { Op } = require('sequelize');
const db = require('../database/models');


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
                        cabinImage: `${DOMAIN}images/${booking.product.mainImage.name}`,
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
                                cabinImage: `${DOMAIN}images/${booking.product.mainImage.name}`,
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
                        cabinImage: `${DOMAIN}images/${booking.product.mainImage.name}`,
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

                status: 'success',
                total: info.length,
                cabins: [...new Set(info.map(b => b.cabinID))].length
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
  

  }

  module.exports = bookingsController