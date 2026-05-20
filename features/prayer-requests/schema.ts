import { z } from "zod";

export const prayerSchema = z.object({
  name: z.string().min(2, "Введите имя (минимум 2 символа)"),
  email: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Пожалуйста, опишите молитвенную нужду (минимум 10 символов)"),
  isPrivate: z.boolean(),
});

export type PrayerFormValues = z.infer<typeof prayerSchema>;
