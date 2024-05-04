const mongoose = require("mongoose");

const ReOrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  productName: {
    type: String,
    required: true,
  },

  quantity: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("supplierOrder", ReOrderSchema);
