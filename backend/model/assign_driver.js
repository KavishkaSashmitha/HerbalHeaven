const mongoose = require("mongoose");

const TransportSchema = new mongoose.Schema({
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
  vehicle_type: {
    type: String,
    required: true,
  },

  vehicle_No: {
    type: String,
    required: true,
  },
  address: {
    ype: String,
    required: true,
  },
  
});

module.exports = mongoose.model("transports", TransportSchema);
