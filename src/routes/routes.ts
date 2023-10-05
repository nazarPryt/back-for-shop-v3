import { Router } from "express";
import { userRouter } from "./user-router";
import { productRouter } from "./product-router";
import { orderRouter } from "./order-router";

export const routes = Router({})

routes.use('/users', userRouter)
routes.use('/products', productRouter)
routes.use('/orders', orderRouter)
