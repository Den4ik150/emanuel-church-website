import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  slug: z.string().min(1, "Слаг обязателен"),
  description: z.string().optional(),
  eventDate: z.string().min(1, "Дата обязательна"),
  eventTimeLabel: z.string().optional(),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
  isFeatured: z.boolean(),
  stream: z.enum(["RO", "RU"]),
  isPublished: z.boolean(),
});

export type EventFormValues = z.infer<typeof eventSchema>;
