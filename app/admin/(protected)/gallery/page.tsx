import Link from "next/link";
import { getAllAlbums } from "@/server/queries/gallery";
import { getAdminStream } from "@/lib/admin-stream";
import { StreamBadge } from "@/components/admin/StreamBadge";
import { LockedEditLink } from "@/components/admin/LockedEditLink";
import { LockedDeleteButton } from "@/components/admin/LockedDeleteButton";
import { deleteAlbum } from "@/server/actions/gallery";

export default async function AdminGalleryPage() {
  const adminStream = await getAdminStream();
  const albums = await getAllAlbums(adminStream);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Галерея</h1>
          {adminStream && <StreamBadge stream={adminStream} />}
        </div>
        <Link href="/admin/gallery/new" className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-dark">
          + Создать альбом
        </Link>
      </div>

      {albums.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">Альбомов пока нет</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {!adminStream && <th className="px-4 py-3 text-left font-medium text-gray-600">Поток</th>}
                <th className="px-4 py-3 text-left font-medium text-gray-600">Название</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Дата</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Фото</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Статус</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {albums.map((album) => (
                <tr key={album.id} className="hover:bg-gray-50">
                  {!adminStream && <td className="px-4 py-3"><StreamBadge stream={album.stream} /></td>}
                  <td className="px-4 py-3 font-medium text-gray-900">{album.title}</td>
                  <td className="px-4 py-3 text-gray-600">{album.albumDate ? album.albumDate.toLocaleDateString("ru-RU") : "—"}</td>
                  <td className="px-4 py-3 text-gray-600">{album._count.items}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${album.isPublished ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {album.isPublished ? "Опубликовано" : "Черновик"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <LockedEditLink href={`/admin/gallery/${album.id}/edit`} itemStream={album.stream} adminStream={adminStream} />
                      <LockedDeleteButton itemStream={album.stream} adminStream={adminStream} deleteAction={deleteAlbum.bind(null, album.id)} confirmText="Удалить этот альбом?" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
