const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const empSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  // age: {
  //   type: String,
  // },
  rawMaterial: {
    type: String,
  },
  // country: {
  //   type: String,
  // },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },
  // payment: {
  //   type: Map,
  //   of: Number,

  //   default: {},
  // },

  materialCost: {
    type: Map,
    of: Number,
    required: true,
    default: {},
  },
});

module.exports = mongoose.model("supplier", empSchema);
