
const surveyValidation =  (req, res, next) => {

    console.log('REQ BODy ', req.body);
    
    req.errors = {}

    for(let answer in req.body){
        // console.log('for loop ', answer);
        if(req.body[answer].length === 0){req.errors[answer] = {status: true, msg:'Respuesta Nula'}} 
        // if(answer.length === 0){req.errors = {[answer] : {status: true, msg:'Respuesta Nula'}} }
    }
    console.log('validations ', req.errors);
    next();
    
}

module.exports = surveyValidation