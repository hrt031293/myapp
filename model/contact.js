const mongodb = require('mongodb');
const mongoose = require('mongoose');
// const validator = require('validator');
var contactList = new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        required: true,
        minlength: 1,
    
    },
    
    name:{
        type: String,
        required: true,
        minlength: 1
        },
    
    number:{
        type: Number,
        minlength: 10
    },
    admin:{
        type:String
    }
    
});

var contact = mongoose.model('contact',contactList);

module.exports=contact;