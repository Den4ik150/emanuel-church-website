export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
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
      <PageHero title={t.gallery.pageTitle} subtitle={t.gallery.pageSubtitle} />
      <Section>
        <Container>
          {albums.length === 0 ? (
            <div className="py-16 text-center text-gray-400">{t.gallery.noAlbums}</div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <Link
                  key={album.id}
                  href={`/${stream}/gallery/${album.slug}`}
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
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
