const express = require('express');
const {
  signup,
  dashboard,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controllers/userController');

const route = express.Router();

//routes express
//@private
//Get Function
route.get('/profile', dashboard);
route.post('/', loginUser);
route.post('/create', signup);

route.put('/:id', updateUser);

route.delete('/:id', deleteUser);

module.exports = route;
