import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const BASE = "https://res.cloudinary.com/dcml2gd8n/image/upload/emmanuil-church/gallery/ru";

const PHOTOS = [
  { id: "photo-01", url: `${BASE}/photo-01.jpg` },
  { id: "photo-02", url: `${BASE}/photo-02.jpg` },
  { id: "photo-03", url: `${BASE}/photo-03.jpg` },
  { id: "photo-04", url: `${BASE}/photo-04.jpg` },
  { id: "photo-05", url: `${BASE}/photo-05.jpg` },
  { id: "photo-06", url: `${BASE}/photo-06.jpg` },
  { id: "photo-08", url: `${BASE}/photo-08.jpg` },
];

async function main() {
  // Create album
  const album = await prisma.galleryAlbum.upsert({
    where: { slug_stream: { slug: "viata-bisericii", stream: "RU" } },
    update: {},
    create: {
      stream: "RU",
      title: "Жизнь церкви",
      slug: "viata-bisericii",
      description: "Фотографии из жизни русского потока церкви Эммануил",
      coverImageUrl: `${BASE}/photo-01.jpg`,
      isPublished: true,
    },
  });
  console.log("✓ Album:", album.title, album.id);

  // Add photos
  for (let i = 0; i < PHOTOS.length; i++) {
    const photo = PHOTOS[i];
    await prisma.galleryItem.create({
      data: {
        albumId: album.id,
        fileUrl: photo.url,
        thumbnailUrl: photo.url,
        displayOrder: i + 1,
        type: "photo",
      },
    });
    console.log(`  ✓ ${photo.id}`);
  }

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
