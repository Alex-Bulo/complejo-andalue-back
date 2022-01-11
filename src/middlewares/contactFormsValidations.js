
const contactFormsValidations = {
    bookingMail : (req, res, next) => {
        // console.log(req.body);
        const userName = req.body.userName
        const userMail = req.body.userMail

        req.errors = {
            name:{status:false,msg:''},
            mail:{status:false,msg:''},
        }


        if (userName.length === 0){ req.errors.name = {status: true, msg:'Completar con nombre'} }
        if (userMail.length === 0){ req.errors.mail = {status: true, msg:'Completar con mail'} }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userMail))){ req.errors.mail = {status: true, msg:'Completar con mail válido'} }

        next();
    
    },



    contactUs : (req, res, next) => {
        // console.log(req.body);
        const name = req.body.name
        const mail = req.body.mail
        const info = req.body.info
        req.errors = {
            name:{status:false,msg:''},
            mail:{status:false,msg:''},
            info:{status:false,msg:''}
        }

        if (name.length === 0){ req.errors.name = {status: true, msg:'Completar con nombre'} }
        if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))){ req.errors.mail = {status: true, msg:'Completar con mail válido'} }
        if (info.length === 0){ req.errors.info = {status: true, msg:'Completar consulta'} }


        next();
    
    }
}

module.exports = contactFormsValidations