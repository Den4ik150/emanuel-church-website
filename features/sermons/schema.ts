import { z } from "zod";

export const sermonSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  topic: z.string().optional(),
  preacher: z.string().min(1, "Проповедник обязателен"),
  description: z.string().optional(),
  sermonDate: z.string().min(1, "Дата обязательна"),
  thumbnailUrl: z.string().optional(),
  videoUrl: z.string().min(1, "Ссылка на видео обязательна"),
  timestampSeconds: z.string().optional(),
  notesUrl: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export type SermonFormValues = z.infer<typeof sermonSchema>;
