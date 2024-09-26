const express = require('express');
const mongoose = require('mongoose');
const Users = require('../models/Users.js'); // Assuming this is your Mongoose model
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()

const handleErrors = (err)=> {
    let errors= {u_email:'', u_password:''}

if(err.message === "No account found!") {
    errors.u_email= "That email is not registered!"
}
if(err.message === "Incorrect password!") {
    errors.u_password= "The password is incorrect!"
}
    return errors;
}

router.post('/login', async (req, res) => {
    const u_email = req.body.u_email;
    const u_password = req.body.u_password;

    const maxAge = 1 * 24 * 60 * 60;   
    const createToken = (id) => {
        return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: maxAge });
    };
    
    try {
        const user = await Users.login(u_email, u_password);
        const token = createToken(user._id);
        
        res.status(200).json({
            email: user.u_email,
            token: token, 
            message: 'Handling POST requests to /login',
        });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
});

module.exports = router;