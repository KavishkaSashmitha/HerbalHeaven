const express = require('express');
const ReOrder = require('../model/ReOrderSup');
const sendEmail = require('../config/mailConfig');

const router = express.Router();

// save posts
router.post('/reorder/save', async (req, res) => {
  try {
    let newReOrder = new ReOrder(req.body);
    const subject = `New ReOrder Update`;
    const text = `Dear ${req.body.name},

    I hope this message finds you well. We are in need of a prompt delivery of raw materials for our production process. Below are the details of the items required:

    Product Name: ${req.body.productName}
    Quantity: ${req.body.quantity}
    
    Your swift action in processing this order would be greatly appreciated as it is crucial for our operations. Kindly confirm receipt of this request and provide an estimated delivery date at your earliest convenience.
    
    Thank you for your attention to this matter.`;

    // Sending email
    await sendEmail(req.body.email, subject, text);

    // Saving reorder
    await newReOrder.save();

    res.status(200).json({
      success: 'ReOrder saved successfully',
    });
  } catch (err) {
    console.error('Error while saving reorder and sending email:', err);
    res.status(400).json({
      error: err.message,
    });
  }
});

// get posts
router.get('/reorders', async (req, res) => {
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

//get a specific post

router.get("/reorder/:id", (req, res) => {
  let reorderId = req.params.id;

  ReOrder.findById(reorderId)
    .then((reorder) => {
      return res.status(200).json({
        success: true,
        reorder,
      });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
});


//delete post

router.delete('/reorder/delete/:id', (req, res) => {
  ReOrder.findByIdAndDelete(req.params.id)
    .exec()
    .then((deletedReOrder) => {
      return res.json({
        message: 'Delete Succesfully',
        deletedReOrder,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: 'Delete unsuccesfully',
        err,
      });
    });
});

//cost
router.put("/materialCost/:id", (req, res) => {
  const { id } = req.params;
  const { month, productId, quantity, productName } = req.body;

  const matcostUpdate = { [`Reorder.${month}${productName.toLowerCase()}`]: quantity };
  ReOrder.findByIdAndUpdate(id, {
    $set: matcostUpdate,
  })
    .then(() => {
      return res.status(200).json({
        success: "Updated Syccesfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
});

module.exports = router;
