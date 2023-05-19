import { Router } from 'express'
import { userRouter } from './user-router'
import { productRouter } from './product-router'
import { orderRouter } from './order-router'

export const routes = Router({})

routes.use('/api/users', userRouter)
routes.use('/api/products', productRouter)
routes.use('/api/orders', orderRouter)
routes.get('/', (req, res) => {
   return res.send('Server works properly. Express Typescript on Vercel :)')
})
