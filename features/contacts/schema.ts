import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Введите имя (минимум 2 символа)"),
  email: z.string().min(1, "Email обязателен").email("Неверный формат email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Сообщение слишком короткое (минимум 10 символов)"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
