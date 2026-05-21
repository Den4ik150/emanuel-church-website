import { prisma } from "@/lib/prisma";
import type { Stream } from "@/lib/generated/prisma/client";

export async function getAllAlbums(stream?: Stream | null) {
  return prisma.galleryAlbum.findMany({
    where: stream ? { stream } : undefined,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { items: true } } },
  });
}

export async function getAlbumById(id: string) {
  return prisma.galleryAlbum.findUnique({ where: { id } });
}

export async function getPublishedAlbums(stream: Stream) {
  return prisma.galleryAlbum.findMany({
    where: { isPublished: true, stream },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { items: true } } },
  });
}
