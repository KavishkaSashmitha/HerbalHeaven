const asyncHandler = require('express-async-handler');
const Cart = require('../model/cartModel');
const User = require('../model/userModel');

const viewCart = asyncHandler(async (req, res) => {
  const cart = await Cart.find({ user: req.user.id });
  res.status(200).json(cart);
});

const AddToCart = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    //error handling case
    res.status(400); //.json({ message: 'Please Add Item' });
    //express use
    throw new Error('Please add Item');
  }
  const cart = await Cart.create({
    user: req.user.id,
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
  });

  res.status(200).json(cart);
});

const updateCart = asyncHandler(async (req, res) => {
  const updateCart = await Cart.findById(req.params.id);
  if (!req.body.quantity) {
    //error handling case
    res.status(400); //.json({ message: 'Please Add Item' });
    //express use
    throw new Error('Please add Item');
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //Make sure the logged if  in thuser match the cart user
  if (updateCart.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not Authorized');
  }

  const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedCart);
});

const deleteCartItems = asyncHandler(async (req, res) => {
  const deleteCart = await Cart.findById(req.params.id);
  if (!deleteCart) {
    //error handling case
    res.status(400); //.json({ message: 'Please Add Item' });
    //express use
    throw new Error('No Item Found');
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //Make sure the logged if  in thuser match the cart user
  if (deleteCart.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not Authorized');
  }
  await deleteCart.deleteOne();
  res.status(200).json({ message: `deleted cart item :${req.params.id}` });
});

const updateCartQuantity = asyncHandler(async (req, res) => {
  const { items } = req.body;

  try {
    // Loop through each item in the request body and update the quantity in the database
    await Promise.all(
      items.map(async (item) => {
        const { id, quantity } = item;
        await Cart.findByIdAndUpdate(id, { quantity });
      })
    );

    res.status(200).json({ message: 'Cart quantities updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = {
  viewCart,
  AddToCart,
  updateCart,
  deleteCartItems,
  updateCartQuantity,
};
