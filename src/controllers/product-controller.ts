import ProductService from '../services/product-service'
import { Response, Request } from 'express'

class ProductController {
   async getAll(req: Request, res: Response) {
      try {
         const products = await ProductService.getAll()
         return res.json(products)
      } catch (e) {
         console.log(e)
      }
   }

   async addProduct(req: Request, res: Response) {
      try {
         const product = { ...req.body }

         if (product.title) {
            const createdProduct = await ProductService.addProduct(product)
            return res.json({
               createdProduct,
               message: 'new product was successfully added',
            })
         }
         return res.json({ message: 'cant save' })
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
}

export default new ProductController()
