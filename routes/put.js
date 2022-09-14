const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const documents = require("../models/Doc");

router.put("/put", (req, res, next) => {
  const docData = documents
    .updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
        value: req.body.value,
      }
    )
    .then((result) => {
      console.log(result);
      res.status(201).json({
        Message: "Handling PUT requests to /documents",
        created: docData,
      });
    })
    .catch((err) => {
      console.log(err), res.status(500).json({ error: err });
    });
});

module.exports = router;
