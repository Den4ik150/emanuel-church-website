export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
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
      <PageHero
        title={album.title}
        subtitle={album.description ?? `${items.length} ${t.gallery.photos}`}
        backHref={`/${stream}/gallery`}
        backLabel={t.gallery.pageTitle}
      />

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
