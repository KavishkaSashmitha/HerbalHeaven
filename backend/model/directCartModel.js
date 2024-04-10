const mongoose = require('mongoose');

// Define schema and model for cart items
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming productId is referencing the ObjectId of the Product model
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const DirectCartItem = mongoose.model('directCartItem', cartItemSchema);

module.exports = DirectCartItem;
