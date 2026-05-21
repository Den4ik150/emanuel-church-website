import { prisma } from "@/lib/prisma";
import type { Stream } from "@/lib/generated/prisma/client";

export async function getAllContactSubmissions(stream?: Stream) {
  return prisma.contactSubmission.findMany({
    where: stream ? { stream } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllPrayerRequests(stream?: Stream) {
  return prisma.prayerRequest.findMany({
    where: stream ? { stream } : undefined,
    orderBy: { createdAt: "desc" },
  });
}
