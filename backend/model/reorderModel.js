const mongoose = require('mongoose');

//schema
const reorderData = mongoose.Schema(
  {products:[{
    productID: {
      type: String,
      required: true,
    },
    productNo: {
      type: Number,
      required: true,
    },
    
    productName: {
      type: String,
      required: true,
      maxlength: 100,
    },

    category: {
      type: String,
      require: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    reorderLevel: {
      type: Number,
      required: true,
      min: 0,
    },
    
  }]} ,
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Reorder', reorderData);
