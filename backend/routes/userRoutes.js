const express = require('express');
const {
  signup,
  dashboard,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const route = express.Router();

//routes express
//@private
//Get Function
route.get('/', signup);

route.post('/', dashboard);

route.put('/:id', updateUser);

route.delete('/:id', deleteUser);

module.exports = route;
