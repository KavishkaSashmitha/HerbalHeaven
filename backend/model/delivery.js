const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({
  d_name: {
    type: String,
    required: true,
  },

  d_mobile: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  nic: {
    type: String,
    required: true,
  },

  vehicle_type: {
    type: String,
    required: true,
  },

  vehicle_No: {
    type: String,
    required: true,
  },

  shipping_Id: {
    type: String,
    required: true,
  },

  shippingAddress: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("delivery", DeliverySchema);
