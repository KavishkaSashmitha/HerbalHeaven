const express = require('express');
const {
  AddToCart,
  viewCart,
  updateCart,
  deleteCartItems,
} = require('../controllers/cartController');

const route = express.Router();

//routes express
//@private
//Get Function
route.get('/', viewCart);

route.post('/', AddToCart);

route.put('/:id', updateCart);

route.delete('/:id', deleteCartItems);

module.exports = route;
