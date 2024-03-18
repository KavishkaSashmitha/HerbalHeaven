const express = require('express');
const {
  AddToCart,
  viewCart,
  updateCart,
  deleteCartItems,
  updateCartQuantity,
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

route.put('/update-quantity', updateCartQuantity);

module.exports = route;
