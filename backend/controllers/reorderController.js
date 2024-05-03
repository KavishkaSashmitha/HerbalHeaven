const {config} =require("dotenv");
const reorderData = require("../model/reorderModel");  
const express = require('express');
const router = express.Router(); // Define router here
const path = require('path');



const reorderController = {
    addReorderItem: async (req, res) => {
      try {
        const {
      
          products

        } = req.body;
  
        if (
            !products
 
        )
          return res.status(400).json({ msg: 'Please fill all fields.' });
  
        const newItem = new reorderData({
       products
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
  
    viewReorderItems: async (req, res) => {
      try {
        const inventoryItems = await reorderData.find();
        return res.status(200).json(inventoryItems);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    },
  
  
    deleteReorderItem: async (req, res) => {
      try {
        const item = await reorderData.findByIdAndDelete(req.params.id);
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
  
  module.exports = reorderController;
  