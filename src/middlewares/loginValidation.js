
const loginValidation =  (req, res, next) => {

    // console.log('REQ BODy ', typeof req.body, Object.keys(req.body), req.body.mail.length, req.body.code);
    const mail = req.body.mail
    const code = req.body.code
    // console.log(req);
    req.errors = {
        code:{status:false, msg:''},
        mail:{status:false, msg:''},
    }


    if (code.length === 0){ req.errors.code = {status: true, msg:'Completar código de reserva'} }
    if (mail.length === 0){ req.errors.mail = {status: true, msg:'Completar mail'} }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))){ req.errors.mail = {status: true, msg:'Completar con mail válido'} }

    next();
    
}

module.exports = loginValidation