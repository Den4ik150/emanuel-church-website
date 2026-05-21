"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function addGalleryItem(data: {
  albumId: string;
  fileUrl: string;
  thumbnailUrl: string;
  title?: string;
  displayOrder?: number;
}) {
  await prisma.galleryItem.create({
    data: {
      albumId: data.albumId,
      fileUrl: data.fileUrl,
      thumbnailUrl: data.thumbnailUrl,
      title: data.title ?? null,
      displayOrder: data.displayOrder ?? 0,
      type: "photo",
    },
  });
  revalidatePath(`/admin/gallery/${data.albumId}/items`);
}

export async function deleteGalleryItem(id: string, albumId: string) {
  const item = await prisma.galleryItem.findUnique({ where: { id } });
  if (!item) return;

  // Try to delete from Cloudinary (extract public_id from URL)
  try {
    const match = item.fileUrl.match(/emmanuil-church\/gallery\/[^.]+/);
    if (match) await deleteFromCloudinary(match[0]);
  } catch {
    // Non-critical — file may already be gone
  }

  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath(`/admin/gallery/${albumId}/items`);
}

export async function updateGalleryItemOrder(
  items: { id: string; displayOrder: number }[]
) {
  await Promise.all(
    items.map((item) =>
      prisma.galleryItem.update({
        where: { id: item.id },
        data: { displayOrder: item.displayOrder },
      })
    )
  );
}
