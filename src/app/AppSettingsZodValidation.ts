import { AppSettingsSchema } from './appSchemas'
import { appSettings } from './appSettings'

export const appSettingsZodValidation = async () => {
   try {
      await AppSettingsSchema.parseAsync(appSettings)
      console.log('appSettingsZod is OK :)')
   } catch (error) {
      console.error('ERROR in appSettingsZod: ', error)
      throw error
   }
}
