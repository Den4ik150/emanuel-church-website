import { z } from "zod";

export const scheduleSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  category: z.string().optional(),
  weekday: z.string().min(1, "День недели обязателен"),
  startTime: z.string().min(1, "Время начала обязательно"),
  endTime: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  displayOrder: z.string().optional(),
  stream: z.enum(["RO", "RU"]),
  isActive: z.boolean(),
});

export type ScheduleFormValues = z.infer<typeof scheduleSchema>;
