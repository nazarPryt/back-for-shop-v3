const {Schema, model} = require('mongoose')

const ProductSchema = new Schema({
  available: {type: Boolean, require: true},
  description: {type: String, require: true},
  title: {type: String, require: true},
  price: {type: Number, require: true},
  oldPrice: {type: Number, require: true},
  quantity: {type: Number, require: true},
  cover: {type: String, require: true},
  imgAll: {type: Array, require: true},
  category: {type: Array, require: true},
})
module.exports = model('Product', ProductSchema)
