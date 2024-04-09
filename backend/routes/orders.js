const express = require("express");
const Orders = require("../model/orders");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//save posts

router.post("/order/save", protect, async (req, res) => {
  try {
    let newOrder = new Orders({
      user: req.user.name,
      ...req.body,
    });
    await newOrder.save();
    return res.status(200).json({
      success: "Order saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//get user orders
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Orders.find({ user: req.user.name }).exec();
    return res.status(200).json({
      success: true,
      existingOrders: orders,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//get posts

router.get("/orders", async (req, res) => {
  try {
    const orders = await Orders.find().exec();
    return res.status(200).json({
      success: true,
      existingOrders: orders,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//get a specific post

router.get("/order/:id", async (req, res) => {
  try {
    let orderId = req.params.id;
    const order = await Orders.findById(orderId).exec();
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

//update posts

router.put("/order/update/:id", async (req, res) => {
  try {
    const order = await Orders.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({
      success: "Updated Successfully",
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

//delete post

router.delete("/order/delete/:id", async (req, res) => {
  try {
    const deletedOrder = await Orders.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    return res.json({
      message: "Delete successful",
      deletedOrder,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Delete unsuccessful",
      error: err.message,
    });
  }
});

module.exports = router;
