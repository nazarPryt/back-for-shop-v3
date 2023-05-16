import express, { Request, Response } from 'express'
import { productsRouter } from './routes/products-router'
import { userRouter } from './routes/user-router'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use('/products', productsRouter)
app.use('/user', userRouter)

app.get('/', (req: Request, res: Response) => {
   res.send('Back works properly  :)')
})

app.listen(PORT, () => {
   console.log(
      'Server is Successfully Running,and App is listening on port ' + PORT
   )
})
