import mongoose, { Schema, InferSchemaType } from 'mongoose'

const BasketSchema = new Schema({
   userID: { type: Schema.Types.ObjectId, ref: 'User' },
   products: { type: Array },
})

type BasketSchemaType = InferSchemaType<typeof BasketSchema>

export const BasketModel = mongoose.model('Baskets', BasketSchema)
