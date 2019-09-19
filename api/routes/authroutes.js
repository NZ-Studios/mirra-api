const userDb = require('../models/authmodel');
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('../auth/jwttoken');
const { validateUser } = require('../middleware/authmiddleware');

const router = express.Router();

router.post("/register-user", async (req, res) => {
    const user = req.body;

    //check to see if the payload is correct
    if (!user.email || !user.password || user.email === "" || user.password === "") {
        res.status(400).json({ message: 'Username and Password are both required to register a user' })
    }

    //hash the users password
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    try {
        //New User Authentication, if users email is fount then say sorry.. email already exists..
        const newUser = await userDb.loginUser(user.email);

        if(newUser)
            res.status(409).json({message: "Sorry this email already owns an account please try another Email"})

        const regUser = {
            name: user.name,
            email: user.email,
            password: user.password
        }

        const response = await userDb.registerUser(regUser);
        const token = jwt.getToken({email: user.email, password: user.password, id: response})
        if(response){
            res.status(201).json({message: "User Data Created", token : token})
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.post("/login", validateUser, (req, res) =>{
    const token = req.token;
    res.status(200).json({message:"Logged In", token})
})

module.exports = router;
