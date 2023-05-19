import mongoose, { Schema, InferSchemaType } from 'mongoose'

const CategoriesSchema = new Schema({
   name: { type: String, unique: true },
   products: { type: Schema.Types.ObjectId, ref: 'Products' },
})

type CategoriesSchemaType = InferSchemaType<typeof CategoriesSchema>

export const CategoryModel = mongoose.model('Categories', CategoriesSchema)
