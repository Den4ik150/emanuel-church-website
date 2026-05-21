import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const items = [
    { stream: "RO" as const, title: "Serviciu de duminică",    category: "Serviciu",     weekday: "Sunday",    startTime: "10:00", location: "Strada Pușkin 77", displayOrder: 1 },
    { stream: "RO" as const, title: "Comuniune tineret",       category: "Tineret",      weekday: "Thursday",  startTime: "19:00", location: "Strada Pușkin 77", displayOrder: 2 },
    { stream: "RO" as const, title: "Studiu biblic",           category: "Studiu",       weekday: "Wednesday", startTime: "18:00", location: "Strada Pușkin 77", displayOrder: 3 },
    { stream: "RU" as const, title: "Воскресное богослужение", category: "Богослужение", weekday: "Sunday",    startTime: "15:00", location: "Strada Pușkin 77", displayOrder: 1 },
    { stream: "RU" as const, title: "Молодёжное служение",     category: "Молодёжь",     weekday: "Tuesday",   startTime: "18:30", location: "Strada Pușkin 77", displayOrder: 2 },
    { stream: "RU" as const, title: "Разбор Слова",            category: "Изучение",     weekday: "Wednesday", startTime: "18:00", location: "Strada Pușkin 77", displayOrder: 3 },
  ];

  for (const item of items) {
    const r = await prisma.scheduleItem.create({ data: item });
    console.log("✓", r.stream, r.weekday, r.startTime, "-", r.title);
  }

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
