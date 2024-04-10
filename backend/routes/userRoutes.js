

const express = require('express');
const {
  signup,
  dashboard,
  loginUser,
  updateProfile,
  deleteProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const route = express.Router();

//routes express
//@private
//Get Function

route.post('/', loginUser);
route.post('/create', signup);
route.get('/profile', protect, dashboard);
route.put('/profile', protect, updateProfile);
route.delete('/', protect,   deleteProfile
); 
module.exports = route;

