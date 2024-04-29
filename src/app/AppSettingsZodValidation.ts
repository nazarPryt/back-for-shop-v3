import { AppSettingsSchema } from './appSchemas'
import { appSettings } from './appSettings'

export const appSettingsZodValidation = () => {
   try {
      AppSettingsSchema.parse(appSettings)
      console.log('appSettingsZod is OK :)')
   } catch (error) {
      console.error('ERROR in appSettingsZod: ', error)
      throw error
   }
}
