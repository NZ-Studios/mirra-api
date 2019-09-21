const userDb = require('../models/authmodel');
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('../auth/jwttoken');
const { validateUser } = require('../middleware/authmiddleware');

const router = express.Router();

router.post("/register", async (req, res) => {
    const user = req.body;

    if (!user.email || !user.password || user.email === '' || user.password === ''){
        res.status(400).json({ message: "Missing user information" });
    }

    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
    
    try{
        const newUser = await userDb.loginUser(user.email);
       
        if (newUser)
            res.status(409).json({ message: "User already exists" });
        
      
        const regUser = {name: user.name, email: user.email, password: user.password };
      
        const response = await userDb.registerUser(regUser);
        const token =  jwt.getToken({ email: user.email, password: user.password, id: response});
        if (response){
            res.status(200).json({ message: "User created", token: token });
        }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.post("/login", validateUser, (req, res) =>{
    const token = req.token;
    res.status(200).json({message:"Logged In", token})
})

module.exports = router;
