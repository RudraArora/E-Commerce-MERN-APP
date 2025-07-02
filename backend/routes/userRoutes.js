const {signup, login, getUsers, getUser, updateUserData, deleteUser, tokenData} = require( "../controllers/userController.js")

const express = require("express")

const userRoutes = express.Router()

userRoutes.post('/signup',signup)

userRoutes.post('/login',login)

userRoutes.get('/users',getUsers)

userRoutes.get('/user',getUser)

userRoutes.put('/update-user',updateUserData)

userRoutes.delete('/remove',deleteUser)

userRoutes.post('/gettoken',tokenData)

module.exports.userRoutes=userRoutes