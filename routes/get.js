const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 
const Document = require('../models/Doc.js'); 
const { requireAuth } = require('../middelware/authMiddelware.js');

const router = express.Router();

router.get('/get', requireAuth, async (req, res) => {
  try {
    const docs = await Document.find().exec(); 
    if (docs && docs.length > 0) {
      return res.status(200).json(docs); 
    } else {
      return res.status(404).json({ message: 'No valid entry found!' });
    }
  } catch (err) {
    console.error(err); 
    return res.status(500).json({ error: err.message }); 
  }
});

module.exports = router;