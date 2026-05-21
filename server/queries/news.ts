import { prisma } from "@/lib/prisma";
import type { Stream } from "@/lib/generated/prisma/client";

export async function getAllNews() {
  return prisma.newsPost.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getNewsById(id: string) {
  return prisma.newsPost.findUnique({ where: { id } });
}

export async function getPublishedNews(stream: Stream) {
  return prisma.newsPost.findMany({
    where: { isPublished: true, stream },
    orderBy: { publishedAt: "desc" },
  });
}
