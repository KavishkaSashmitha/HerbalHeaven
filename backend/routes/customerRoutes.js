const express = require('express');
const {
  signup,
  dashboard,
  loginUser,
  updateProfile,
  deleteProfile
} = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');
const route = express.Router();

//routes express
//@private
//Get Function


route.post('/', loginUser);
route.post('/register', signup);
route.get('/profile', protect, dashboard);
route.put('/profile', protect, updateProfile);
//route.delete('/', protect,   deleteProfile); 

route.delete('/delete', protect, deleteProfile); 

module.exports = route;
