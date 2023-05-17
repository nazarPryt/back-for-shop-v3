import express, { Application } from 'express'
import dotenv from 'dotenv'
import { routes } from './routes/routes'
import { errorMiddleware } from './middlewares/error-middleware'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { runDb } from './exceptions/db'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(
   cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
   })
)
app.use('/api', routes)
app.use(errorMiddleware)

const startServer = async () => {
   try {
      await runDb()

      app.listen(PORT, () => {
         console.log(
            'Server is Successfully Running,and App is listening on port ' +
               PORT
         )
      })
   } catch (e) {
      console.log('can not start server :(')
   }
}
startServer()

// app.get('/', async (req: Request, res: Response) => {
//    await mongoose.connect(process.env.DB_URL || 'user')
//    res.send('Back works properly  :)')
// })
//
// app.listen(PORT, () => {
//    console.log(
//       'Server is Successfully Running,and App is listening on port ' + PORT
//    )
// })
