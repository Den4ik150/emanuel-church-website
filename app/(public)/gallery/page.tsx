import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Image } from "lucide-react";

const albums = [
  { title: "Воскресное богослужение", date: "Май 2025", count: 24, category: "Богослужение" },
  { title: "Молодёжный лагерь 2024", date: "Июль 2024", count: 87, category: "Лагерь" },
  { title: "Семейный вечер", date: "Апрель 2025", count: 31, category: "Мероприятие" },
  { title: "Крещение", date: "Март 2025", count: 18, category: "Богослужение" },
  { title: "Рождественский концерт", date: "Декабрь 2024", count: 52, category: "Праздник" },
  { title: "День молодёжи", date: "Февраль 2025", count: 40, category: "Молодёжь" },
];

export default function GalleryPage() {
  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Воспоминания</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Галерея</h1>
            <p className="mt-2 text-gray-500">
              Фотоальбомы из жизни нашей церкви.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <div
                key={album.title}
                className="group cursor-pointer rounded-xl border border-gray-200 overflow-hidden hover:border-gold/40 transition-colors"
              >
                <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                  <Image className="h-8 w-8 text-gray-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>
                <div className="p-5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
                    {album.category}
                  </p>
                  <h3 className="font-semibold text-gray-900">{album.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {album.date} · {album.count} фото
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
