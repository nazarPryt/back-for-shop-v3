import { ProductModel, ProductSchemaType } from '../models/product-model'

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
}

export default new ProductService()
