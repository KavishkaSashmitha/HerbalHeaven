const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const fileUpload = require('../middleware/uploadMiddleware');
const hhmail = require('../middleware/nodeMailer');
const fs = require('fs');
const path = require('path');

// Add directory creation logic
const directoryPath = 'D:\\itp-herbal\\HerbalHeaven\\backend\\img\\inventory';
if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true });
  console.log(`Directory created at ${directoryPath}`);
} else {
  console.log(`Directory ${directoryPath} already exists`);
}

router.post('/addInventoryItem', inventoryController.addInventoryItem);

router.get('/viewInventoryItems', inventoryController.viewInventoryItems);

router.get('/getInventoryItem/:id', inventoryController.getInventoryItem);

router.put('/updateInventoryItem/:id', inventoryController.updateInventoryItem);

router.delete(
  '/deleteInventoryItem/:id',
  inventoryController.deleteInventoryItem
);

router.post('/uploadimg', fileUpload);

// router.post('/sendEmail', hhmail);

module.exports = router;
