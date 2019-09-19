const express = require('express');
const authRoute = require('./routes/authroutes');
const usersRoute = require('./routes/userroutes');
const postRoute = require('./routes/postroutes');
const helmet = require('helmet');
const cors = require('cors');
const { isLoggedIn } = require('./middleware/authmiddleware');

const server = express(); 

server.use(helmet());
 
server.use(cors());

server.use(express.json());
 
server.use("/api", authRoute);  
server.use("/api", isLoggedIn, usersRoute);  
server.use("/api", isLoggedIn, postRoute);  


server.get('/', (req, res) => {
  
    res.status(200).json({message: "Vivid Connections Social Media API"});

});

module.exports = server;