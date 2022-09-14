const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const documents = require("../models/Doc");

router.delete("/delete", (req, res, next) => {
  const docData = documents
    .deleteOne({ _id: req.body.id })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        Message: "Handling POST requests to /documents",
        created: docData,
      });
    })
    .catch((err) => {
      console.log(err), res.status(500).json({ error: err });
    });
});

module.exports = router;
