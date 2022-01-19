const { Op } = require('sequelize');
const db = require('../database/models');


const usersController = {

    login : async (req, res) => {
        // console.log(req.body);
        try {
            if(req.errors.code.status || req.errors.mail.status){                
                
                res.status(400).json({
                    meta:{
                      status:'error',
                    },
                    errorMsg: 'Revisar datos cargados',
                    errors: req.errors
                })   
                return
            }

            const needForUser = {access: true, email: { [Op.eq]: req.body.mail }}
  
            const userInfo = await db.User.findAll({
                attributes:['id', 'name'],
                where: needForUser,
                include:[
                    {
                        model: db.Booking, as: 'bookings',
                        attributes: ['code','startDate', 'endDate'],
                        include:[
                            {model:db.Product, as:'product',attributes:['id','name'],required:true},
                            {model:db.Feedback, as:'feedback',attributes:['codeBooking','feedback']}
                        ]
                    }
                ]
            })
            // console.log(JSON.parse(userInfo));
            const isMailCorrect = userInfo.length === 0 ? false : true
            
            if(!isMailCorrect){
                res.status(400).json({
                    meta:{
                    status:'error',
                    // userInfo
                    },
                    errorMsg: 'Revisar datos cargados',
                    errors: {...req.errors, mail:{status:true, msg:'Mail incorrecto'}}
                })   
                return
            }    
            console.log(userInfo[0].bookings);
            const isCodeCorrect = isMailCorrect && userInfo[0].bookings.some(booking => booking.code === req.body.code) 
            
            if(!isCodeCorrect){
                res.status(400).json({
                    meta:{
                    status:'error',
                    // userInfo
                    },
                    errorMsg: 'Revisar datos cargados',
                    errors: {...req.errors, code:{status:true, msg:'Código incorrecto'}}
                })   
                return
            }


            let info
            if(isMailCorrect && isCodeCorrect){
                info = userInfo.map(user=>{
                    return {
                        id: user.id, 
                        name:user.name,
                        accessCode:req.body.code,
                        bookings: user.bookings.map(booking => {
                            
                            return {
                                code: booking.code,
                                startDate: booking.startDate,
                                endDate: booking.endDate,
                                cabinId: booking.product.id,
                                cabin: booking.product.name,
                                feedback: booking.feedback.length === 0 ? false : true
                            }
                        })
                    }
                })
            }
            
            
            
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
  

  }

  module.exports = usersController