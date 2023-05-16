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
         return await newProduct.save()
      } catch (e) {
         return { message: 'this product is already exist' }
      }
   }
}

export default new ProductService()
