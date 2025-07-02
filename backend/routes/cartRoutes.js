const express = require('express')

const {cartController, getCartProduct, addUpdateCartProduct, deleteUpdateCartProduct, deleteProduct,  } = require('../controllers/cartController.js')
const ensureAuthentication = require('../middleware/usermiddleware.js')

const cartRoute = express.Router()

cartRoute.post('/addTocart', cartController)

cartRoute.get('/getProduct',ensureAuthentication, getCartProduct)

cartRoute.put('/addUpadteCartProduct', addUpdateCartProduct)

cartRoute.put('/delUpdateCartproduct', deleteUpdateCartProduct)

cartRoute.delete('/delCartProduct', deleteProduct)

module.exports=cartRoute