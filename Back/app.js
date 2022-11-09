const express = require('express');

const hostname = "0.0.0.0";
const port = 3000;

const server = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017");

server.use(express.urlencoded());
server.use(express.json());

const postRoute = require("./src/routes/postRoute");
postRoute(server);

const userRoute = require("./src/routes/userRoute");
userRoute(server);

server.listen(port, hostname);