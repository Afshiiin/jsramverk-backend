const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const documents = require("../models/Doc");

router.get("/get", (req, res, next) => {
  //   const id = req.params.documentID

  documents
    .find()
    .exec()
    .then((doc) => {
      console.log("From database:", doc);
      if (doc) {
        res.send(res.status(200).json(doc));
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
module.exports = router;
