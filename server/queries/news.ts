import { prisma } from "@/lib/prisma";

export async function getAllNews() {
  return prisma.newsPost.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getNewsById(id: string) {
  return prisma.newsPost.findUnique({ where: { id } });
}

export async function getPublishedNews() {
  return prisma.newsPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });
}
