const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    name: {
        type:String,
        required: true
        },
    email: {
        type:String,
        required: true
        },
    passwordhash: {
        type:String,
        required: true
        },
    phonenum:{
        type:String
    },
    age:{
        type:String,
        required: true
    },
    photo:{
        type:String
    },
    address:{
        type:String
    },
    field: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'fields'
    },
    rate:{
        type:Number,
        default:0
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

exports.User = mongoose.model('User' , userschema)