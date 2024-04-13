const express = require('express');
const DirectOrder = require('../model/DirectOrder');

const router = express.Router();

// Middleware to parse JSON in request body
router.use(express.json());

// Create a direct order
router.post('/', async (req, res) => {
  try {
    // Assuming items are present in req.body.items
    const directOrder = new DirectOrder({ items: req.body.items });
    await directOrder.save();
    res.status(201).json(directOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all direct orders
router.get('/', async (req, res) => {
  try {
    const directOrders = await DirectOrder.find();
    res.json(directOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
