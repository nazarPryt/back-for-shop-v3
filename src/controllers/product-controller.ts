import ProductService from '../services/product-service'
import { Response, Request, NextFunction } from 'express'
import { ProductModel } from '../models/product-model'
import { ApiError } from '../exceptions/api-error'
import { v4 } from 'uuid'
import * as process from 'process'

class ProductController {
   async getAll(req: Request, res: Response) {
      try {
         const products = await ProductService.getAll()
         return res.json(products)
      } catch (e) {
         console.log(e)
      }
   }

   async addProduct(req: Request, res: Response, next: NextFunction) {
      try {
         const product = { ...req.body }

         const existed = await ProductModel.findOne({ title: product.title })
         if (existed) {
            return next(
               ApiError.BadRequest(
                  `${product.title} is already exist, can't add one more`
               )
            )
         }

         const createdProduct = await ProductService.addProduct(product)

         if (typeof createdProduct !== 'string') {
            return res.json({
               createdProduct,
               message: 'new product was successfully added',
            })
         }
         return next(ApiError.BadRequest(createdProduct))
      } catch (e) {
         console.log(e)
      }
   }

   async getOne(req: Request, res: Response) {
      try {
         const { id } = req.params
         if (id) {
            const product = await ProductService.getOne(id)
            return res.json(product)
         }
         return res.json({ message: 'cant find this product' })
      } catch (e) {
         console.log(e)
      }
   }

   async uploadCover(req: any, res: Response) {
      try {
         console.log('req', req)
         console.log('files', req.files.file)
         const file = req.files.file
         //
         const coverName = v4() + '.jpg'
         file.mv(process.env.STATIC_PATH + '//' + coverName)

         return res.status(200).json({ message: 'Upload cover success' })
      } catch (e) {
         console.log(e)
         return res.status(400).json({ message: 'Upload cover error' })
      }
   }
}

export default new ProductController()
