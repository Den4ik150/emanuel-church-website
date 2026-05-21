import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Church-themed placeholder images (Unsplash, free to use)
const CHURCH_IMGS = [
  "https://images.unsplash.com/photo-1548625149-720754986716?w=800&q=80", // church interior
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", // worship
  "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&q=80", // bible
  "https://images.unsplash.com/photo-1523242032760-8f72d46e82d9?w=800&q=80", // people praying
  "https://images.unsplash.com/photo-1447452001046-68b16ef22aeb?w=800&q=80", // cross
  "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80", // choir
];

async function main() {
  console.log("🌱 Seeding database...\n");

  // ── Admin ──────────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("admin123", 12);
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@emmanuil.md" },
    update: {},
    create: { email: "admin@emmanuil.md", passwordHash, name: "Администратор", isActive: true },
  });
  console.log(`✓ Admin: ${admin.email}`);

  // ── Sermons ─────────────────────────────────────────────────────────────────
  const sermonsRU = [
    { title: "Сила молитвы", preacher: "Пастор Иван Петров", topic: "Молитва", sermonDate: new Date("2025-05-18"), videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ", description: "О том, как молитва меняет нашу жизнь и приближает нас к Богу.", thumbnailUrl: CHURCH_IMGS[2] },
    { title: "Доверие в трудные времена", preacher: "Пастор Иван Петров", topic: "Вера", sermonDate: new Date("2025-05-11"), videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ", description: "Как сохранять веру, когда всё вокруг рушится.", thumbnailUrl: CHURCH_IMGS[3] },
    { title: "Любовь, которая не иссякает", preacher: "Диакон Сергей Иванов", topic: "Любовь", sermonDate: new Date("2025-05-04"), videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ", description: "Размышление о безусловной любви Бога к каждому из нас.", thumbnailUrl: CHURCH_IMGS[1] },
  ];

  const sermonsRO = [
    { title: "Puterea rugăciunii", preacher: "Pastor Gheorghe Marin", topic: "Rugăciune", sermonDate: new Date("2025-05-18"), videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ", description: "Despre cum rugăciunea ne transformă viața și ne apropie de Dumnezeu.", thumbnailUrl: CHURCH_IMGS[2] },
    { title: "Credință în vremuri grele", preacher: "Pastor Gheorghe Marin", topic: "Credință", sermonDate: new Date("2025-05-11"), videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ", description: "Cum să păstrăm credința atunci când totul în jur se prăbușește.", thumbnailUrl: CHURCH_IMGS[3] },
    { title: "Iubirea care nu se termină", preacher: "Diacon Ion Rusu", topic: "Iubire", sermonDate: new Date("2025-05-04"), videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ", description: "Meditație despre iubirea necondiționată a lui Dumnezeu pentru fiecare dintre noi.", thumbnailUrl: CHURCH_IMGS[1] },
  ];

  for (const s of sermonsRU) {
    await prisma.sermon.upsert({
      where: { id: `seed-sermon-ru-${s.title.slice(0, 10)}` },
      update: {},
      create: { id: `seed-sermon-ru-${s.title.slice(0, 10)}`, stream: "RU", isPublished: true, notesUrl: null, timestampSeconds: null, ...s },
    });
  }
  for (const s of sermonsRO) {
    await prisma.sermon.upsert({
      where: { id: `seed-sermon-ro-${s.title.slice(0, 10)}` },
      update: {},
      create: { id: `seed-sermon-ro-${s.title.slice(0, 10)}`, stream: "RO", isPublished: true, notesUrl: null, timestampSeconds: null, ...s },
    });
  }
  console.log(`✓ Sermons: ${sermonsRU.length} RU + ${sermonsRO.length} RO`);

  // ── Events ──────────────────────────────────────────────────────────────────
  const eventsRU = [
    { title: "День молодёжи", slug: "den-molodezhi-ru", eventDate: new Date("2025-06-15"), eventTimeLabel: "14:00 – 18:00", location: "Зал церкви", description: "Специальное молодёжное служение с играми, общением и прославлением.", imageUrl: CHURCH_IMGS[5], isFeatured: true },
    { title: "Летний лагерь", slug: "letniy-lager-ru", eventDate: new Date("2025-07-01"), eventTimeLabel: "Неделя", location: "База отдыха", description: "Ежегодный летний лагерь для детей и молодёжи.", imageUrl: CHURCH_IMGS[0], isFeatured: false },
  ];
  const eventsRO = [
    { title: "Ziua Tineretului", slug: "ziua-tineretului-ro", eventDate: new Date("2025-06-15"), eventTimeLabel: "14:00 – 18:00", location: "Sala bisericii", description: "Slujbă specială pentru tineri cu jocuri, părtășie și laudă.", imageUrl: CHURCH_IMGS[5], isFeatured: true },
    { title: "Tabăra de Vară", slug: "tabara-de-vara-ro", eventDate: new Date("2025-07-01"), eventTimeLabel: "O săptămână", location: "Tabăra", description: "Tabăra anuală de vară pentru copii și tineri.", imageUrl: CHURCH_IMGS[0], isFeatured: false },
  ];

  for (const e of eventsRU) {
    await prisma.event.upsert({
      where: { slug_stream: { slug: e.slug, stream: "RU" } },
      update: {},
      create: { stream: "RU", isPublished: true, ...e },
    });
  }
  for (const e of eventsRO) {
    await prisma.event.upsert({
      where: { slug_stream: { slug: e.slug, stream: "RO" } },
      update: {},
      create: { stream: "RO", isPublished: true, ...e },
    });
  }
  console.log(`✓ Events: ${eventsRU.length} RU + ${eventsRO.length} RO`);

  // ── News ────────────────────────────────────────────────────────────────────
  const newsRU = [
    { title: "Открытие новой детской комнаты", slug: "detskaya-komnata-ru", content: "Мы рады сообщить об открытии обновлённой детской комнаты в нашей церкви. Теперь у детей есть уютное пространство для занятий воскресной школой.", coverImageUrl: CHURCH_IMGS[0] },
    { title: "Благотворительная акция прошла успешно", slug: "blagotvoritelnaya-akciya-ru", content: "В прошлое воскресенье мы провели сбор средств для нуждающихся семей Бельц. Спасибо всем, кто принял участие!", coverImageUrl: CHURCH_IMGS[3] },
  ];
  const newsRO = [
    { title: "Deschiderea noii săli pentru copii", slug: "sala-copii-ro", content: "Suntem bucuroși să anunțăm deschiderea sălii renovate pentru copii în biserica noastră. Acum copiii au un spațiu confortabil pentru Școala Duminicală.", coverImageUrl: CHURCH_IMGS[0] },
    { title: "Acțiunea de caritate a avut succes", slug: "actiune-caritate-ro", content: "Duminica trecută am organizat o colectă pentru familiile nevoiașe din Bălți. Mulțumim tuturor celor care au participat!", coverImageUrl: CHURCH_IMGS[3] },
  ];

  for (const n of newsRU) {
    await prisma.newsPost.upsert({
      where: { slug_stream: { slug: n.slug, stream: "RU" } },
      update: {},
      create: { stream: "RU", isPublished: true, excerpt: n.content.slice(0, 120), ...n },
    });
  }
  for (const n of newsRO) {
    await prisma.newsPost.upsert({
      where: { slug_stream: { slug: n.slug, stream: "RO" } },
      update: {},
      create: { stream: "RO", isPublished: true, excerpt: n.content.slice(0, 120), ...n },
    });
  }
  console.log(`✓ News: ${newsRU.length} RU + ${newsRO.length} RO`);

  // ── Schedule ────────────────────────────────────────────────────────────────
  const scheduleRU = [
    { title: "Воскресное богослужение", weekday: "Sunday", startTime: "10:00", endTime: "12:00", location: "Главный зал", category: "Богослужение", displayOrder: 1 },
    { title: "Молодёжное служение", weekday: "Friday", startTime: "18:30", endTime: "20:30", location: "Зал №2", category: "Молодёжь", displayOrder: 2 },
    { title: "Библейское исследование", weekday: "Wednesday", startTime: "19:00", endTime: "20:30", location: "Малый зал", category: "Учение", displayOrder: 3 },
  ];
  const scheduleRO = [
    { title: "Slujba de Duminică", weekday: "Sunday", startTime: "10:00", endTime: "12:00", location: "Sala principală", category: "Slujbă", displayOrder: 1 },
    { title: "Serviciu pentru tineret", weekday: "Friday", startTime: "18:30", endTime: "20:30", location: "Sala nr.2", category: "Tineret", displayOrder: 2 },
    { title: "Studiu biblic", weekday: "Wednesday", startTime: "19:00", endTime: "20:30", location: "Sala mică", category: "Studiu", displayOrder: 3 },
  ];

  for (const s of scheduleRU) {
    await prisma.scheduleItem.upsert({
      where: { id: `seed-sched-ru-${s.weekday}` },
      update: {},
      create: { id: `seed-sched-ru-${s.weekday}`, stream: "RU", isActive: true, description: null, ...s, displayOrder: s.displayOrder },
    });
  }
  for (const s of scheduleRO) {
    await prisma.scheduleItem.upsert({
      where: { id: `seed-sched-ro-${s.weekday}` },
      update: {},
      create: { id: `seed-sched-ro-${s.weekday}`, stream: "RO", isActive: true, description: null, ...s, displayOrder: s.displayOrder },
    });
  }
  console.log(`✓ Schedule: ${scheduleRU.length} RU + ${scheduleRO.length} RO`);

  // ── Gallery ─────────────────────────────────────────────────────────────────
  const albumsRU = [
    { slug: "paskhalnoe-sluzhenie-ru", title: "Пасхальное служение 2025", description: "Фотографии с пасхального богослужения", albumDate: new Date("2025-04-20") },
    { slug: "molodezh-2025-ru", title: "Молодёжный лагерь 2024", description: "Воспоминания о летнем лагере", albumDate: new Date("2024-07-15") },
  ];
  const albumsRO = [
    { slug: "slujba-paste-ro", title: "Slujba de Paști 2025", description: "Fotografii de la slujba de Paști", albumDate: new Date("2025-04-20") },
    { slug: "tineret-2024-ro", title: "Tabăra de Tineret 2024", description: "Amintiri de la tabăra de vară", albumDate: new Date("2024-07-15") },
  ];

  const galleryItemUrls = [
    "https://images.unsplash.com/photo-1548625149-720754986716?w=600&q=75",
    "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=600&q=75",
    "https://images.unsplash.com/photo-1523242032760-8f72d46e82d9?w=600&q=75",
    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&q=75",
  ];

  for (const a of albumsRU) {
    const album = await prisma.galleryAlbum.upsert({
      where: { slug_stream: { slug: a.slug, stream: "RU" } },
      update: {},
      create: { stream: "RU", isPublished: true, coverImageUrl: galleryItemUrls[0], ...a },
    });
    // Add photos if album is new (no items yet)
    const count = await prisma.galleryItem.count({ where: { albumId: album.id } });
    if (count === 0) {
      for (let i = 0; i < galleryItemUrls.length; i++) {
        await prisma.galleryItem.create({
          data: { albumId: album.id, fileUrl: galleryItemUrls[i], displayOrder: i + 1 },
        });
      }
    }
  }
  for (const a of albumsRO) {
    const album = await prisma.galleryAlbum.upsert({
      where: { slug_stream: { slug: a.slug, stream: "RO" } },
      update: {},
      create: { stream: "RO", isPublished: true, coverImageUrl: galleryItemUrls[0], ...a },
    });
    const count = await prisma.galleryItem.count({ where: { albumId: album.id } });
    if (count === 0) {
      for (let i = 0; i < galleryItemUrls.length; i++) {
        await prisma.galleryItem.create({
          data: { albumId: album.id, fileUrl: galleryItemUrls[i], displayOrder: i + 1 },
        });
      }
    }
  }
  console.log(`✓ Gallery: ${albumsRU.length} RU albums + ${albumsRO.length} RO albums (4 photos each)`);

  // ── Static pages ─────────────────────────────────────────────────────────────
  const pagesRU = [
    { slug: "about", title: "О церкви", content: "Церковь Эммануил — христианская церковь в городе Бельцы, Молдова. Мы существуем с 1990 года и объединяем людей всех возрастов, ищущих Бога.\n\nНаша миссия — возвещать Евангелие, строить крепкое сообщество и служить нашему городу.\n\nМы верим в Библию как в Слово Божье, в спасение через веру в Иисуса Христа и в силу Святого Духа.", isPublished: true },
    { slug: "history", title: "История", content: "Церковь была основана в 1990 году небольшой группой верующих. За прошедшие годы она выросла в большую общину, объединяющую сотни семей.", isPublished: true },
  ];
  const pagesRO = [
    { slug: "about", title: "Despre noi", content: "Biserica Emanuel este o biserică creștină din orașul Bălți, Moldova. Existăm din 1990 și reunim oameni de toate vârstele care caută pe Dumnezeu.\n\nMisiunea noastră — să vestim Evanghelia, să construim o comunitate puternică și să slujim orașului nostru.\n\nCredem în Biblie ca Cuvântul lui Dumnezeu, în mântuirea prin credința în Isus Hristos și în puterea Duhului Sfânt.", isPublished: true },
    { slug: "history", title: "Istorie", content: "Biserica a fost fondată în 1990 de un grup mic de credincioși. De-a lungul anilor, ea a crescut într-o comunitate mare, care reunește sute de familii.", isPublished: true },
  ];

  for (const p of pagesRU) {
    await prisma.staticPage.upsert({
      where: { slug_stream: { slug: p.slug, stream: "RU" } },
      update: {},
      create: { stream: "RU", ...p },
    });
  }
  for (const p of pagesRO) {
    await prisma.staticPage.upsert({
      where: { slug_stream: { slug: p.slug, stream: "RO" } },
      update: {},
      create: { stream: "RO", ...p },
    });
  }
  console.log(`✓ Static pages: ${pagesRU.length} RU + ${pagesRO.length} RO`);

  console.log("\n✅ Seed complete!");
  console.log("   Admin login: admin@emmanuil.md / admin123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
