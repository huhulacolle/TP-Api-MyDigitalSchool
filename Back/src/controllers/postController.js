const Post = require('../models/postModel');
const textApiProvider = require("../providers/textApiProvider");

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
                return res.status(500);
            }
        )
}

exports.createAPost = (req, res) => {
    let newPost = new Post(req.body);

    let randomTextPromise = textApiProvider.getRandomText();

    randomTextPromise.then((response) => {
        if (!newPost.content) {
            newPost.content = response;
        }

        newPost.save()
        .then(
            data => {
                res.status(201).json(data);
            }
        )
        .catch(
            error => {
                console.log(error);
                res.status(400);
            }
        )

    })

}

exports.getAPost = (req, res) => {
    Post.findById(req.params.post_id, (error, post) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json(post);
        }

    })
}

exports.updateAPost = (req, res) => {
    Post.findByIdAndUpdate(req.params.post_id, req.body, { new: true }, (error, post) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json(post);
        }

    })
}

exports.deleteApost = (req, res) => {
    Post.findByIdAndRemove(req.params.post_id, (error) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json({ message: "Article supprimé" });
        }

    })
}