/*-------------------------------------------------------/
|-----------------Variables globales--------------------/
|-----------------------------------------------------*/

const passwordValidator = require("password-validator");

var schema = new passwordValidator();


/*-------------------------------------------------------/
|-----------------------Modèle--------------------------/
|-----------------------------------------------------*/

schema
  .is().min(8)                                      // Minimum length 8
  .is().max(100)                                    // Maximum length 100
  .has().uppercase()                                // Must have uppercase letters
  .has().lowercase()                                // Must have lowercase letters
  .has().digits(1)                                  // Must have at least 2 digits
  .has().not().spaces()                             // Should not have spaces
  .is().not().oneOf(["Passw0rd", "Password123"]);   // Blacklist these values


/*-------------------------------------------------------/
|----------------------Exports--------------------------/
|-----------------------------------------------------*/

module.exports = schema;