import { prisma } from "@/lib/prisma";

export async function getAllAlbums() {
  return prisma.galleryAlbum.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { items: true } } },
  });
}

export async function getAlbumById(id: string) {
  return prisma.galleryAlbum.findUnique({ where: { id } });
}

export async function getPublishedAlbums() {
  return prisma.galleryAlbum.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { items: true } } },
  });
}
