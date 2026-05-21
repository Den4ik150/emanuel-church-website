export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { getPublishedAlbumBySlug } from "@/server/queries/gallery";
import { getAlbumItems } from "@/server/queries/gallery-items";
import { getT, streamToLang } from "@/lib/translations";
import { isValidStream } from "@/lib/stream";
import { GalleryLightbox } from "./GalleryLightbox";

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ stream: string; slug: string }>;
}) {
  const { stream, slug } = await params;
  if (!isValidStream(stream)) notFound();

  const t = getT(streamToLang(stream));
  const album = await getPublishedAlbumBySlug(slug);
  if (!album) notFound();

  const items = await getAlbumItems(album.id);

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <Link
              href={`/${stream}/gallery`}
              className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.gallery.pageTitle}
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{album.title}</h1>
            {album.description && (
              <p className="mt-2 text-gray-500">{album.description}</p>
            )}
            <p className="mt-1 text-sm text-gray-400">{items.length} {t.gallery.photos}</p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          {items.length === 0 ? (
            <div className="py-16 text-center text-gray-400">{t.gallery.noAlbums}</div>
          ) : (
            <GalleryLightbox items={items} />
          )}
        </Container>
      </Section>
    </>
  );
}
