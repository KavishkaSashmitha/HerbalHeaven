const express = require('express');
const {
  AddToCart,
  viewCart,
  updateCart,
  deleteCartItems,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const route = express.Router();

//routes express
//@private
//Get Function
route.get('/', protect, viewCart);

route.post('/', protect, AddToCart);

route.put('/:id', protect, updateCart);

route.delete('/:id', protect, deleteCartItems);

module.exports = route;
