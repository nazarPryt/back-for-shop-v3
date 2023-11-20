import express, { Application } from 'express'
import dotenv from 'dotenv'
import { routes } from './routes/routes'
import { errorMiddleware } from './middlewares/error-middleware'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import process from 'process'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

export const app: Application = express()
const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL

app.use(express.json())
app.use(
   fileUpload({
      useTempFiles: true,
      tempFileDir: path.join(__dirname, '/tmp'),
   })
)
app.use(express.static('src/static'))
app.use(cookieParser())
app.use(
   cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
      preflightContinue: true,
   })
)
app.get('/', (req, res) => {
   return res.send('Server works properly. Express Typescript on Vercel :)')
})
app.use('/api', routes)
app.use(errorMiddleware)

const startApp = async () => {
   try {
      cloudinary.config({
         cloud_name: process.env.CLOUDINARY_NAME,
         api_key: process.env.CLOUDINARY_KEY,
         api_secret: process.env.CLOUDINARY_SECRET,
         secure: true,
      })
      await mongoose.connect(DB_URL).then(() => {
        console.log(`Connected to Database :)` );
      }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
      });
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
