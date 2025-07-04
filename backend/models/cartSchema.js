const { default: mongoose } = require("mongoose");

const cart = mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'USER',
        required:true
    }
})

cart.index({ id: 1, userId: 1 }, { unique: true })

const CART = mongoose.model('CART', cart)
module.exports = CART