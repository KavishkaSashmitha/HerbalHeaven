const asyncHandler = require('express-async-handler');
const product = require('../model/productModel');

const productList = asyncHandler(async (req, res) => {
  const cart = await product.find();
  res.status(200).json(cart);
});

module.exports = {
  productList,
};
