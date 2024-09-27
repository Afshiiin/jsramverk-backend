const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 
const Users = require('../models/Users.js'); 
const { requireAuth } = require('../middelware/authMiddelware.js');

const router = express.Router();

router.get('/getUsers', async (req, res) => {
  try {
    const users = await Users.find().exec(); 
    if (users && users.length > 0) {
      return res.status(200).json(users); 
    } else {
      return res.status(404).json({ message: 'No valid entry found!' });
    }
  } catch (err) {
    console.error(err); 
    return res.status(500).json({ error: err.message }); 
  }
});

module.exports = router;