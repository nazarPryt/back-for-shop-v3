const {Schema, model} = require('mongoose');

const OrderSchema = new Schema({
  userID: {type: Schema.Types.ObjectId, ref: 'User'},
  products: {type: Array},
})

module.exports = model('Order', OrderSchema)