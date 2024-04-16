const express = require("express");
const router = express.Router();
const CashController = require("../controllers/CashController");

router.post("/", CashController.addCash);
module.exports = router;
