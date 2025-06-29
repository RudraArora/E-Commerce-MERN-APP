const { default: mongoose } = require("mongoose");

const user = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    contact:{
        type:Number,
        required:true,
        index:true
    },
    password:{
        type:String,
        required:true,
    }
})

const USER = mongoose.model('USER',user)

module.exports.USER = USER