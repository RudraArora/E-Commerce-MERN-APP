const { USER } = require("../models/userSchema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config


let token;

const signup = async(req,res)=>{
    const {username,email,contact,password} = req.body

    if(!username||!email||!contact||!password){
        return res.status(401).json({message:'fill all the fields', status:401, success:false})
    }

    const existingUser = await USER.findOne({
    $or: [{ email }, { contact }],
    });
    // console.log(existingUser)

    if (existingUser) {
    return res
        .status(200)
        .json({ message: "User already exists", status:409, success: false });
    }


    const saltValue=10
    const encryptedPassword = await bcrypt.hash(password,saltValue)

    // res.send(encryptedPassword)

    const user = new USER ({
        username,
        email,
        contact,
        password: encryptedPassword
    })


    await user.save()

    // token = await jwt.sign({username,email,contact}, process.env.SECRET_KEY, {expiresIn : '1hr'})

    // res.send(token)

    // return res.status(200).json({message:'User Registered Successfully!!', status:200, success:true, user, token})
    return res.status(200).json({message:'User Registered Successfully!!', status:200, success:true, user})

}

const getUsers = async(req,res)=>{
    const users = await USER.find()
    if (!users) {
        return res.status(404).json({message:"No user registered yet", status:404, success:false})
    }
    return res.status(200).json({message:"Users found", status:200, success:true, users})

}

const getUser = async(req,res)=>{
    const {email} = req.query
    const user = await USER.findOne({email})
    if (!user) {
        return res.status(404).json({message:"No user registered yet", status:404, success:false})
    }
    return res.status(200).json({message:"User found", status:200, success:true, user})
}

const login = async(req,res)=>{
    const {email,password} = req.body
    try {
        if (!email||!password) {
            return res.status(200).json({message:'fill all the fields', status:401, success:false})
        }

        const user = await USER.findOne({email})
        if (!user) {
            return res.status(200).json({message:"No user registered yet", status:404, success:false})
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            return res.status(200).json({message:"Incorrect Password", status:409, success:false})
            
        }

        const token = await jwt.sign({email:user.email, username:user.username, contact:user.contact},process.env.SECRET_KEY, {expiresIn: '1h'})



      
        return res.status(200).json({message:"Login Successful", status:200, success:true, user, token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error', status: 500, success: false });
    }
    
    

}

const updateUserData = async(req,res)=>{

    const {token, password} = req.body

    // const user = await USER.findOneAndUpdate({email}, {$set: {password:password}}, {new:true})
    if (!token || !password) {
        return res.status(404).json({message:"token or password not found", status:404, success:false})
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    const user = await USER.findOne({email:decoded.email})

    const securedpwd = await bcrypt.hash(password,10)

    if (!user) {
        return res.status(404).json({message:"No user found", status:404, success:false})
    }

    user.password=securedpwd

    await user.save()

    return res.status(200).json({message:"password Update Successful", status:200, success:true, user})

}

const deleteUser = async(req,res)=>{

    const {email} = req.query

    await USER.findOneAndDelete({email})

    return res.status(200).json({message:'User Deleted Successfully!!', status:200, success:true})

}

const tokenData = async(req,res) => {

    const {token} = req.body

    if (!token) {
        return res.status(404).json({message:"token not found", success:false, status:404})
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    return res.status(200).json({message:'Here is your decoded data', status:200, success:true, decoded})

}

module.exports = {signup, getUsers, getUser, updateUserData, login, deleteUser, tokenData}