const express = require('express');
const {
  productList,
  getProductById,
  createProduct,
} = require('../controllers/productController');

const route = express.Router();

//routes express
//@private
//Get Function
route.get('/', productList);
route.get('/:id', getProductById);
route.post('/save', createProduct);

module.exports = route;
