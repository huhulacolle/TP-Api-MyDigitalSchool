const express = require('express');
var cors = require('cors');
require('dotenv').config();

const hostname = "0.0.0.0";
const port = 3000;

const server = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.MongoDB + "/tp");

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

const postRoute = require("./src/routes/postRoute");
postRoute(server);

const userRoute = require("./src/routes/userRoute");
userRoute(server);

server.listen(port, hostname);