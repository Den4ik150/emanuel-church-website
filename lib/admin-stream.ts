import { cookies } from "next/headers";
import type { Stream } from "@/lib/generated/prisma/client";

export const ADMIN_STREAM_COOKIE = "admin-stream";

export async function getAdminStream(): Promise<Stream | null> {
  const jar = await cookies();
  const val = jar.get(ADMIN_STREAM_COOKIE)?.value;
  if (val === "RO" || val === "RU") return val;
  return null; // null = show all (no filter)
}
