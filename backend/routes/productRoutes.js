const express = require('express');
const {
  productList,
  getProductById,
} = require('../controllers/productController');

const route = express.Router();

//routes express
//@private
//Get Function
route.get('/', productList);
route.get('/', getProductById);

module.exports = route;
