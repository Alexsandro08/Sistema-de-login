const mongoose = require('mongoose')
const Schema = mongoose.Schema



const User = new Schema({

    name:{
        type:String,
        required:true
    },
    telephone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    admin:{
        type:Number,
        default:0
    },
    password:{
        type:String,
        required:true
    }

})

mongoose.model('users', User)