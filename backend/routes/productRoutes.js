const express = require('express')

const {productController, addUpdateProduct, deleteUpdateProduct} = require('../controllers/productController.js')
const ensureAuthentication = require('../middleware/usermiddleware.js')

const productRouter = express.Router()

productRouter.get('/products',ensureAuthentication, productController)
productRouter.put('/addUpdateProduct', addUpdateProduct)
productRouter.put('/delUpdateProduct', deleteUpdateProduct)

module.exports=productRouter