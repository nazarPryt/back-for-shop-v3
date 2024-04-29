import { z } from 'zod'

const AuthSettingsSchema = z
   .object({
      JWT_ACCESS_SECRET: z.string().trim().min(1),
      JWT_REFRESH_SECRET: z.string().trim().min(1),
   })
   .strict()

const MailerSettingsSchema = z
   .object({
      SMTP_HOST: z.string().trim().min(1),
      SMTP_PORT: z.string().trim().min(1),
      SMTP_USER: z.string().trim().min(1),
      SMTP_PASSWORD: z.string().trim().min(1),
   })
   .strict()

const CloudinarySettingsSchema = z
   .object({
      CLOUDINARY_NAME: z.string().trim().min(1),
      CLOUDINARY_KEY: z.string().trim().min(1),
      CLOUDINARY_SECRET: z.string().trim().min(1),
   })
   .strict()

const MongoDbSettingsSchema = z
   .object({
      MONGODB_URL: z.string().trim().min(1),
      MONGODB_PASSWORD: z.string().trim().min(1),
      MONGODB_NAME: z.string().trim().min(1),
   })
   .strict()

const ApiSettingsSchema = z
   .object({
      PORT: z.preprocess((val) => Number(val), z.number()),
      API_URL: z.string().trim().min(1),
      CLIENT_URL: z.string().trim().min(1),
      STRIPE_KEY: z.string().trim().min(1),
   })
   .strict()

export const EnvSchema = z
   .object({})
   .merge(ApiSettingsSchema)
   .merge(ApiSettingsSchema)
   .merge(CloudinarySettingsSchema)
   .merge(MongoDbSettingsSchema)
   .merge(MailerSettingsSchema)
   .merge(AuthSettingsSchema)

export const AppSettingsSchema = z
   .object({
      // constants: ConstantsSchema,
      env: EnvSchema,
   })
   .strict()

//declaring global process env types according to our EnvSchema
type EnvSchemaType = z.infer<typeof EnvSchema>

declare global {
   namespace NodeJS {
      interface ProcessEnv extends EnvSchemaType {}
   }
}
