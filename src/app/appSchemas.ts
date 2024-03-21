import { z } from "zod";

const AuthSettingsSchema = z
  .object({
    JWT_ACCESS_SECRET: z.string(),
    JWT_REFRESH_SECRET: z.string(),
  })
  .strict();

const MailerSettingsSchema = z
  .object({
    SMTP_HOST: z.string().url(),
    SMTP_PORT: z.number(),
    SMTP_USER: z.string().email(),
    SMTP_PASSWORD: z.string(),
  })
  .strict();

const CloudinarySettingsSchema = z
  .object({
    CLOUDINARY_NAME: z.string(),
    CLOUDINARY_KEY: z.number(),
    CLOUDINARY_SECRET: z.string(),
  })
  .strict();

const MongoDbSettingsSchema = z
  .object({
    MONGODB_URL: z.string().url(),
    MONGODB_PASSWORD: z.number(),
    MONGODB_NAME: z.string(),
  })
  .strict();

const ApiSettingsSchema = z
  .object({
    PORT: z.number(),
    API_URL: z.string().url(),
    CLIENT_URL: z.string().url(),
    STRIPE_KEY:  z.string()

})
  .strict();

export const AppSettingsSchema = z
  .object({
    api: ApiSettingsSchema,
    cloudinary: CloudinarySettingsSchema,
    mongoDb: MongoDbSettingsSchema,
    mailer: MailerSettingsSchema,
    auth: AuthSettingsSchema,
  })
  .strict();

