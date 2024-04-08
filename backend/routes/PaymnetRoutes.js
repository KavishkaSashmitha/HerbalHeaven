const express = require("express");
const router = express.Router();
const Card = require("../model/paymentModel");
const CardController = require("../controllers/PaymentController");

router.get("/cards",CardController.getAllCard);
router.post("/cards",CardController.addCard);
router.get("/cards/:id",CardController.getById);
router.put("/cards/:id",CardController.updateCard);
router.delete("/cards/:id",CardController.deleteCard);

module.exports = router; 
