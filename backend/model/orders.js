const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    Ord_name:{
        type: String,
        required:true
    },
    
    c_name:{
        type:String,
        required:true
    },
    
    c_mobile:{
        type:String,
        required:true
    },

    c_mail:{
        type:String,
        required:true
    },

    Ord_Quantity:{
        type:String,
        required:true
    },

    Shipping_Address:{
        type:String,
        required:true
    }
    

});

module.exports= mongoose.model('orders',orderSchema);
