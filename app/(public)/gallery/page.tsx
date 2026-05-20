import { ImageIcon } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { getPublishedAlbums } from "@/server/queries/gallery";

function formatDate(date: Date | null) {
  if (!date) return null;
  return date.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
}

export default async function GalleryPage() {
  const albums = await getPublishedAlbums();

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
              Воспоминания
            </p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Галерея
            </h1>
            <p className="mt-2 text-gray-500">
              Фотоальбомы из жизни нашей церкви.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          {albums.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              Альбомов пока нет
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="group cursor-pointer rounded-xl border border-gray-200 overflow-hidden hover:border-gold/40 transition-colors"
                >
                  <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                    {album.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={album.coverImageUrl}
                        alt={album.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-gray-300" />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900">
                      {album.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {[
                        formatDate(album.albumDate),
                        album._count.items > 0
                          ? `${album._count.items} фото`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
