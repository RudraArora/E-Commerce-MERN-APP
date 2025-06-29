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

    token = await jwt.sign({username,email,contact}, process.env.SECRET_KEY, {expiresIn : '1hr'})

    // res.send(token)

    return res.status(200).json({message:'User Registered Successfully!!', status:200, success:true, user, token})

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
        let accessToken=null
        if (req.headers.authorization?.startsWith("Bearer ")) {
            accessToken = req.headers.authorization.split(" ")[1]
        }
        let refreshToken=null;
        let isVerified = false;
        if (accessToken) {
            try {
                const decoded = jwt.verify(accessToken, process.env.SECRET_KEY)
                if (decoded.email===email) {
                    isVerified=true;
                }else{
                    refreshToken=jwt.sign({email:user.email, username:user.username, conatact:user.contact}, process.env.SECRET_KEY, {expiresIn:'1h'})
                }
            } catch (error) {
                console.log(error)
            }
        }
        return res.status(200).json({message:"Login Successful", status:200, success:true, user, isVerified, refreshToken})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error', status: 500, success: false });
    }
    
    

}

const updateUserData = async(req,res)=>{

    const {email} = req.query

    const {password} = req.body

    // const user = await USER.findOneAndUpdate({email}, {$set: {password:password}}, {new:true})

    const user = await USER.findOne({email})

    if (!user) {
        return res.status(404).json({message:"No user found", status:404, success:false})
    }

    user.password=password

    await user.save()

    return res.status(200).json({message:"Update Successful", status:200, success:true, user})

}

const deleteUser = async(req,res)=>{

    const {email} = req.query

    await USER.findOneAndDelete({email})

    return res.status(200).json({message:'User Deleted Successfully!!', status:200, success:true})

}

module.exports = {signup, getUsers, getUser, updateUserData, login, deleteUser}