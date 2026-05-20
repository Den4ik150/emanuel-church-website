"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { galleryAlbumSchema, type GalleryAlbumFormValues } from "@/features/gallery/schema";

function nullable(val: string | undefined): string | null {
  return val?.trim() ? val.trim() : null;
}

export async function createAlbum(data: GalleryAlbumFormValues) {
  const parsed = galleryAlbumSchema.parse(data);

  await prisma.galleryAlbum.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      description: nullable(parsed.description),
      albumDate: parsed.albumDate ? new Date(parsed.albumDate) : null,
      coverImageUrl: nullable(parsed.coverImageUrl),
      isPublished: parsed.isPublished ?? false,
    },
  });

  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function updateAlbum(id: string, data: GalleryAlbumFormValues) {
  const parsed = galleryAlbumSchema.parse(data);

  await prisma.galleryAlbum.update({
    where: { id },
    data: {
      title: parsed.title,
      slug: parsed.slug,
      description: nullable(parsed.description),
      albumDate: parsed.albumDate ? new Date(parsed.albumDate) : null,
      coverImageUrl: nullable(parsed.coverImageUrl),
      isPublished: parsed.isPublished ?? false,
    },
  });

  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function deleteAlbum(id: string) {
  await prisma.galleryAlbum.delete({ where: { id } });
  revalidatePath("/admin/gallery");
}
