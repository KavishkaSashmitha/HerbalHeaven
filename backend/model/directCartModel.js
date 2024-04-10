const mongoose = require('mongoose');

// Define schema and model for cart items
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const DirectCartItem = mongoose.model('directCartItem', cartItemSchema);

module.exports = DirectCartItem;
