"use server";

import { prisma } from "@/lib/prisma";
import type { Stream } from "@/lib/generated/prisma/client";
import { prayerSchema, type PrayerFormValues } from "@/features/prayer-requests/schema";

function nullable(val: string | undefined): string | null {
  return val?.trim() ? val.trim() : null;
}

export async function submitPrayerRequest(
  data: PrayerFormValues,
  stream: Stream = "RU",
): Promise<{ success: boolean; error?: string }> {
  try {
    const parsed = prayerSchema.parse(data);
    await prisma.prayerRequest.create({
      data: {
        stream,
        name: parsed.name.trim(),
        email: nullable(parsed.email),
        phone: nullable(parsed.phone),
        message: parsed.message.trim(),
        isPrivate: parsed.isPrivate ?? true,
      },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Произошла ошибка. Попробуйте позже." };
  }
}
