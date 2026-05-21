import { prisma } from "@/lib/prisma";
import type { Stream } from "@/lib/generated/prisma/client";

export async function getAllEvents() {
  return prisma.event.findMany({
    orderBy: { eventDate: "desc" },
  });
}

export async function getEventById(id: string) {
  return prisma.event.findUnique({ where: { id } });
}

export async function getPublishedEvents(stream: Stream) {
  return prisma.event.findMany({
    where: { isPublished: true, stream },
    orderBy: { eventDate: "asc" },
  });
}

export async function getUpcomingEvents(stream: Stream, limit = 3) {
  return prisma.event.findMany({
    where: { isPublished: true, stream, eventDate: { gte: new Date() } },
    orderBy: { eventDate: "asc" },
    take: limit,
  });
}
