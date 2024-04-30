const express = require("express");
const Delivery = require("../model/delivery");

const router = express.Router();

// save posts
router.post("/delivery/save", async (req, res) => {
  try {
    let newDelivery = new Delivery(req.body);
    await newDelivery.save();
    res.status(200).json({
      success: "Delivery saved successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

// get posts
router.get("/deliveries", async (req, res) => {
  try {
    const deliveries = await Delivery.find().exec();
    res.status(200).json({
      success: true,
      existingDeliveries: deliveries,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

module.exports = router;
