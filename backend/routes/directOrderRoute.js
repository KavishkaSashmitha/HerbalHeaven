const express = require('express');

const DirectOrder = require('../model/DirectOrder');

const router = express.Router();
// Create a direct order
router.post('/', async (req, res) => {
  try {
    const directOrder = new DirectOrder(req.body);
    await directOrder.save();
    res.status(201).json(directOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
