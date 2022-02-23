
const formsValidations =  (req, res, next) => {

    // console.log('REQ BODy ', req.body);
    
    req.inputs = req.body

    const answers = {}
    
    req.body.forEach(answer => {
        answers[answer['name']] = answer.value
    })

    req.body = answers
    next();
    
}

module.exports = formsValidations