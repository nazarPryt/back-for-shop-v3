import process from 'process'

class AppSettings {
   public readonly constants = {
      // accessToken: 'accessToken',
      // refreshToken: 'refreshToken',
   }

   public readonly env = {
      PORT: process.env.PORT,
      API_URL: process.env.API_URL as string,
      CLIENT_URL: process.env.CLIENT_URL as string,
      STRIPE_KEY: process.env.STRIPE_KEY as string,

      MONGODB_URL: process.env.MONGODB_URL as string,
      MONGODB_PASSWORD: process.env.MONGODB_PASSWORD as string,
      MONGODB_NAME: process.env.MONGODB_NAME as string,

      JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
      JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,

      SMTP_HOST: process.env.SMTP_HOST as string,

      SMTP_PORT: process.env.SMTP_PORT as string,
      SMTP_USER: process.env.SMTP_USER as string,
      SMTP_PASSWORD: process.env.SMTP_PASSWORD as string,

      CLOUDINARY_NAME: process.env.CLOUDINARY_NAME as string,
      CLOUDINARY_KEY: process.env.CLOUDINARY_KEY as string,
      CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET as string,
   }
}
export const appSettings = new AppSettings()
