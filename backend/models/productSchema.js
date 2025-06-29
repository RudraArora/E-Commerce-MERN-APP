const { default: mongoose } = require("mongoose")

const data = mongoose.Schema({},{strict:false, collection:'clothes'})

const PRODUCT = mongoose.model('PRODUCT', data)
module.exports = PRODUCT