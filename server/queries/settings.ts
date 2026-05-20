import { prisma } from "@/lib/prisma";

export async function getAllSettings() {
  return prisma.siteSetting.findMany({
    orderBy: [{ group: "asc" }, { key: "asc" }],
  });
}
