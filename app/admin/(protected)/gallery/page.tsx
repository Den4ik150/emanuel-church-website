import Link from "next/link";
import { Images } from "lucide-react";
import { getAllAlbums } from "@/server/queries/gallery";
import { getAdminStream } from "@/lib/admin-stream";
import { getAdminT } from "@/lib/translations/admin";
import { StreamBadge } from "@/components/admin/StreamBadge";
import { LockedEditLink } from "@/components/admin/LockedEditLink";
import { LockedDeleteButton } from "@/components/admin/LockedDeleteButton";
import { deleteAlbum } from "@/server/actions/gallery";

export default async function AdminGalleryPage() {
  const adminStream = await getAdminStream();
  const t = getAdminT(adminStream);
  const albums = await getAllAlbums(adminStream);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{t.gallery.heading}</h1>
          {adminStream && <StreamBadge stream={adminStream} />}
        </div>
        <Link href="/admin/gallery/new" className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-dark">
          {t.common.add}
        </Link>
      </div>

      {albums.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
          {t.gallery.empty}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {!adminStream && <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.stream}</th>}
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.title}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.date}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.gallery.colPhotos}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.status}</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {albums.map((album) => (
                <tr key={album.id} className="hover:bg-gray-50">
                  {!adminStream && <td className="px-4 py-3"><StreamBadge stream={album.stream} /></td>}
                  <td className="px-4 py-3 font-medium text-gray-900">{album.title}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {album.albumDate ? album.albumDate.toLocaleDateString(t.common.locale) : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{album._count.items}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${album.isPublished ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {album.isPublished ? t.common.published : t.common.draft}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/gallery/${album.id}/items`}
                        className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold/10"
                      >
                        <Images className="h-3.5 w-3.5" />
                        {t.gallery.colPhotos}
                      </Link>
                      <LockedEditLink href={`/admin/gallery/${album.id}/edit`} itemStream={album.stream} adminStream={adminStream} label={t.common.edit} />
                      <LockedDeleteButton itemStream={album.stream} adminStream={adminStream} deleteAction={deleteAlbum.bind(null, album.id)} confirmText={t.gallery.confirmDelete} label={t.common.delete} />
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
