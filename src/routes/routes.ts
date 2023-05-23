import { Router } from 'express'
import { userRouter } from './user-router'
import { productRouter } from './product-router'
import { orderRouter } from './order-router'
import { app } from '../index'

export const routes = Router({})

// app.use('/users', userRouter)
// app.use('/products', productRouter)
// app.use('/orders', orderRouter)
