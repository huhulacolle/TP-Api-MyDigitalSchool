const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.userRegister = async (req, res) => {
    let newUser = new User(req.body);

    newUser.save()
        .then(
            data => {
                return res.status(201).json({ message: `Utilisateur crée : ${data.email}` });
            }
        )
        .catch(
            err => {
                console.log(err);
                return res.status(401);
            }
        )

}

exports.loginRegister = (req, res) => {

    User.findOne({ email: req.body.email, password: req.body.password }).exec()
        .then(
            data => {
                let userData = {
                    id: data._id,
                    email: data.email,
                    role: "admin"
                }
                jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "30 days" }, (error, token) => {
                    if (error) {
                        console.log(error);
                        return res.status(500);
                    }
                    else {
                        return res.json({ token });
                    }
                })
            }
        )
        .catch(
            err => {
                console.log(err);
                return res.status(500).json({ message: "Email ou Mot de passe incorrect" });
            }
        )
}