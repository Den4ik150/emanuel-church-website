import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  slug: z.string().min(1, "Слаг обязателен"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Содержание обязательно"),
  coverImageUrl: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export type NewsFormValues = z.infer<typeof newsSchema>;
