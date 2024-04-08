const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const fileUpload = require('../middleware/uploadMiddleware');
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

router.post(
  '/addInventoryItem',
  fileUpload.single('image'),
  inventoryController.addInventoryItem
);

router.get('/viewInventoryItems', inventoryController.viewInventoryItems);

router.get('/getInventoryItem/:id', inventoryController.getInventoryItem);

router.put('/updateInventoryItem/:id', inventoryController.updateInventoryItem);

router.delete(
  '/deleteInventoryItem/:id',
  inventoryController.deleteInventoryItem
);

module.exports = router;
