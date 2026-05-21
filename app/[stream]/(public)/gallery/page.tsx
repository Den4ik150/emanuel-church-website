export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { getPublishedAlbums } from "@/server/queries/gallery";
import { getT, streamToLang } from "@/lib/translations";
import { toStreamEnum, isValidStream } from "@/lib/stream";

function formatDate(date: Date | null, locale: string) {
  if (!date) return null;
  return date.toLocaleDateString(locale, { month: "long", year: "numeric" });
}

export default async function GalleryPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();
  const t = getT(streamToLang(stream));
  const albums = await getPublishedAlbums(toStreamEnum(stream));

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t.gallery.pageTitle}</h1>
            <p className="mt-2 text-gray-500">{t.gallery.pageSubtitle}</p>
          </div>
        </Container>
      </div>
      <Section>
        <Container>
          {albums.length === 0 ? (
            <div className="py-16 text-center text-gray-400">{t.gallery.noAlbums}</div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 transition-colors hover:border-gold/40"
                >
                  <div className="relative flex aspect-video items-center justify-center bg-gray-100">
                    {album.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={album.coverImageUrl} alt={album.title} className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-gray-300" />
                    )}
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900">{album.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {[
                        formatDate(album.albumDate, t.stream.locale),
                        album._count.items > 0 ? `${album._count.items} ${t.gallery.photos}` : null,
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
