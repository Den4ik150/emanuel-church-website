import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const cookieStore = await cookies();
  const preferred = cookieStore.get("preferred-stream")?.value;
  redirect(preferred === "ru" ? "/ru" : "/ro");
}
