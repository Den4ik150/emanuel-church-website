import { prisma } from "@/lib/prisma";

export async function getAlbumItems(albumId: string) {
  return prisma.galleryItem.findMany({
    where: { albumId },
    orderBy: { displayOrder: "asc" },
  });
}
