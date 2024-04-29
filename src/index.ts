import express, { Application } from 'express'
import dotenv from 'dotenv'
import { routes } from './routes/routes'
import { errorMiddleware } from './middlewares/error-middleware'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import process from 'process'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import { appSettingsZodValidation } from './app/AppSettingsZodValidation'
import { appSettings } from './app/appSettings'
import { connectDB } from './app/connectDB'

dotenv.config()

export const app: Application = express()
const PORT = appSettings.env.PORT

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
      origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
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
      await appSettingsZodValidation()

      await connectDB()

      cloudinary.config({
         cloud_name: appSettings.env.CLOUDINARY_NAME,
         api_key: appSettings.env.CLOUDINARY_KEY,
         api_secret: appSettings.env.CLOUDINARY_SECRET,
         secure: true,
      })

      app.listen(PORT, () => {
         console.log('Server is running on port: ' + PORT)
      })
   } catch (e) {
      console.log('Error to start App: ', e)
   }
}
startApp()

//Mongoose Node.js Express TypeScript application boilerplate with best practices for API development.
//https://github.com/chiragmehta900/node-typescript-boilerplate-mongoose
