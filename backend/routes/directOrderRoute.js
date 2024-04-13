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

// get aal direct order
router.get('/', async (req, res) => {
  let directOrder;
  try {
    directOrder = await DirectOrder.find();
  } catch (err) {
    console.log(err);
  }
  if (!directOrder) {
    return res.status(404).json({ message: "DirectOrder not found" });
  }
  return res.status(200).json({ directOrder });
});
module.exports = router;
