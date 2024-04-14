const mongoose = require('mongoose');

const directOrderSchema = new mongoose.Schema({
  // Define your schema fields here, based on what data you want to store
  // For example:
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
    },
  ],
  // Add totalAmount field
  // Add more fields as needed
  createdAt: { type: Date, default: Date.now },
});

const DirectOrder = mongoose.model('DirectOrder', directOrderSchema);

module.exports = DirectOrder;
