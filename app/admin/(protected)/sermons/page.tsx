import Link from "next/link";
import { getAllSermons } from "@/server/queries/sermons";
import { getAdminStream } from "@/lib/admin-stream";
import { getAdminT } from "@/lib/translations/admin";
import { StreamBadge } from "@/components/admin/StreamBadge";
import { LockedEditLink } from "@/components/admin/LockedEditLink";
import { LockedDeleteButton } from "@/components/admin/LockedDeleteButton";
import { deleteSermon } from "@/server/actions/sermons";

export default async function AdminSermonsPage() {
  const adminStream = await getAdminStream();
  const t = getAdminT(adminStream);
  const sermons = await getAllSermons(adminStream);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{t.sermons.heading}</h1>
          {adminStream && <StreamBadge stream={adminStream} />}
        </div>
        <Link
          href="/admin/sermons/new"
          className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
        >
          {t.common.add}
        </Link>
      </div>

      {sermons.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
          {t.sermons.empty}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {!adminStream && (
                  <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.stream}</th>
                )}
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.title}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.sermons.colPreacher}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.date}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.status}</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sermons.map((sermon) => (
                <tr key={sermon.id} className="hover:bg-gray-50">
                  {!adminStream && (
                    <td className="px-4 py-3">
                      <StreamBadge stream={sermon.stream} />
                    </td>
                  )}
                  <td className="px-4 py-3 font-medium text-gray-900">{sermon.title}</td>
                  <td className="px-4 py-3 text-gray-600">{sermon.preacher}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {sermon.sermonDate.toLocaleDateString(t.common.locale)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      sermon.isPublished ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {sermon.isPublished ? t.common.published : t.common.draft}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <LockedEditLink
                        href={`/admin/sermons/${sermon.id}/edit`}
                        itemStream={sermon.stream}
                        adminStream={adminStream}
                        label={t.common.edit}
                      />
                      <LockedDeleteButton
                        itemStream={sermon.stream}
                        adminStream={adminStream}
                        deleteAction={deleteSermon.bind(null, sermon.id)}
                        confirmText={t.sermons.confirmDelete}
                        label={t.common.delete}
                      />
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
