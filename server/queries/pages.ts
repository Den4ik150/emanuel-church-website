import { prisma } from "@/lib/prisma";
import type { Stream } from "@/lib/generated/prisma/client";

export async function getAllPages(stream?: Stream | null) {
  return prisma.staticPage.findMany({
    where: stream ? { stream } : undefined,
    orderBy: { slug: "asc" },
  });
}

export async function getPageById(id: string) {
  return prisma.staticPage.findUnique({ where: { id } });
}
