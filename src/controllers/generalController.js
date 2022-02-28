const nodemailer = require('nodemailer');
const { bookingMsg } = require('../helpers/contactMsgs');
const db = require('../database/models');
const DOMAIN = require('../helpers/config');

const generalController = {
    
  bookingMail : async (req, res) => {

    try {
      if(req.errors.name.status ||req.errors.mail.status){                
          
        res.status(400).json({
            meta:{
              status:'error',
            },
            errorMsg: 'Revisar datos cargados',
            errors: req.errors
        })   
        return
      }


        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
               ciphers:'SSLv3'
            },
            auth: {
                user: 'serverAndalue@outlook.com',
                pass: 'andalue1234'
            }
        });
        const msg = bookingMsg(
                            req.body.cabin,
                            req.body.startDate,
                            req.body.endDate,
                            req.body.adults,
                            req.body.kids,
                            req.body.pets,
                            req.body.userName,
                            req.body.userMail
                            )
  
        const mailOptions = {
            from: '"Formulario Contacto " <serverAndalue@outlook.com>', // sender address (who sends)
            to: 'bullorinia@gmail.com',
            subject: 'Consulta Reserva', 
            text: msg.text, // plaintext body
            html: msg.html // html body
        };
  
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                throw new Error(error)
            }else{
                console.log('Message sent: ' + info.response);
                res.status(200).json({
                    meta:{
                      status:'success',
                    },
                    data: 'Mensaje Enviado'
                    // msg: info.response
                  })
            }
        
        });
      
        
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

  contactUs : async (req, res) => {

    try {
      
      if(req.errors.name.status ||req.errors.mail.status || req.errors.info.status){                
          
        res.status(400).json({
            meta:{
              status:'error',
            },
            errorMsg: 'Revisar datos cargados',
            errors: req.errors
        })   
        return
      }


        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
               ciphers:'SSLv3'
            },
            auth: {
                user: 'serverAndalue@outlook.com',
                pass: 'andalue1234'
            }
        });

        const html = `
            <b> Consulta desde Página de Contacto</b><br>
            De: ${req.body.name}<br>
            Mail: ${req.body.mail} <br> <br>
            Consulta: ${req.body.info} <br>       
        `
        const mailOptions = {
            from: '"Formulario Contacto " <serverAndalue@outlook.com>', // sender address (who sends)
            to: 'bullorinia@gmail.com',
            subject: 'Consulta desde Página Contacto', 
            text: html, // plaintext body
            html: html // html body
        };
  
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                throw new Error(error)
            }else{
                console.log('Message sent: ' + info.response);
                res.status(200).json({
                    meta:{
                      status:'success',
                    },
                    data: 'Mensaje Enviado'
                    // msg: info.response
                  })
            }
        
        });
      
        
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

  webData : async (req, res) => {
    // console.log('DATABASE_URL', process.env.DATABASE_URL)
    // console.log('DB_PORT', process.env.DATABASE_URL.PORT)
    // console.log('DBPORT', process.env.DBPORT)
    try {
        
      const webInfo = await db.Info.findAll()
      
      if (webInfo.length===0){
        throw new Error('No se cargó info de la página')
      }
      
      const data = webInfo[0]
      // console.log(data);
      const info = {
        ...data.dataValues,
        welcomeMsg: data.welcomeMsg.replace(/\n/g, '<br/>'),
        contactOwners: data.contactOwners.replace(/\n/g, '<br/>'),
        contactExtra: data.contactExtra.replace(/\n/g, '<br/>'),
        videoOne: data.videoOne ? `${DOMAIN}api/videos/${data.videoOne}` : null, 
        videoTwo: data.videoTwo ? `${DOMAIN}api/videos/${data.videoTwo}` : null, 
        videoThree: data.videoThree ? `${DOMAIN}api/videos/${data.videoThree}` : null, 
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


  module.exports = generalController