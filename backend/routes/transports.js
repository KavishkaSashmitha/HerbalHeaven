const express = require('express');
const Transport = require('../model/transports');
const transports = require('../model/transports');

const router = express.Router();

// save posts
router.post('/transport/save', async (req, res) => {
  try {
    let newTransport = new Transport(req.body);
    await newTransport.save();
    res.status(200).json({
      success: 'Driver saved successfully',
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

// get posts
router.get('/transports', async (req, res) => {
  try {
    const transports = await Transport.find().exec();
    res.status(200).json({
      success: true,
      existingTransports: transports,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

// get a specific post
router.get('/transport/:id', async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id).exec();
    res.status(200).json({
      success: true,
      transport,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
});

// update post
router.put('/transport/update/:id', async (req, res) => {
  try {
    await Transport.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
    res.status(200).json({
      success: 'Update Successfully',
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

//delete post

router.delete('/transport/delete/:id', (req, res) => {
  Transport.findByIdAndDelete(req.params.id)
    .exec()
    .then((deletedTransport) => {
      return res.json({
        message: 'Delete Succesfully',
        deletedTransport,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: 'Delete unsuccesfully',
        err,
      });
    });
});

//kumesha admin part
router.get("/transget", async (req, res) => {
  let transport;
  try {
    transport = await Transport.find();
  } catch (err) {
    console.log(err);
  }
  if (!transport) {
    return res.status(404).json({ message: "transport not found" });
  }
  return res.status(200).json({ transport });
})
//update cost

router.put('/transport/cost/:id', (req, res) => {
  const { id } = req.params;
  const { month, amount } = req.body;

  const costUpdate = { [`cost.${month.toLowerCase()}`]: amount };
  transports
    .findByIdAndUpdate(id, {
      $set: costUpdate,
    })
    .then(() => {
      return res.status(200).json({
        success: 'Updated Syccesfully',
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
});

module.exports = router;
