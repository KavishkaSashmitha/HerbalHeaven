const express = require('express');
const DirectCartItem = require('../model/directCartModel');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { item } = req.body;

    // Validate item
    if (!item || typeof item.quantity !== 'number' || !item.productId) {
      return res.status(400).json({ error: 'Invalid cart item' });
    }

    // Check if the item already exists in the cart
    const existingCartItem = await DirectCartItem.findOne({
      productId: item.productId,
    });

    if (existingCartItem) {
      // If the item already exists, update its quantity
      existingCartItem.quantity += item.quantity;
      await existingCartItem.save();
    } else {
      // If the item doesn't exist, create a new cart item
      await DirectCartItem.create(item);
    }

    res.status(201).json({ message: 'Cart item added successfully' });
  } catch (error) {
    console.error('Error adding cart item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const cartItems = await DirectCartItem.find();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
