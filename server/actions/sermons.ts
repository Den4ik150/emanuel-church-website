"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sermonSchema, type SermonFormValues } from "@/features/sermons/schema";

function nullable(val: string | undefined): string | null {
  return val?.trim() ? val.trim() : null;
}

function toTimestamp(val: string | undefined): number | null {
  if (!val?.trim()) return null;
  const n = parseInt(val, 10);
  return isNaN(n) ? null : n;
}

export async function createSermon(data: SermonFormValues) {
  const parsed = sermonSchema.parse(data);

  await prisma.sermon.create({
    data: {
      title: parsed.title,
      topic: nullable(parsed.topic),
      preacher: parsed.preacher,
      description: nullable(parsed.description),
      sermonDate: new Date(parsed.sermonDate),
      thumbnailUrl: nullable(parsed.thumbnailUrl),
      videoUrl: parsed.videoUrl,
      timestampSeconds: toTimestamp(parsed.timestampSeconds),
      notesUrl: nullable(parsed.notesUrl),
      isPublished: parsed.isPublished ?? false,
    },
  });

  revalidatePath("/admin/sermons");
  redirect("/admin/sermons");
}

export async function updateSermon(id: string, data: SermonFormValues) {
  const parsed = sermonSchema.parse(data);

  await prisma.sermon.update({
    where: { id },
    data: {
      title: parsed.title,
      topic: nullable(parsed.topic),
      preacher: parsed.preacher,
      description: nullable(parsed.description),
      sermonDate: new Date(parsed.sermonDate),
      thumbnailUrl: nullable(parsed.thumbnailUrl),
      videoUrl: parsed.videoUrl,
      timestampSeconds: toTimestamp(parsed.timestampSeconds),
      notesUrl: nullable(parsed.notesUrl),
      isPublished: parsed.isPublished ?? false,
    },
  });

  revalidatePath("/admin/sermons");
  redirect("/admin/sermons");
}

export async function deleteSermon(id: string) {
  await prisma.sermon.delete({ where: { id } });
  revalidatePath("/admin/sermons");
}
