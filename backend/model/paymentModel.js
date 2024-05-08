const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: 1,
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
    country: {
      type: String,
      default: "",
      required: true,
    },
    cardholdername: {
      type: String,
      required: true,
    },
    cardnumber: {
      type: String,
      required: true,
    },
    expmonth: {
      type: String,
      required: true,
    },
    // expyear: {
    //   type: String,
    //   required: true,
    // },
    cvv: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
