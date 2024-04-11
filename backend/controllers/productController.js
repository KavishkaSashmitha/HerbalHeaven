const asyncHandler = require('express-async-handler');
const product = require('../model/productModel');

const productList = asyncHandler(async (req, res) => {
  const cart = await product.find();
  res.status(200).json(cart);
});

const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  // Assuming `Product` is your Mongoose model
  const foundProduct = await product.findById(productId);

  if (!foundProduct) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.status(200).json(foundProduct);
  }
});

module.exports = {
  productList,
  getProductById,
};
