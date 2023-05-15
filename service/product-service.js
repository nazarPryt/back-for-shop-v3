const ProductModel = require('../models/token-model')


class ProductService {

  async getAll() {
    const products = await ProductModel.find()
    return products
  }

  async addProduct(product) {
    await ProductModel.create(product)
    return product
  }
}

module.exports = new ProductService()