import { AppSettingsSchema } from "./appSchemas";

export const zodValidation = () => {
  try {
    AppSettingsSchema.parse(appSettings);
    console.log('Конфигурация валидна');
  } catch (error) {
    console.error('Ошибка конфигурации:', error);
    throw error;
  }
};