const {Schema, model} = require('mongoose');

const OrderSchema = new Schema({
  userID: {type: Schema.Types.ObjectId, ref: 'User'},
  products: {type: Object},
})

module.exports = model('Order', OrderSchema)