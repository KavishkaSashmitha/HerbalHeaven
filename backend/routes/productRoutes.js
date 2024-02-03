const express = require('express');
const { productList } = require('../controllers/productController');

const route = express.Router();

//routes express
//@private
//Get Function
route.get('/', productList);

module.exports = route;
