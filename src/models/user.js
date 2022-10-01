/*-------------------------------------------------------/
|-----------------Variables globales--------------------/
|-----------------------------------------------------*/

const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

/*-------------------------------------------------------/
|-----------------------Modèle--------------------------/
|-----------------------------------------------------*/

const userSchema = mongoose.Schema({
    email:      { type: String, required: true, unique: true },
    password:   { type: String, required: true }
});

userSchema.plugin(uniqueValidator);


/*-------------------------------------------------------/
|-----------------------Exports-------------------------/
|-----------------------------------------------------*/

module.exports = mongoose.model('User', userSchema);