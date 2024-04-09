const express = require("express");
const Orders = require("../model/orders");

const router = express.Router();

//save posts

router.post("/order/save", async (req, res) => {
  try {
    let newOrder = new Orders(req.body);
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

router.put("/order/update/:id", (req, res) => {
  Orders.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, order) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      return res.status(200).json({
        success: "Updated Succesfully",
      });
    }
  );
});

//delete post

router.delete("/order/delete/:id", (req, res) => {
  Orders.findByIdAndRemove(req.params.id).exec((err, deletedOrder) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccesfull",
        err,
      });

    return res.json({
      message: "Delete succesfull",
      deletedOrder,
    });
  });
});

module.exports = router;
