const express = require('express')

const productController = require('../controllers/productController.js')
const ensureAuthentication = require('../middleware/usermiddleware.js')

const productRouter = express.Router()

productRouter.get('/products',ensureAuthentication, productController)

module.exports=productRouter