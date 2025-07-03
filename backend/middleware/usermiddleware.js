const jwt = require('jsonwebtoken');
const { USER } = require('../models/userSchema');
require('dotenv').config


const ensureAuthentication = async(req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(404).json({message:"No token Found", status:404, success:false })
    }

    let decoded
    try {
        decoded = jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
        // console.log(error)
        return res.status(200).json({message:"login first", status:500, success:false})
    }

    

    const user = await USER.findOne({email:decoded.email})

    if (!user) {
        return res.status(404).json({message:"No user Found", status:404, success:false })
    }

    if (user.email===decoded.email) {
        req.user = user
        next()
    }
    
}

module.exports = ensureAuthentication