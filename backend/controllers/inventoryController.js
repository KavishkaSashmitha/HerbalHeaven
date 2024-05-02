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
        image,
      } = req.body;

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
        category,
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
        category,
        image,
      });
      //   { new: true }
      // ); // Set { new: true } to return the updated document

      // // Check if the quantity is lower than the reorder level
      // if (updatedItem.quantity < updatedItem.reorderLevel) {
      //   // Create a new entry in the reorder model
      //   // Assuming you have a Reorder model defined with appropriate schema
      //   const Reorder = require('../model/reorderModel');

      //   const newReorder = new Reorder({
      //     productNo: updatedItem.productNo,
      //     productName: updatedItem.productName,
      //     quantity: updatedItem.quantity,
      //     reorderLevel: updatedItem.reorderLevel,
      //   });

      //   // Save the new reorder entry
      //   await newReorder.save();
      // }

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
