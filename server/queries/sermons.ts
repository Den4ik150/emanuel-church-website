import { prisma } from "@/lib/prisma";

export async function getAllSermons() {
  return prisma.sermon.findMany({
    orderBy: { sermonDate: "desc" },
  });
}

export async function getSermonById(id: string) {
  return prisma.sermon.findUnique({ where: { id } });
}

export async function getPublishedSermons() {
  return prisma.sermon.findMany({
    where: { isPublished: true },
    orderBy: { sermonDate: "desc" },
  });
}

export async function getRecentSermons(limit = 3) {
  return prisma.sermon.findMany({
    where: { isPublished: true },
    orderBy: { sermonDate: "desc" },
    take: limit,
  });
}
