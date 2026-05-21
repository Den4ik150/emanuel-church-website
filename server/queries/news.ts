import { prisma } from "@/lib/prisma";
import type { Stream } from "@/lib/generated/prisma/client";

export async function getAllNews(stream?: Stream | null) {
  return prisma.newsPost.findMany({
    where: stream ? { stream } : undefined,
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

export async function getPublishedNewsBySlug(slug: string, stream: Stream) {
  return prisma.newsPost.findFirst({
    where: { slug, stream, isPublished: true },
  });
}
