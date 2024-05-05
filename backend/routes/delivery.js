const express = require("express");
const Delivery = require("../model/delivery");
const sendEmail = require("../config/mailConfig");

const router = express.Router();

// save posts
router.post("/delivery/save", async (req, res) => {
  try {
    const { email, orderId, ...rest } = req.body;
    let newDelivery = new Delivery(rest);
    const subject = `New Delivery Update`;
    const text = `Dear ${rest.d_name},

You are tasked with retrieving an order ${orderId} from our inventory and delivering it to the respective address. Please proceed to the inventory location to collect the specified order promptly and ensure its timely delivery to the designated address.
    
Thank you for your attention to this matter.`;

    await sendEmail(email, subject, text);
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

//delete post

router.delete("/delivery/delete/:id", (req, res) => {
  Delivery.findByIdAndDelete(req.params.id)
    .exec()
    .then((deletedDelivery) => {
      return res.json({
        message: "Delete Succesfully",
        deletedDelivery,
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
