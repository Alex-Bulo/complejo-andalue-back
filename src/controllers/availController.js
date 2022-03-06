const {RES_URL} = require('../helpers/config')
const moment = require('moment')
const { Op } = require('sequelize');
const db = require('../database/models');
const {getNumberOfDays, getLastMonth, getNextMonth, isBooked, getProxAvail} = require('../helpers/dateHelper')

const availController = {

    getAvailForForm : async (req, res) => {       
        try {
            if(Object.keys(req.errors).length > 0){                
            
                res.status(400).json({
                    meta:{
                      status:'error',
                    },
                    errorMsg: 'Revisar datos cargados',
                    errors: req.errors
                    
                })   
                return
            }
            
            const start = req.query.startDate
            const end = req.query.endDate
            const adults = Number(req.query.adults)
            const kids = req.query.kids ? Number(req.query.kids) : 0
            // const pets = req.query.pets ? Number(req.query.pets) : 0

            const prodInfo = await db.Product.findAll({
                attributes:['id', 'name', 'adults', 'kids', 'pets', 'defaultClose', 'closeSince'],
                order:[['bookings','startDate','ASC']],
                include:[

                    {
                        model: db.Image, as: 'mainImage',
                        attributes: ['name'],
                    },

                    {
                        model: db.Booking, as: 'bookings', required:false,
                        attributes: ['code', 'startDate', 'endDate'],
                        where: [{cancelled: false}, {start_date: { [Op.gte]: getLastMonth(moment(start)) }},{start_date: { [Op.lte]: getNextMonth(moment(end)) }}]
                    }

                ]
            })




            const main = prodInfo.map(cabin =>{
                // console.log(cabin.name);
                return {
                    cabinID: cabin.id,
                    cabin: cabin.name,
                    cabinImage: `${RES_URL}images/${cabin.mainImage.name}`,
                    startDate: start,
                    endDate: end,
                    status: cabin.defaultClose ? !isBooked([{startDate:cabin.closeSince}]) : !isBooked(cabin.bookings,start,end),
                    msg:  adults + kids > cabin.adults + cabin.kids ? 'Excede capacidad' : undefined
                }

            })

            
        const suggested = prodInfo.map (cabin => {

            return{
                cabinID: cabin.id,
                cabin: cabin.name,
                cabinImage: `${RES_URL}images/${cabin.mainImage.name}`,
                startDate: getProxAvail(cabin.bookings,start,end).startDate,
                endDate: getProxAvail(cabin.bookings,start,end).endDate,
                status: true
            }

        })

        res.status(200).json({
            meta:{
                status:'success',
            },
            data: {
                main: main,
                suggested:suggested
            },
            // prodInfo
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
      
    getAvailForProduct : async (req, res) => {
        
    try {
        const product = req.params.id
        const timeLimit = req.query.time
        
        const needForProduct = product ? {id: { [Op.eq]: product }} : {}
        let needForTime

        if(timeLimit === 'free'){        
            needForTime = {}
        }else{

            timeLimit === undefined ? needForTime = {start_date: { [Op.gte]: getLastMonth() }} : needForTime = {start_date: { [Op.gte]: timeLimit }}
        }


        const prodInfo = await db.Product.findAll({
                attributes:['id', 'name', 'adults', 'kids', 'pets'],
                order:[['bookings','startDate','ASC']],
                where: needForProduct,
                include:[

                    {
                        model: db.Image, as: 'mainImage',
                        attributes: ['name'],
                    },

                    {
                        model: db.Booking, as: 'bookings',
                        attributes: ['code', 'startDate', 'endDate'],
                        where: [{cancelled: false}, needForTime],
                        include:[
                            {
                                model:db.User, as:'user', attributes:['id','name','email','access']
                            },
                            {
                                model:db.Source, as:'source',attributes:['name']
                            }
                        ]
                    }

                ]
            })
        


        const info = prodInfo.map( cabin => {
            
            const bookings = cabin.bookings.map( booking => {
                return(
                    {
                        startDate: booking.startDate,
                        endDate: booking.endDate,
                        days: getNumberOfDays(booking.startDate, booking.endDate),
                        user: {
                            name:booking.user.name, mail:booking.user.email,
                            source:booking.source.name, access:booking.user.access
                        }
                    }
                )
            })
            
            
            return(
                {
                    cabinID:cabin.id,
                    name: cabin.name,
                    adults: cabin.adults,
                    kids: cabin.kids,
                    pets: cabin.pets,
                    mainImage: `${RES_URL}images/${cabin.mainImage.name}`,
                    bookingsInfo: {
                        bookingsNumber: bookings.length,
                        bookingsDays: bookings.reduce( (ac,el) => ac + el.days, 0),
                    },
                    bookings,
                    nextAvail: {
                        startDate: getProxAvail(cabin.bookings,undefined,undefined).startDate,
                        endDate: getProxAvail(cabin.bookings,undefined,undefined).endDate
                    }
                }

            )    
            
        })
        
        
        res.status(200).json({
        meta:{

            status:'success',
            products: info.length,
            bookings: info.reduce((ac,el) => ac + el.bookingsInfo.bookingsNumber, 0),
            days: info.reduce( (ac,el) => ac + el.bookingsInfo.bookingsDays, 0)
        },
        data: info,
        // prodInfo
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

  module.exports = availController