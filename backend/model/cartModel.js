const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,

      required: true,
      ref: 'Customer',
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
    stock: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Cart', cartSchema);
