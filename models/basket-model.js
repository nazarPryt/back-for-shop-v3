const {Schema, model} = require('mongoose')

const BasketSchema = new Schema({
  userID: {type: Schema.Types.ObjectId, ref: 'User'},
})
module.exports = model('Basket', BasketSchema)


const BasketDeviceSchema = new Schema({
  deviceID: {type: Schema.Types.ObjectId, ref: 'Product'},
  basketID: {type: Schema.Types.ObjectId, ref: 'Basket'},
})
module.exports = model('BasketDevice', BasketDeviceSchema)