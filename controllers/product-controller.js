const ProductService = require('../service/product-service');

class ProductController {
  async getAll ( req, res) {
    try {
      const products = await ProductService.getAll()
      return res.json(products)

    } catch (e) {
      console.log(e);
    }
  }

  async addProduct ( req, res) {
    try {
      const product = {...req.body}

      if(product.title){
        const createdProduct = await ProductService.addProduct(product)
        return res.json({createdProduct, message: 'new product was successfully added'})
      }
      return res.json({message: 'cant save'})

    } catch (e) {
      console.log(e);
    }
  }

  async getOne ( req, res) {
    try {
      const {id} = req.params
      if(id){
        const product = await ProductService.getOne(id)
        return res.json(product)
      }
      return res.json({message: 'cant find this product'})

    } catch (e) {
      console.log(e);
    }
  }

}

module.exports = new ProductController()