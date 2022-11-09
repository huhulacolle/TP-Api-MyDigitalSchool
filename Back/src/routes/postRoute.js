module.exports = (server) => {
    const postController = require("../controllers/postController");
    const jwtMiddleware = require("../middlewares/jwtMiddleware");
server.route("/posts")
.get(jwtMiddleware.verifyToken, postController.listAllPosts)
.post(jwtMiddleware.verifyToken, postController.createAPost)
}