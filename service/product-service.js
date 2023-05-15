const ProductModel = require('../models/product-model')
const ApiError = require('../exceptions/api-error');


class ProductService {

  async getAll() {
    const products = await ProductModel.find()
    return products
  }

  async getOne(id) {
    return ProductModel.findById(id)
  }

  async addProduct(product) {
    try {
      const newProduct = new ProductModel(product)
      return await newProduct.save()

    } catch (e) {
      return {message: 'this product is already exist'}
    }

  }
}

module.exports = new ProductService()