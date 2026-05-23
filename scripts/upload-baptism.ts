import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const BASE_NAME = "🫆Мы не потеряем это ценное событие, даже если выложим его сильно позже, чем оно произошло -)В н";
const DOWNLOADS = "/Users/mac/Downloads";

const FILES = [
  `${BASE_NAME}.jpg`,
  `${BASE_NAME} (1).jpg`,
  `${BASE_NAME} (2).jpg`,
  `${BASE_NAME} (3).jpg`,
  `${BASE_NAME} (4).jpg`,
  `${BASE_NAME} (5).jpg`,
  `${BASE_NAME} (6).jpg`,
  `${BASE_NAME} (7).jpg`,
  `${BASE_NAME} (8).jpg`,
  `${BASE_NAME} (9).jpg`,
  `${BASE_NAME} (10).jpg`,
  `${BASE_NAME} (11).jpg`,
  `${BASE_NAME} (12).jpg`,
  `${BASE_NAME} (13).jpg`,
];

async function main() {
  const uploadedUrls: string[] = [];

  // Upload all photos
  for (let i = 0; i < FILES.length; i++) {
    const filePath = path.join(DOWNLOADS, FILES[i]);
    const publicId = `baptism-${String(i + 1).padStart(2, "0")}`;
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "emmanuil-church/gallery/ru/baptism-2025",
        public_id: publicId,
        overwrite: true,
      });
      uploadedUrls.push(result.secure_url);
      console.log(`✓ ${publicId}:`, result.secure_url);
    } catch (e) {
      console.error(`✗ ${publicId}:`, e);
    }
  }

  if (uploadedUrls.length === 0) {
    console.error("No photos uploaded!");
    return;
  }

  // 2 weeks ago
  const publishedAt = new Date();
  publishedAt.setDate(publishedAt.getDate() - 14);

  // Create news post
  const post = await prisma.newsPost.upsert({
    where: { slug_stream: { slug: "kreshhenie-30-noyabrya-2025", stream: "RU" } },
    update: {},
    create: {
      stream: "RU",
      title: "Крещение — 30 ноября 2025",
      slug: "kreshhenie-30-noyabrya-2025",
      excerpt: "Мы не потеряем это ценное событие, даже если выложим его сильно позже, чем оно произошло 🙂",
      content: `Мы не потеряем это ценное событие, даже если выложим его сильно позже, чем оно произошло :)

В наш инстаграм наконец-то попали фотографии крещения 30 ноября 2025. Вы не поверите, сколько ещё событий вы могли пропустить! Следите за обновлениями 🐝☀️`,
      coverImageUrl: uploadedUrls[0],
      isPublished: true,
      publishedAt,
    },
  });
  console.log("✓ News post:", post.title);

  // Create gallery album
  const album = await prisma.galleryAlbum.upsert({
    where: { slug_stream: { slug: "kreshhenie-30-noyabrya-2025", stream: "RU" } },
    update: {},
    create: {
      stream: "RU",
      title: "Крещение — 30 ноября 2025",
      slug: "kreshhenie-30-noyabrya-2025",
      albumDate: new Date("2025-11-30"),
      coverImageUrl: uploadedUrls[0],
      isPublished: true,
    },
  });
  console.log("✓ Gallery album:", album.title);

  // Add gallery items
  for (let i = 0; i < uploadedUrls.length; i++) {
    await prisma.galleryItem.create({
      data: {
        albumId: album.id,
        fileUrl: uploadedUrls[i],
        thumbnailUrl: uploadedUrls[i],
        displayOrder: i + 1,
        type: "photo",
      },
    });
  }
  console.log(`✓ Added ${uploadedUrls.length} photos to gallery`);

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
