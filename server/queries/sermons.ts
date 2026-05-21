import { prisma } from "@/lib/prisma";
import type { Stream } from "@/lib/generated/prisma/client";

export async function getAllSermons(stream?: Stream | null) {
  return prisma.sermon.findMany({
    where: stream ? { stream } : undefined,
    orderBy: { sermonDate: "desc" },
  });
}

export async function getSermonById(id: string) {
  return prisma.sermon.findUnique({ where: { id } });
}

export async function getPublishedSermons(stream: Stream) {
  return prisma.sermon.findMany({
    where: { isPublished: true, stream },
    orderBy: { sermonDate: "desc" },
  });
}

export async function getRecentSermons(stream: Stream, limit = 3) {
  return prisma.sermon.findMany({
    where: { isPublished: true, stream },
    orderBy: { sermonDate: "desc" },
    take: limit,
  });
}
