const express = require('express');
require('dotenv').config();

const hostname = "0.0.0.0";
const port = 3000;

const server = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.MongoDB);

server.use(express.urlencoded());
server.use(express.json());

const postRoute = require("./src/routes/postRoute");
postRoute(server);

const userRoute = require("./src/routes/userRoute");
userRoute(server);

server.listen(port, hostname);