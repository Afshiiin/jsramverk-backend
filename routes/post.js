const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const documents = require("../models/Doc");

router.post("/post", (req, res, next) => {
  const docData = new documents({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    value: req.body.value,
  });
  docData
    .save()
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
