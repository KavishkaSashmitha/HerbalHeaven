const mongoose = require('mongoose');

//schema
const inventoryData = mongoose.Schema(
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
      validate: {
        validator: function (value) {
          // Custom validation: Ensure manufactureDate is before expiaryDate
          return value < this.expiaryDate;
        },
        message: 'Manufacture date must be before expiary date',
      },
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

module.exports = mongoose.model('Inventory', inventoryData);
