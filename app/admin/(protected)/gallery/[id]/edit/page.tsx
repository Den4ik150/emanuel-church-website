import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getAlbumById } from "@/server/queries/gallery";
import { GalleryAlbumForm } from "@/features/gallery/GalleryAlbumForm";

interface EditAlbumPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAlbumPage({ params }: EditAlbumPageProps) {
  const { id } = await params;
  const album = await getAlbumById(id);

  if (!album) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/gallery"
          className="mb-3 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Назад к списку
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Редактировать альбом
        </h1>
      </div>

      <div className="max-w-2xl rounded-xl border border-gray-200 bg-white p-6">
        <GalleryAlbumForm initialData={album} />
      </div>
    </div>
  );
}
