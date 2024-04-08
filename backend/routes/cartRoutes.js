const express = require('express');
const {
  AddToCart,
  viewCart,
  updateCart,
  deleteCartItems,
  updateCartQuantity,
  CartDetails,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const CartController = require("../controllers/cartController");
const route = express.Router();

//routes express
//@private
//Get Function
route.get('/', protect, viewCart);
route.get('/cart-details', CartDetails);

route.post('/', protect, AddToCart);

route.put('/:id', protect, updateCart);

route.delete('/:id', protect, deleteCartItems);




//admin routes
route.get("/admin/cart", CartController.getAllCartDetails);



route.put('/update-quantity', updateCartQuantity);


module.exports = route;
