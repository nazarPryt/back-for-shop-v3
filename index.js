require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use('/api', router)
app.use(errorMiddleware)

const startApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, ()=>{
      console.log('work' + PORT);})
  }catch (e) {
    console.log(e);
  }
}
startApp()
