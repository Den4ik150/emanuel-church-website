"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { eventSchema, type EventFormValues } from "@/features/events/schema";

function nullable(val: string | undefined): string | null {
  return val?.trim() ? val.trim() : null;
}

export async function createEvent(data: EventFormValues) {
  const parsed = eventSchema.parse(data);

  await prisma.event.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      description: nullable(parsed.description),
      eventDate: new Date(parsed.eventDate),
      eventTimeLabel: nullable(parsed.eventTimeLabel),
      location: nullable(parsed.location),
      imageUrl: nullable(parsed.imageUrl),
      isFeatured: parsed.isFeatured ?? false,
      isPublished: parsed.isPublished ?? false,
    },
  });

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEvent(id: string, data: EventFormValues) {
  const parsed = eventSchema.parse(data);

  await prisma.event.update({
    where: { id },
    data: {
      title: parsed.title,
      slug: parsed.slug,
      description: nullable(parsed.description),
      eventDate: new Date(parsed.eventDate),
      eventTimeLabel: nullable(parsed.eventTimeLabel),
      location: nullable(parsed.location),
      imageUrl: nullable(parsed.imageUrl),
      isFeatured: parsed.isFeatured ?? false,
      isPublished: parsed.isPublished ?? false,
    },
  });

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/events");
}
