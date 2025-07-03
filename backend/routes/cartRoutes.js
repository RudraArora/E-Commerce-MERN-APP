const express = require('express')

const {cartController, getCartProduct, addUpdateCartProduct, deleteUpdateCartProduct, deleteProduct,  } = require('../controllers/cartController.js')
const ensureAuthentication = require('../middleware/usermiddleware.js')

const cartRoute = express.Router()

cartRoute.post('/addTocart',ensureAuthentication, cartController)

cartRoute.get('/getProduct',ensureAuthentication, getCartProduct)

cartRoute.put('/addUpadteCartProduct', ensureAuthentication, addUpdateCartProduct)

cartRoute.put('/delUpdateCartproduct', ensureAuthentication, deleteUpdateCartProduct)

cartRoute.delete('/delCartProduct', ensureAuthentication, deleteProduct)

module.exports=cartRoute