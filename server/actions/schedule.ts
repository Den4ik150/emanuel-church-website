"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { scheduleSchema, type ScheduleFormValues } from "@/features/schedule/schema";

function nullable(val: string | undefined): string | null {
  return val?.trim() ? val.trim() : null;
}

export async function createScheduleItem(data: ScheduleFormValues) {
  const parsed = scheduleSchema.parse(data);

  await prisma.scheduleItem.create({
    data: {
      stream: parsed.stream,
      title: parsed.title,
      category: nullable(parsed.category),
      weekday: parsed.weekday,
      startTime: parsed.startTime,
      endTime: nullable(parsed.endTime),
      location: nullable(parsed.location),
      description: nullable(parsed.description),
      displayOrder: parsed.displayOrder ? parseInt(parsed.displayOrder, 10) : 0,
      isActive: parsed.isActive ?? true,
    },
  });

  revalidatePath("/admin/schedule");
  redirect("/admin/schedule");
}

export async function updateScheduleItem(id: string, data: ScheduleFormValues) {
  const parsed = scheduleSchema.parse(data);

  await prisma.scheduleItem.update({
    where: { id },
    data: {
      stream: parsed.stream,
      title: parsed.title,
      category: nullable(parsed.category),
      weekday: parsed.weekday,
      startTime: parsed.startTime,
      endTime: nullable(parsed.endTime),
      location: nullable(parsed.location),
      description: nullable(parsed.description),
      displayOrder: parsed.displayOrder ? parseInt(parsed.displayOrder, 10) : 0,
      isActive: parsed.isActive ?? true,
    },
  });

  revalidatePath("/admin/schedule");
  redirect("/admin/schedule");
}

export async function deleteScheduleItem(id: string) {
  await prisma.scheduleItem.delete({ where: { id } });
  revalidatePath("/admin/schedule");
}
