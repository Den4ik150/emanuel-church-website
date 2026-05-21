import Link from "next/link";
import { getAllPages } from "@/server/queries/pages";
import { getAdminStream } from "@/lib/admin-stream";
import { getAdminT } from "@/lib/translations/admin";
import { StreamBadge } from "@/components/admin/StreamBadge";
import { LockedEditLink } from "@/components/admin/LockedEditLink";
import { LockedDeleteButton } from "@/components/admin/LockedDeleteButton";
import { deletePage } from "@/server/actions/pages";

export default async function AdminPagesPage() {
  const adminStream = await getAdminStream();
  const t = getAdminT(adminStream);
  const pages = await getAllPages(adminStream);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{t.pages.heading}</h1>
          {adminStream && <StreamBadge stream={adminStream} />}
        </div>
        <Link href="/admin/pages/new" className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-dark">
          {t.common.add}
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
          {t.pages.empty}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {!adminStream && <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.stream}</th>}
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.title}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.pages.colSlug}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.status}</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  {!adminStream && <td className="px-4 py-3"><StreamBadge stream={page.stream} /></td>}
                  <td className="px-4 py-3 font-medium text-gray-900">{page.title}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">/{page.slug}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${page.isPublished ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {page.isPublished ? t.common.published : t.common.draft}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <LockedEditLink href={`/admin/pages/${page.id}/edit`} itemStream={page.stream} adminStream={adminStream} label={t.common.edit} />
                      <LockedDeleteButton itemStream={page.stream} adminStream={adminStream} deleteAction={deletePage.bind(null, page.id)} confirmText={t.pages.confirmDelete} label={t.common.delete} />
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
