const mongoose = require('mongoose');

//schema
const reorderData = mongoose.Schema(
  {
    productNo: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      required: true,
      maxlength: 100,
    },

    shortDescription: {
      type: String,
      required: true,
      maxlength: 255,
    },

    category: {
      type: String,
      require: true,
    },

    cost: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    reorderLevel: {
      type: Number,
      required: true,
      min: 0,
    },
    manufactureDate: {
      type: Date,
      required: true,
    },

    expiaryDate: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Reorder', reorderData);
