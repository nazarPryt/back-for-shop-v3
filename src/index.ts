import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import { routes } from './routes/routes'
import mongoose from 'mongoose'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 5000

// routes
app.use('/api', routes)

app.get('/', async (req: Request, res: Response) => {
   await mongoose.connect(process.env.DB_URL || 'user')
   res.send('Back works properly  :)')
})

app.listen(PORT, () => {
   console.log(
      'Server is Successfully Running,and App is listening on port ' + PORT
   )
})
