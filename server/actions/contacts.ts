"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema, type ContactFormValues } from "@/features/contacts/schema";

function nullable(val: string | undefined): string | null {
  return val?.trim() ? val.trim() : null;
}

export async function submitContact(
  data: ContactFormValues,
): Promise<{ success: boolean; error?: string }> {
  try {
    const parsed = contactSchema.parse(data);
    await prisma.contactSubmission.create({
      data: {
        name: parsed.name.trim(),
        email: parsed.email.trim(),
        phone: nullable(parsed.phone),
        message: parsed.message.trim(),
      },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Произошла ошибка. Попробуйте позже." };
  }
}
