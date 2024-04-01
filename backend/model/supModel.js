const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: String,
  },
  rawMaterial: {
    type: String,
  },
  quantity: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Supplier", supSchema);
