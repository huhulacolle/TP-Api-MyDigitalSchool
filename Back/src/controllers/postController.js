const Post = require('../models/postModel');
const textApiProvider = require("../providers/textApiProvider");
const BearerToken = require("../providers/BearerToken");

exports.listAllPosts = (req, res) => {
    Post.find().exec()
        .then(
            data => {
                res.json(data);
            }
        )
        .catch(
            error => {
                console.log(error);
                return res.status(500).send();
            }
        )
}

exports.createAPost = (req, res) => {

    let role = BearerToken.getRole(req.headers['authorization']);

    if (role == "Admin") {
        let newPost = new Post(req.body);

        let randomTextPromise = textApiProvider.getRandomText();
    
        randomTextPromise.then((response) => {
            if (!newPost.content) {
                newPost.content = response;
            }
    
            newPost.save()
            .then(
                data => {
                    return res.status(201).json(data);
                }
            )
            .catch(
                error => {
                    console.log(error);
                    return res.status(400).send(error);
                }
            )
        })
    } else {
        return res.status(401).send();
    }
}