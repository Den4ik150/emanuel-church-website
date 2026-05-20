import { prisma } from "@/lib/prisma";

export async function getAllSermons() {
  return prisma.sermon.findMany({
    orderBy: { sermonDate: "desc" },
  });
}

export async function getSermonById(id: string) {
  return prisma.sermon.findUnique({ where: { id } });
}
