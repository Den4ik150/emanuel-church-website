import { prisma } from "@/lib/prisma";

export async function getAllEvents() {
  return prisma.event.findMany({
    orderBy: { eventDate: "desc" },
  });
}

export async function getEventById(id: string) {
  return prisma.event.findUnique({ where: { id } });
}

export async function getPublishedEvents() {
  return prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { eventDate: "asc" },
  });
}

export async function getUpcomingEvents(limit = 3) {
  return prisma.event.findMany({
    where: { isPublished: true, eventDate: { gte: new Date() } },
    orderBy: { eventDate: "asc" },
    take: limit,
  });
}
