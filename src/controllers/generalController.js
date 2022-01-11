const nodemailer = require('nodemailer');
const { bookingMsg } = require('../helpers/contactMsgs');

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

  }

}


  module.exports = generalController