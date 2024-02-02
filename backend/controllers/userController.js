const asyncHandler = require('express-async-handler');
const axios = require('axios');
const User = require('../model/userModel');

//POST METHOD
const signup = asyncHandler(async (req, res) => {
  res.json({ message: 'Created' });
});

//Get
const dashboard = asyncHandler(async (req, res) => {
  res.send('Get World');
});

//Update
const updateUser = asyncHandler(async (req, res) => {
  res.send('Update World');
});

//Delete Cart
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.send('Delete World' + id);
});

module.exports = { signup, dashboard, updateUser, deleteUser };
