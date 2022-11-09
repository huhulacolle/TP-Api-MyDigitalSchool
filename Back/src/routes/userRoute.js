module.exports = (server) => {
const userController = require("../controllers/userController");

server.post("/user/register", userController.userRegister);
server.post("/user/login", userController.loginRegister);
server.post("/user/loginAdmin", userController.adminLogin);
}