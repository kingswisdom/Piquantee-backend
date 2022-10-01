/*-------------------------------------------------------/
|-----------------Variables globales--------------------/
|-----------------------------------------------------*/

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const multer = require("../middleware/multer.js");
const saucesController = require("../controllers/sauces.js");

/*-------------------------------------------------------/
|-----------------------Routes--------------------------/
|-----------------------------------------------------*/

router.get("/", auth, saucesController.getAllSauces);
router.post("/", auth, multer, saucesController.createSauce);
router.get("/:id", auth, saucesController.getOneSauce);
router.put("/:id", auth, multer, saucesController.modifySauce);
router.delete("/:id", auth, saucesController.deleteSauce);
router.post("/:id/like", auth, saucesController.likeSauce);


/*-------------------------------------------------------/
|----------------------Exports--------------------------/
|-----------------------------------------------------*/

module.exports = router;