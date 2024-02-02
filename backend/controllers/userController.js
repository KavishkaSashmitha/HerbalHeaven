const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../model/userModel');

//POST METHOD
const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please Add all Fields');
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400);
    throw new Error('User Exist');
  }
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.send(user);
});

//Get
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
});

// // const dashboard = asyncHandler(async (req, res) => {
// //   const { _id, name, email } = await User.findById(req.user.id);

// //   res.status(200).json({
// //     id: _id,
// //     name,
// //     email,
// //   });
// });

//Update
const updateUser = asyncHandler(async (req, res) => {
  res.send('Update World');
});

//Delete Cart
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.send('Delete World' + id);
});

module.exports = { signup, loginUser, dashboard, updateUser, deleteUser };
