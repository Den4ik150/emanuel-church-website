import { z } from "zod";

export const galleryAlbumSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  slug: z.string().min(1, "Слаг обязателен"),
  description: z.string().optional(),
  albumDate: z.string().optional(),
  coverImageUrl: z.string().optional(),
  isPublished: z.boolean(),
});

export type GalleryAlbumFormValues = z.infer<typeof galleryAlbumSchema>;
