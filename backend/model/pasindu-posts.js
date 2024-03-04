const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Posts', postSchema);