const express = require('express')

const {productController, addUpdateProduct, deleteUpdateProduct} = require('../controllers/productController.js')

const productRouter = express.Router()

productRouter.get('/products', productController)
productRouter.put('/addUpdateProduct', addUpdateProduct)
productRouter.put('/delUpdateProduct', deleteUpdateProduct)

module.exports=productRouter