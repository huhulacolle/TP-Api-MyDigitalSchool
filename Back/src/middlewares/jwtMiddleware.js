const jwt = require("jsonwebtoken");
require('dotenv').config();

const jwtKey = process.env.JWT_KEY;

exports.verifyToken = (req, res, next) => {
    let token = extractBearerToken(req.headers['authorization']);
    if(token !== undefined) {
        jwt.verify(token, jwtKey, (error, payload) => {
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

function extractBearerToken(headerValue) {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}