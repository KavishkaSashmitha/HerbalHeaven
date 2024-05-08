const express = require("express");
const router = express.Router();
const Card = require("../model/paymentModel");
const CardController = require("../controllers/PaymentController");
const { protect } = require("../middleware/authMiddleware");

router.get("/cards", CardController.getAllCard);
router.post("/cards", protect, CardController.addCard);
router.get("/cards/get/usercards", protect, CardController.getUserCards);
router.get("/cards/:id", CardController.getById);
router.put("/cards/:id", CardController.updateCard);
router.delete("/cards/:id", CardController.deleteCard);

module.exports = router;
