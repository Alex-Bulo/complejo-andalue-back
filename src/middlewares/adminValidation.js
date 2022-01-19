
const adminValidation =  (req, res, next) => {

    // console.log('REQ BODy ', typeof req.body, Object.keys(req.body), req.body.mail.length, req.body.code);
    const user = req.body.user
    const pass = req.body.pass
    // console.log(req);
    req.errors = {
        user:{status:false, msg:''},
        pass:{status:false, msg:''},
    }


    if (pass.length === 0){ req.errors.pass = {status: true, msg:'Completar Contraseña'} }
    if (user.length === 0){ req.errors.user = {status: true, msg:'Completar Usuario'} }

    next();
    
}

module.exports = adminValidation