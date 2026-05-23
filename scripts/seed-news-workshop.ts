import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1 week ago
  const publishedAt = new Date();
  publishedAt.setDate(publishedAt.getDate() - 7);

  const post = await prisma.newsPost.upsert({
    where: { slug_stream: { slug: "workshop-nortek-2025", stream: "RU" } },
    update: {},
    create: {
      stream: "RU",
      title: "Воркшоп с опытными спикерами из Англии",
      slug: "workshop-nortek-2025",
      excerpt: "Благодаря ССХ, Нортеку и его партнерам, в Бельцах прошел уникальный воркшоп с двумя опытными спикерами из Англии.",
      content: `Благодаря ССХ, Нортеку и его партнерам, в этот вторник в Бельцах прошел воркшоп с двумя опытными спикерами из Англии 🇬🇧

Не ждите, пока в Бельцах появится культура — создавайте ее сами, и становитесь участниками таких уникальных событий, как это.`,
      coverImageUrl: "https://res.cloudinary.com/dcml2gd8n/video/upload/v1779393967/emmanuil-church/news/ru/workshop-nortek-2025.mp4",
      isPublished: true,
      publishedAt,
    },
  });

  console.log("✓ News post created:", post.title);
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
