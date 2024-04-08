const express = require('express');
const {
  AddToCart,
  viewCart,
  updateCart,
  deleteCartItems,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const CartController = require("../controllers/cartController");
const route = express.Router();

//routes express
//@private
//Get Function
route.get('/', protect, viewCart);

route.post('/', protect, AddToCart);

route.put('/:id', protect, updateCart);

route.delete('/:id', protect, deleteCartItems);

<<<<<<< Updated upstream
=======
route.put('/update-quantity', updateCartQuantity);

//admin routes
route.get("/admin/cart", CartController.getAllCartDetails);


>>>>>>> Stashed changes
module.exports = route;
