const mongoose = require('mongoose');

const { Schema, model, Types } = mongoose;

const docSchema = new Schema({
  _id: Types.ObjectId,
  name: String,
  value: String,
  owner: String,
  allowed_users: [String],
});

const Document = model('Documents', docSchema);

module.exports = Document;
