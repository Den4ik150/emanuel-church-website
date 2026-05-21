"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_STREAM_COOKIE } from "@/lib/admin-stream";

export async function setAdminStream(stream: "RO" | "RU" | "ALL") {
  const jar = await cookies();
  if (stream === "ALL") {
    jar.delete(ADMIN_STREAM_COOKIE);
  } else {
    jar.set(ADMIN_STREAM_COOKIE, stream, {
      path: "/admin",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }
  revalidatePath("/admin", "layout");
}
