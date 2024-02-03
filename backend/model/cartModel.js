const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,

      required: true,
      ref: 'User',
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Cart', cartSchema);
