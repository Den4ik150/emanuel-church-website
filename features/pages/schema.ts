import { z } from "zod";

export const staticPageSchema = z.object({
  slug: z.string().min(1, "Слаг обязателен"),
  title: z.string().min(1, "Заголовок обязателен"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Содержание обязательно"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export type StaticPageFormValues = z.infer<typeof staticPageSchema>;
