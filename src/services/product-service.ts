import { ProductModel, ProductSchemaType } from '../models/product-model'
import {
   ProductCoverModel,
   ProductCoverSchemaType,
} from '../models/product-cover-model'

class ProductService {
   async getAll() {
      const products = await ProductModel.find()
      return products
   }

   async getOne(id: string) {
      return ProductModel.findById(id)
   }

   async addProduct(product: ProductSchemaType) {
      try {
         const newProduct = new ProductModel(product)
         await newProduct.save()
         return newProduct
      } catch (e: any) {
         return e.message
      }
   }

   async addProductCover(cover: ProductCoverSchemaType) {
      try {
         const newCover = new ProductCoverModel(cover)
         await newCover.save()
         return newCover
      } catch (e: any) {
         return e.message
      }
   }
}

export default new ProductService()
