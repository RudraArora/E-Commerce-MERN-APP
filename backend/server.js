const express = require("express")
const dotenv = require("dotenv")
const { userRoutes } = require("./routes/userRoutes.js")
const { default: mongoose, mongo, Mongoose } = require("mongoose")
const multer = require('multer')
const productRouter = require("./routes/productRoutes.js")
const cors = require('cors')
const cartRoute = require("./routes/cartRoutes.js")

// const upload = multer({dest: 'uploads/'})

dotenv.config()

const app = express()

const PORT = process.env.PORT||3001
const MONGO_URL = process.env.MONGO_URL

try {
    mongoose.connect(MONGO_URL)
    console.log('DB is connected') 
} catch (err){
    console.log(err)
}

// app.post('/profile', upload.single('avatar'), (req, res) => {
//   res.send(req.file)
// })
app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(productRouter)
app.use(cartRoute)

app.listen(PORT, ()=>console.log(`Server is Running at ${PORT}`) )




