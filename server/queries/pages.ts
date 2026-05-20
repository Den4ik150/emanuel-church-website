import { prisma } from "@/lib/prisma";

export async function getAllPages() {
  return prisma.staticPage.findMany({
    orderBy: { slug: "asc" },
  });
}

export async function getPageById(id: string) {
  return prisma.staticPage.findUnique({ where: { id } });
}
