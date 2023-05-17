import { Router } from 'express'
import { userRouter } from './user-router'
import { productRouter } from './product-router'

export const routes = Router({})

routes.use('/users', userRouter)
routes.use('/product', productRouter)