const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
  name: { type: String, unique: true},
  products: {type: Array},
})
module.exports = model('Category', CategorySchema)