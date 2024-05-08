const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
  customer: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: false,
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
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
      },
    },
  ],
});

function generateOrderId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let orderId = 'ORD#';
  for (let i = 0; i < 6; i++) {
    orderId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return orderId;
}

orderSchema.pre('save', async function (next) {
  if (!this.orderId) {
    let orderId = generateOrderId();
    const exists = await mongoose.models.orders.findOne({ orderId });
    while (exists) {
      orderId = generateOrderId();
      exists = await mongoose.models.orders.findOne({ orderId });
    }
    this.orderId = orderId;
  }
  next();
});

module.exports = mongoose.model('orders', orderSchema);
