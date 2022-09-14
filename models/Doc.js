const mongoose = require("mongoose");

const docSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  value: String,
});

module.exports = mongoose.model("Documents", docSchema);
