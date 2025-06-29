const PRODUCT = require('../models/productSchema')

const productController = async(req,res) => {
    const products = await PRODUCT.find()

    // console.log(products)
    if (!products) {
        return res.status(404).json({message:'Products not found', status:404, success:false})
    }

    return res.status(200).json({message:'Products found', status:200, success:true, products})

}

const addUpdateProduct = async(req,res) => {

    const{id} = req.body

    const updated = await PRODUCT.findOneAndUpdate(
      { id },
      { $inc: { quantity: 1 } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'No product found with that id'
      });
    }

    // await updated.save()

    return res.status(200).json({message:"Update Successful", status:200, success:true, updated})

}

const deleteUpdateProduct = async(req,res) => {

    const{id} = req.body

    const updated = await PRODUCT.findOneAndUpdate(
      { id },
      { $inc: { quantity: -1 } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'No product found with that id'
      });
    }

    // await updated.save()

    return res.status(200).json({message:"Update Successful", status:200, success:true, updated})

}

module.exports = {productController, addUpdateProduct, deleteUpdateProduct}