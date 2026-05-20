import { prisma } from "@/lib/prisma";

export async function getAllScheduleItems() {
  return prisma.scheduleItem.findMany({
    orderBy: [{ displayOrder: "asc" }, { weekday: "asc" }, { startTime: "asc" }],
  });
}

export async function getScheduleItemById(id: string) {
  return prisma.scheduleItem.findUnique({ where: { id } });
}

export async function getActiveScheduleItems() {
  return prisma.scheduleItem.findMany({
    where: { isActive: true },
    orderBy: [{ displayOrder: "asc" }, { startTime: "asc" }],
  });
}
