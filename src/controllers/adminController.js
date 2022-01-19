const db = require('../database/models');
const { Op } = require('sequelize');
const DOMAIN = require('../helpers/config');

const adminController = {

  login : async (req, res) => {

    console.log(req.body);
    try {
      if(req.errors.pass.status || req.errors.user.status){                
          
          res.status(400).json({
              meta:{
                status:'error',
              },
              errorMsg: 'Revisar datos cargados',
              errors: req.errors
          })   
          return
      }
      
      const needForUser = {user: { [Op.eq]: req.body.user }}

      const userInfo = await db.Owner.findAll({
          where: needForUser
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
              errors: {...req.errors, user:{status:true, msg:'Usuario incorrecto'}}
          })   
          return
      }    
      
      const isPassCorrect = isMailCorrect && userInfo[0].pass === req.body.pass ? true : false
      
      if(!isPassCorrect){
          res.status(400).json({
              meta:{
              status:'error',
              // userInfo
              },
              errorMsg: 'Revisar datos cargados',
              errors: {...req.errors, pass:{status:true, msg:'Contraseña incorrecta'}}
          })   
          return
      }


      let info
      if(isMailCorrect && isPassCorrect){
          info = userInfo[0]
      }
              
              res.status(200).json({
                  meta:{
                      status:'success'  
                  },
                  data: info,
                  // info:webInfo[0]
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
  }

}


  module.exports = adminController