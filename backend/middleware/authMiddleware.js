const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
//const User = require('../model/userModel');
const Customer = require('../model/customerModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Get token From header
      token = req.headers.authorization.split(' ')[1];

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from the token
     // req.user = await User.findById(decoded.id).select('-password');
        
            //Get customer from the token
            req.customer = await Customer.findById(decoded.id).select('-password');
            
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, no Token');
  }
});

module.exports = { protect };
