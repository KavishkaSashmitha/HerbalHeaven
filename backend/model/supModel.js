const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const empSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: String,
  },
  jobRole: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("supplier", empSchema);
