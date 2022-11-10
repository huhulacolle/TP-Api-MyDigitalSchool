const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.userRegister = async (req, res) => {
    const saltRounds = 10;

    req.body.password = await bcrypt.hash(req.body.password, saltRounds);

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
                return res.status(401).send();
            }
        )
}

exports.loginRegister = (req, res) => {

    console.log(req.body);

    User.findOne({ email: req.body.email }).exec()
        .then(
            async data => {
                mdpVerif = await bcrypt.compare(req.body.password, data.password);

                if (mdpVerif) {
                    let userData = {
                        id: data._id,
                        email: data.email,
                        role: "User"
                    }
                    jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "30 days" }, (error, token) => {
                        if (error) {
                            console.log(error);
                            return res.status(500).json(error);
                        }
                        else {
                            return res.json({ token });
                        }
                    })
                } else {
                    return res.status(500).json({ message: "Mot de passe incorrect" });
                }
            }
        )
        .catch(
            () => {
                return res.status(500).json({ message: "Email ou Mot de passe incorrect" });
            }
        )
}

exports.adminLogin = (req, res) => {
    User.findOne({ email: req.body.email }).exec()
        .then(
            async data => {
                mdpVerif = await bcrypt.compare(req.body.password, data.password);

                if (mdpVerif) {
                    let userData = {
                        id: data._id,
                        email: data.email,
                        role: "Admin"
                    }
                    jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "30 days" }, (error, token) => {
                        if (error) {
                            console.log(error);
                            return res.status(500).json(error);
                        }
                        else {
                            return res.json({ token });
                        }
                    })
                } else {
                    return res.status(500).json({ message: "Mot de passe incorrect" });
                }
            }
        )
        .catch(
            () => {
                return res.status(500).json({ message: "Email ou Mot de passe incorrect" });
            }
        )
}