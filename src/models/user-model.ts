import mongoose, { Schema, InferSchemaType } from 'mongoose'

const UserSchema = new Schema({
   email: { type: String, unique: true, require: true },
   password: { type: String, require: true },
   isActivated: { type: Boolean, default: false },
   activationLink: { type: String },
   role: { type: String, defaultValue: 'USER' },
})

type UserType = InferSchemaType<typeof UserSchema>

export const UserModel = mongoose.model('Users', UserSchema)
