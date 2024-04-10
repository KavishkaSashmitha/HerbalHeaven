const asyncHandler = require('express-async-handler');
const product = require('../model/productModel');

const productList = asyncHandler(async (req, res) => {
  const cart = await product.find();
  res.status(200).json(cart);
});

const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  // Assuming `Product` is your Mongoose model
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.status(200).json(product);
  }
});

module.exports = {
  productList,
  getProductById,
};
