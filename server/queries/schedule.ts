import { prisma } from "@/lib/prisma";

export async function getAllScheduleItems() {
  return prisma.scheduleItem.findMany({
    orderBy: [{ displayOrder: "asc" }, { weekday: "asc" }, { startTime: "asc" }],
  });
}

export async function getScheduleItemById(id: string) {
  return prisma.scheduleItem.findUnique({ where: { id } });
}
