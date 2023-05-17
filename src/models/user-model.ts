import mongoose, { Schema, InferSchemaType } from 'mongoose'

const UserSchema = new Schema({
   email: { type: String, unique: true, require: true },
   password: { type: String, require: true },
   activationLink: { type: String },
   isActivated: { type: Boolean, default: false },
   role: { type: String, defaultValue: 'USER' },
})

type UserSchemaType = InferSchemaType<typeof UserSchema>

export const UserModel = mongoose.model('Users', UserSchema)
