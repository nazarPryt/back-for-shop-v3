import express, { Application } from 'express'
import dotenv from 'dotenv'
import { routes } from './routes/routes'
import { errorMiddleware } from './middlewares/error-middleware'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { userRouter } from './routes/user-router'
import { productRouter } from './routes/product-router'
import { orderRouter } from './routes/order-router'
import { authMiddleware } from './middlewares/auth-middleware'

dotenv.config()

export const app: Application = express()
const PORT = process.env.PORT || 5000
const URL = process.env.DB_URL || 'mongodb://0.0.0.0:27017'

app.use(express.json())
app.use(cookieParser())
app.use(
   cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
   })
)
// app.use('/api', routes)
app.use(errorMiddleware)

app.get('/', (req, res) => {
   return res.send('Server works properly. Express Typescript on Vercel :)')
})
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

const startApp = async () => {
   try {
      await mongoose.connect(URL)
   } catch (e) {
      console.log(e)
   }
   app.listen(PORT, () => {
      console.log('Server is running on port' + PORT)
   })
}
startApp()

//Mongoose Node.js Express TypeScript application boilerplate with best practices for API development.
//https://github.com/chiragmehta900/node-typescript-boilerplate-mongoose
