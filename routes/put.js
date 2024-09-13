const express = require('express');
const mongoose = require('mongoose');
const Document = require('../models/Doc.js'); // Ensure the path and extension are correct

const router = express.Router();

router.put('/put', async (req, res) => {
  try {
    const result = await Document.updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
        value: req.body.value,
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
