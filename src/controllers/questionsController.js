const {RES_URL} = require('../helpers/config')
const { Op } = require('sequelize');
const db = require('../database/models');


const questionsController = {

    getSurveyOnBooking : async (req, res) => {
        
        try {

            const needForCode = {codeBooking: { [Op.eq]: req.params.code }}
  
            const feedbackInfo = await db.Feedback.findAll({
                attributes:['codeBooking', 'feedback','createdAt'],
                where: needForCode,
                order:[['question','order','ASC']],
                include:[
                    {
                        model: db.Question, as: 'question',
                        attributes:['question','choice'],
                    }
                ]
            })

            if (feedbackInfo.length>0){
                        
            const info = feedbackInfo.map( fb => {
                        return {
                            question: fb.question.question,
                            choice: fb.question.choice,
                            feedback: fb.feedback,
                            createdAt: fb.createdAt
                        }
                    })
                    
                    res.status(200).json({
                        meta:{
                            status:'feedbackGiven',
                            codeBooking: req.params.code,
                            total: info.length  
                        },
                        data: info,
                        // feedbackInfo
                        })
                    

                    
                    
            }else{
                const questionsInfo = await db.Question.findAll({
                        attributes:['id','question','choice'],
                        order:[['order','ASC']]
                    })

                    res.status(200).json({
                        meta:{
                            status:'feedbackRequest',
                            codeBooking: req.params.code,
                            total: questionsInfo.length  
                        },
                        data: questionsInfo,
                        // feedbackInfo
                        })
            }
                    
            
            
            

  
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

    postSurveyOnBooking : async (req, res) => {
        // console.log(req.body);
        try {
            if(Object.keys(req.errors).length >0){                
                // console.log('Controller REQErrors', req.errors);
                res.status(400).json({
                    meta:{
                      status:'error',
                    },
                    errorMsg: 'Revisar datos cargados',
                    errors: req.errors
                })   
                return
            }
            const code = req.body.code
            delete req.body.code;
            // console.log('Controller Body', req.body);

            let newFeedback = []
            for(let answer in req.body){
                let fb ={
                    idQuestion: Number(answer),
                    codeBooking: code,
                    feedback: req.body[answer]
                }
                newFeedback.push(fb)
            }

            const submitted = await newFeedback.map(fb => db.Feedback.create(fb) )

            
            
            res.status(200).json({
            meta:{

                status:'success',
            },
            data: submitted,
            
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

  module.exports = questionsController