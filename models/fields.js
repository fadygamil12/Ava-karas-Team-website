const mongoose = require('mongoose');

const fieldschema = mongoose.Schema({
    name: {
        type:String,
        required: true
        },
    color:{
        type:String
    },
    icon:{
        type:String,
        required: true
    }
})

exports.Fields = mongoose.model('fields' , fieldschema)