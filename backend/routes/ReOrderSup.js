const express = require("express");
const ReOrder = require("../model/ReOrderSup");
const sendEmail = require("../config/mailConfig");

const router = express.Router();

// save posts
router.post("/reorder/save", async (req, res) => {
  try {
    const { email, orderId, ...rest } = req.body;
    let newReOrder = new ReOrder(rest);
    const subject = `New ReOrder Update`;
    const text = `Dear ${rest.name},

You are tasked with retrieving an order (${productName}) from our inventory and delivering it to the respective address. Please proceed to the inventory location to collect the specified order promptly and ensure its timely delivery to the designated address.
    
Thank you for your attention to this matter.`;

    await sendEmail(email, subject, text);
    await newReOrder.save();
    res.status(200).json({
      success: "ReOrder saved successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

// get posts
router.get("/reorders", async (req, res) => {
  try {
    const reorders = await ReOrder.find().exec();
    res.status(200).json({
      success: true,
      existingReOrders: reorders,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

//delete post

router.delete("/reorder/delete/:id", (req, res) => {
  ReOrder.findByIdAndDelete(req.params.id)
    .exec()
    .then((deletedReOrder) => {
      return res.json({
        message: "Delete Succesfully",
        deletedReOrder,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Delete unsuccesfully",
        err,
      });
    });
});

module.exports = router;
