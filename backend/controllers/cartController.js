


//POST METHOD
const AddToCart = (req, res) => {
  res.send('Add World');
};

//Get
const viewCart = (req, res) => {
  res.send('Get World');
};

//Update
const updateCart = (req, res) => {
  const id = req.params.id;
  res.send('Update World');
};

//Delete Cart
const deleteCartItems = (req, res) => {
  const id = req.params.id;
  res.send('Delete World' + id);
};

module.exports = { AddToCart, viewCart, updateCart, deleteCartItems };
