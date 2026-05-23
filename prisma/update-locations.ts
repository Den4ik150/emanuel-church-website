import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const updates = [
    { stream: "RO" as const, weekday: "Sunday",    location: "Strada Pușkin 77 · Sala principală" },
    { stream: "RO" as const, weekday: "Thursday",  location: "Strada Pușkin 77 · Subsol" },
    { stream: "RO" as const, weekday: "Wednesday", location: "Strada Pușkin 77 · Subsol" },
    { stream: "RU" as const, weekday: "Sunday",    location: "Strada Pușkin 77 · Главный зал" },
    { stream: "RU" as const, weekday: "Tuesday",   location: "Strada Pușkin 77 · Подвальное помещение" },
    { stream: "RU" as const, weekday: "Wednesday", location: "Strada Pușkin 77 · Подвальное помещение" },
  ];

  for (const u of updates) {
    const r = await prisma.scheduleItem.updateMany({
      where: { stream: u.stream, weekday: u.weekday },
      data: { location: u.location },
    });
    console.log("✓", u.stream, u.weekday, "->", u.location, "(", r.count, "rows)");
  }

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
