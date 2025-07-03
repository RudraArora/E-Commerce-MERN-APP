const CART = require("../models/cartSchema.js")
require('dotenv').config

const cartController = async(req,res) => {

    const{id,name,price,image,quantity} = req.body

    // if (!id || !name || !price || !image || !quantity) {
    //     return res.status(401).json({message:'fill all the fields', status:401, success:false})
    // }

    const product = new CART ({
        id,
        name,
        price,
        image,
        quantity,
        userId:req.user._id
    })

    await product.save()

    return res.status(200).json({message:'Product Registered Successfully!!', status:200, success:true, product})

}

const getCartProduct = async(req,res) => {

    const products = await CART.find({userId:req.user._id})

    if (!products) {
        return res.status(404).json({message:"No Product Found", status:404, success:false})
    }
    return res.status(200).json({message:"Products found", status:200, success:true, products})

}

const addUpdateCartProduct = async(req,res) => {

    const{id} = req.body

    const updatedCart = await CART.findOneAndUpdate(
      { id, userId:req.user._id },
      { $inc: { quantity: 1 } },
      { new: true, runValidators: true }
    );

    if (!updatedCart) {
      return res.status(404).json({
        success: false,
        message: 'No product found with that id'
      });
    }


    return res.status(200).json({message:"Update Successful", status:200, success:true, updatedCart})

}

const deleteUpdateCartProduct = async(req,res) => {

    const{id} = req.body

    const updatedCart = await CART.findOneAndUpdate(
      { id, userId:req.user._id },
      { $inc: { quantity: -1 } },
      { new: true, runValidators: true }
    );

    if (!updatedCart) {
      return res.status(404).json({
        success: false,
        message: 'No product found with that id'
      });
    }


    return res.status(200).json({message:"Update Successful", status:200, success:true, updatedCart})

}

const deleteProduct = async(req,res) => {

    let {id} = req.body

    await CART.findOneAndDelete({id, userId:req.user._id})

    return res.status(200).json({message:'Product Deleted Successfully!!', status:200, success:true})

}

module.exports={cartController, getCartProduct, addUpdateCartProduct, deleteUpdateCartProduct, deleteProduct}