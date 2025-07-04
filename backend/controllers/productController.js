const PRODUCT = require('../models/productSchema')

const productController = async(req,res) => {
    const products = await PRODUCT.find()

    // console.log(products)
    if (!products) {
        return res.status(404).json({message:'Products not found', status:404, success:false})
    }

    return res.status(200).json({message:'Products found', status:200, success:true, products})

}

module.exports = productController