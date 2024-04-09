const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },

  total: {
    type: Number,
    required: false,
  },

  shippingAddress: {
    type: String,
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("orders", orderSchema);
