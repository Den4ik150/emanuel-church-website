"use server";

import { prisma } from "@/lib/prisma";

export async function verifyStreamPin(
  stream: "RO" | "RU",
  pin: string,
): Promise<{ success: boolean; error?: string }> {
  if (!pin.trim()) return { success: false, error: "Введите PIN" };

  const key = stream === "RO" ? "pin_ro" : "pin_ru";
  const setting = await prisma.siteSetting.findUnique({ where: { key } });

  if (!setting?.value) {
    return { success: false, error: "PIN для этого потока не настроен. Задайте его в Настройках." };
  }

  if (setting.value !== pin.trim()) {
    return { success: false, error: "Неверный PIN" };
  }

  return { success: true };
}

export async function saveStreamPin(
  stream: "RO" | "RU",
  pin: string,
): Promise<{ success: boolean; error?: string }> {
  if (!pin.trim()) return { success: false, error: "PIN не может быть пустым" };
  if (pin.trim().length < 4) return { success: false, error: "Минимум 4 символа" };

  const key = stream === "RO" ? "pin_ro" : "pin_ru";
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value: pin.trim() },
    create: { key, value: pin.trim(), group: "security" },
  });

  return { success: true };
}
