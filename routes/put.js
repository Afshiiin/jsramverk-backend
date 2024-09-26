const express = require('express');
const mongoose = require('mongoose');
const Document = require('../models/Doc.js'); 

const router = express.Router();

router.put('/put', async (req, res) => {
  try {
    const result = await Document.updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
        value: req.body.value,
        allowed_users: req.body.allowed_users,
      }
    );

    console.log(result);
    res.status(201).json({
      message: 'Handling PUT requests to /documents',
      updated: result,
    });
  } catch (err) {
    console.error(err); // Use console.error for logging errors
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
