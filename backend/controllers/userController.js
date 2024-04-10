 const AsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');

// @desc Register new User
// @route POST/api/users/signup
// @access public
const signup = AsyncHandler(async (req, res) => {
  const { name, email, password, mobileNumber, address } = req.body;

  if (!name || !email || !password || !mobileNumber || !address) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    mobileNumber,
    address,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      address: user.address,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Login User
// @route POST/api/users/login
// @access public
const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      address: user.address,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc Get user profile
// @route GET/api/users/dashboard
// @access Private
const dashboard = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      address: user.address,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Update user profile including password
// @route PUT/api/users/profile
// @access Private
const updateProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobileNumber = req.body.mobileNumber || user.mobileNumber;
    user.address = req.body.address || user.address;

    // Check if a new password is provided
    if (req.body.newPassword) {
      const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!isPasswordValid) {
        res.status(401);
        throw new Error('Incorrect current password');
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.newPassword, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobileNumber: updatedUser.mobileNumber,
      address: updatedUser.address,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// @desc Delete user profile
// @route DELETE/api/users/profile
// @access Private
const deleteProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User profile deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  signup,
  loginUser,
  dashboard,
  updateProfile,
  deleteProfile,
};


