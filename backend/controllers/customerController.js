const AsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const Customer = require('../model/customerModel');
const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc Register new Customer
// @route POST /api/customer/create
// @access public
const signup = AsyncHandler(async (req, res) => {
  const { name, email, password, mobileNumber, gender, age, address } = req.body;

  if (!name || !email || !password || !mobileNumber || !gender || !age || !address) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  // Check if customer exists
  const customerExists = await Customer.findOne({ email });

  if (customerExists) {
    res.status(400);
    throw new Error('Customer already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create customer
  const customer = await Customer.create({
    name,
    email,
    password: hashedPassword,
    mobileNumber,
    gender,
    age,
    address,
  });

  if (customer) {
    res.status(201).json({
      _id: customer.id,
      name: customer.name,
      email: customer.email,
      mobileNumber: customer.mobileNumber,
      gender: customer.gender,
      age: customer.age,
      address: customer.address,
      token: generateToken(customer._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid customer data');
  }
});

// @desc Login User
// @route POST/api/users/login
// @access public
const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const customer = await Customer.findOne({ email });

  if (customer && (await bcrypt.compare(password, customer.password))) {
    res.json({
      _id: customer.id,
      name: customer.name,
      email: customer.email,
      mobileNumber: customer.mobileNumber,
      gender: customer.gender,
      age: customer.age,
      address: customer.address,
      token: generateToken(customer._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc Get customer profile
// @route GET /api/customer/profile
// @access Private
const dashboard = AsyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.customer.id);

  if (customer) {
    res.status(200).json({
      _id: customer.id,
      name: customer.name,
      email: customer.email,
      mobileNumber: customer.mobileNumber,
      gender: customer.gender,
      age: customer.age,
      address: customer.address,
    });
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});

// @desc Update customer profile including password
// @route PUT /api/customer/profile
// @access Private
const updateProfile = AsyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.customer.id);

  if (customer) {
    customer.name = req.body.name || customer.name;
    customer.email = req.body.email || customer.email;
    customer.mobileNumber = req.body.mobileNumber || customer.mobileNumber;
    customer.gender = req.body.gender || customer.gender;
    customer.age = req.body.age || customer.age;
    customer.address = req.body.address || customer.address;

    // Check if a new password is provided
    if (req.body.newPassword) {
      const isPasswordValid = await bcrypt.compare(req.body.currentPassword, customer.password);
      if (!isPasswordValid) {
        res.status(401);
        throw new Error('Incorrect current password');
      }
      const salt = await bcrypt.genSalt(10);
      customer.password = await bcrypt.hash(req.body.newPassword, salt);
    }

    const updatedCustomer = await customer.save();

    res.json({
      _id: updatedCustomer.id,
      name: updatedCustomer.name,
      email: updatedCustomer.email,
      mobileNumber: updatedCustomer.mobileNumber,
      gender: updatedCustomer.gender,
      age: updatedCustomer.age,
      address: updatedCustomer.address,
      token: generateToken(updatedCustomer._id),
    });
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});

// @desc Delete customer profile
// @route DELETE /api/customer/profile
// @access Private
const deleteProfile = AsyncHandler(async (req, res) => {
  console.log('Delete profile controller called');
  const customerId = req.body.customerId; // Retrieve customerId from request body

  // Find the customer by ID and remove it from the database
  const customer = await Customer.findByIdAndDelete(customerId);

  if (customer) {
    console.log('Customer profile deleted successfully');
    res.json({ message: 'Customer profile deleted successfully' });
  } else {
    console.log('Customer not found');
    res.status(404).json({ error: 'Customer not found' });
  }
});

module.exports = {
  signup,
  loginUser,
  dashboard,
  updateProfile,
  deleteProfile,
};
