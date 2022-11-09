const jwt = require("jsonwebtoken");
const bearerToken = require("../providers/BearerToken");
require('dotenv').config();

const jwtKey = process.env.JWT_KEY;

exports.verifyToken = (req, res, next) => {
    let token = bearerToken.extractBearerToken(req.headers['authorization']);
    if(token !== undefined) {
        jwt.verify(token, jwtKey, (error) => {
            if(error) {
                console.log(error)
                res.status(401).json({message : 'Accès interdit : token invalide'});
            }
            else {
                next();                
            }
        })
    }
    else {
        res.status(401).json({message : "Accès interdit : token manquant"})
    }
}