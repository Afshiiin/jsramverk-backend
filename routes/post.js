const express = require('express');
const mongoose = require('mongoose');
const Document = require('../models/Doc.js'); 

const router = express.Router();

router.post('/post', async (req, res) => {
  const docData = new Document({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    value: req.body.value,
    owner: req.body.owner,
    allowed_users: req.body.allowed_users,
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
