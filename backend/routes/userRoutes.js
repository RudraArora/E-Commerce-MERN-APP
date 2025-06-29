const {signup, login, getUsers, getUser, updateUserData, deleteUser} = require( "../controllers/userController.js")

const express = require("express")

const userRoutes = express.Router()

userRoutes.post('/signup',signup)

userRoutes.post('/login',login)

userRoutes.get('/users',getUsers)

userRoutes.get('/user',getUser)

userRoutes.put('/update-user',updateUserData)

userRoutes.delete('/remove',deleteUser)

module.exports.userRoutes=userRoutes