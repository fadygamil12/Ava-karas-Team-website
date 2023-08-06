const mongoose = require('mongoose');

const servesschema = mongoose.Schema({
    name: {
        type:String,
        required: true
        },
    place: {
        type:String,
        required: true
        },
    field: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'fields'
        },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    Date:{
        type:Date,
        default: Date.now
    }
})

exports.Serves = mongoose.model('Serves' , servesschema)