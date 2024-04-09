const { config } = require('dotenv');
const Inventory = require('../model/inventoryModel');
const multer = require('multer');
const express = require('express');
const router = express.Router(); // Define router here
const path = require('path');
const fs = require('fs');

const inventoryController = {
  addInventoryItem: async (req, res) => {
    try {
      const {
        productNo,
        productName,
        shortDescription,
        category,
        cost,
        quantity,
        reorderLevel,
        manufactureDate,
        expiaryDate,
      } = req.body;
      const image = req.file ? req.file.path : null;

      if (
        !productNo ||
        !productName ||
        !shortDescription ||
        !category ||
        !cost ||
        !quantity ||
        !reorderLevel ||
        !manufactureDate ||
        !expiaryDate ||
        !image
      )
        return res.status(400).json({ msg: 'Please fill all fields.' });
      /*
      const Quantity = Number(quantity);
      const UnitPrice = Number(cost);

      if (typeof Quantity !== 'number' || isNaN(Quantity) || Quantity <= 0) {
        return res
          .status(400)
          .json({ error: 'Quantity must be a positive number' });
      }

      if (typeof UnitPrice !== 'number' || isNaN(UnitPrice) || UnitPrice <= 0) {
        return res
          .status(400)
          .json({ error: 'Unit price must be a positive number' });
      }
*/
      const newItem = new Inventory({
        productNo: productNo,
        productName: productName,
        shortDescription: shortDescription,
        category: category,
        cost: cost,
        quantity: quantity,
        reorderLevel: reorderLevel,
        manufactureDate: manufactureDate,
        expiaryDate: expiaryDate,
        image: image,
      });
      //console.log(newItem);
      await newItem.save();

      return res
        .status(200)
        .json({ msg: 'Inventory item successfully added.' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  viewInventoryItems: async (req, res) => {
    try {
      const inventoryItems = await Inventory.find();
      return res.status(200).json(inventoryItems);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getInventoryItem: async (req, res) => {
    try {
      const item = await Inventory.findById(req.params.id);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateInventoryItem: async (req, res) => {
    try {
      const {
        productNo,
        productName,
        shortDescription,
        cost,
        quantity,
        reorderLevel,
        manufactureDate,
        expiaryDate,
        image,
      } = req.body;

      await Inventory.findByIdAndUpdate(req.params.id, {
        productNo,
        productName,
        shortDescription,
        cost,
        quantity,
        reorderLevel,
        manufactureDate,
        expiaryDate,
        image,
      });

      return res
        .status(200)
        .json({ msg: 'Inventory item successfully updated.' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  deleteInventoryItem: async (req, res) => {
    try {
      const item = await Inventory.findByIdAndDelete(req.params.id);
      if (!item)
        return res.status(400).json({ msg: 'No inventory item found!' });

      return res
        .status(200)
        .json({ msg: 'Inventory item successfully deleted.' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = inventoryController;
