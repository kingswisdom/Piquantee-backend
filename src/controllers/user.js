/*-------------------------------------------------------/
|-----------------Variables globales--------------------/
|-----------------------------------------------------*/

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
var validator = require("email-validator");
const User = require("../models/user.js");


/*-------------------------------------------------------/
|----------------------Exports--------------------------/
|-----------------------------------------------------*/

exports.signup = (req, res, next) => {
    console.log("Creating account " + req.body.email);
    let isValidEmail = validator.validate(req.body.email);
    if (isValidEmail == true){
        console.log("Email is valid");
        console.log("Hashing password");       
        bcrypt.hash(req.body.password, 10)
            .then(hashedPassword => {
                const user = new User({
                    email: req.body.email,
                    password: hashedPassword
                });
                console.log("password hashed " + hashedPassword);
                user.save()
                    .then(() => {res.status(201).json({ message: 'Utilisateur créé !' }); 
                                 console.log("New user saved to db")
                                }) 
                    .catch((error) => { res.status(400).json({ error }); console.log("Failed to save user");});
                
            })
            .catch(error => res.status(500).json({ error }));
    }
    else {
        return res.status(401).json({ message: 'Email non conforme'});
    }
};



exports.login = (req, res, next) => {
    console.log("login as " + req.body.email);
    User.findOne({ email: req.body.email })
       .then(user => {
           if (!user) {
                console.log("username invalid");
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
           }
           console.log("User found, checking password");
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                    console.log("invalid password");
                       return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                   }
                   console.log("password matches username");
                   res.status(200).json({
                       userId: user._id,
                       token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
};

