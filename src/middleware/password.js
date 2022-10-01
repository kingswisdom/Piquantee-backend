/*-------------------------------------------------------/
|-----------------Variables globales--------------------/
|-----------------------------------------------------*/

const passwordSchema = require("../models/password");


/*-------------------------------------------------------/
|----------------------Exports--------------------------/
|-----------------------------------------------------*/

exports.checkPolicy = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(401).json({ message: 'Mot de passe non conforme'});
    } 
    else {
        next();
    }
};