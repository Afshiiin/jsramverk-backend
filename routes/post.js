const express = require('express');
const mongoose = require('mongoose');
const Document = require('../models/Doc.js'); // Ensure the path and extension are correct

const router = express.Router();

router.post('/post', async (req, res) => {
  const docData = new Document({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    value: req.body.value,
  });

  try {
    const result = await docData.save();
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /documents',
      created: docData,
    });
  } catch (err) {
    console.error(err); // Use console.error for logging errors
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
