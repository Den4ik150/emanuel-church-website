import { prisma } from "@/lib/prisma";
import type { Stream } from "@/lib/generated/prisma/client";

export async function getAllScheduleItems() {
  return prisma.scheduleItem.findMany({
    orderBy: [{ displayOrder: "asc" }, { weekday: "asc" }, { startTime: "asc" }],
  });
}

export async function getScheduleItemById(id: string) {
  return prisma.scheduleItem.findUnique({ where: { id } });
}

export async function getActiveScheduleItems(stream: Stream) {
  return prisma.scheduleItem.findMany({
    where: { isActive: true, stream },
    orderBy: [{ displayOrder: "asc" }, { startTime: "asc" }],
  });
}
