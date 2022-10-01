/*-------------------------------------------------------/
|-----------------Variables globales--------------------/
|-----------------------------------------------------*/
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/user.js");
const sauceRoutes = require("./src/routes/sauces.js");
const app = express();
const dotenv = require("dotenv");


/*-------------------------------------------------------/
|---------------------Paramètres------------------------/
|-----------------------------------------------------*/

/*#####################-dotenv-#####################*/

dotenv.config();

/*####################-Mongoose-####################*/

mongoose                                                              
    .connect(process.env.mongo_URI)

    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

/*######################-CORS-######################*/

app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});


/*####################-Express-#####################*/


app.use(express.json());


/*-------------------------------------------------------/
|-------------------------Routes------------------------/
|-----------------------------------------------------*/

app.use(express.static(path.join(__dirname, './public')));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);


/*-------------------------------------------------------/
|-----------------------Exports-------------------------/
|-----------------------------------------------------*/

module.exports = app;

