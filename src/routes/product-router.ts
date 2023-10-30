import { Router } from 'express'
import ProductController from '../controllers/product-controller'
import { upload } from "../middlewares/file";

export const productRouter = Router({})

productRouter.get('/', ProductController.getAll)
productRouter.post('/', ProductController.addProduct)
productRouter.get('/:id', ProductController.getOne)
