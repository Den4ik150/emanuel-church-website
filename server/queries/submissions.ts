import { prisma } from "@/lib/prisma";

export async function getAllContactSubmissions() {
  return prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllPrayerRequests() {
  return prisma.prayerRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
}
