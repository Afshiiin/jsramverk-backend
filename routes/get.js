const express = require('express');
const mongoose = require('mongoose');
const Document = require('../models/Doc.js'); // Adjust path and extension if needed

const router = express.Router();

router.get('/get', async (req, res, next) => {
  try {
    const docs = await Document.find().exec();
    console.log('From database:', docs);
    if (docs && docs.length > 0) {
      res.status(200).json(docs);
    } else {
      res.status(404).json({ message: 'No valid entry found!' });
    }
  } catch (err) {
    console.error(err); // Use console.error for logging errors
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
