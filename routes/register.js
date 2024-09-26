const express = require('express');
const mongoose = require('mongoose');
const Users = require('../models/Users.js'); // Assuming this is your Mongoose model
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()


router.post('/register', async (req, res) => {
      

  const userData = new Users({
    _id: new mongoose.Types.ObjectId(),
    u_email: req.body.u_email,
    u_password: req.body.u_password, 
  });
  
  const maxAge = 1 * 24 * 60 * 60;   
  const createToken = (id) => {
      return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: maxAge });
  };

  try {
    const user = await userData.save();
    const token = createToken(user._id);

    res.status(201).json({
      email: user.u_email,
      token: token, 
      message: 'Handling POST requests to /register',
      createdUser: userData, // returning the saved user data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;