import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getAlbumById } from "@/server/queries/gallery";
import { getAlbumItems } from "@/server/queries/gallery-items";
import { getAdminStream } from "@/lib/admin-stream";
import { getAdminT } from "@/lib/translations/admin";
import { GalleryItemsManager } from "@/features/gallery/GalleryItemsManager";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AlbumItemsPage({ params }: Props) {
  const { id } = await params;
  const [album, items] = await Promise.all([
    getAlbumById(id),
    getAlbumItems(id),
  ]);

  if (!album) notFound();

  const adminStream = await getAdminStream();
  const t = getAdminT(adminStream);

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/gallery"
          className="mb-3 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
          {t.gallery.heading}
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{album.title}</h1>
        <p className="mt-1 text-sm text-gray-400">
          {items.length} {t.gallery.colPhotos.toLowerCase()}
        </p>
      </div>

      <GalleryItemsManager albumId={id} initialItems={items} />
    </div>
  );
}
