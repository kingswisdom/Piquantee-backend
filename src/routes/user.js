/*-------------------------------------------------------/
|-----------------Variables globales--------------------/
|-----------------------------------------------------*/

const express = require("express");
const router = express.Router();
const password = require("../middleware/password");
const userController = require("../controllers/user.js");

/*-------------------------------------------------------/
|-----------------------Routes--------------------------/
|-----------------------------------------------------*/

router.post("/signup", password.checkPolicy, userController.signup);
router.post("/login", userController.login);


/*-------------------------------------------------------/
|----------------------Exports--------------------------/
|-----------------------------------------------------*/

module.exports = router;