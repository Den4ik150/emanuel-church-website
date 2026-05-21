import Link from "next/link";
import { getAllScheduleItems } from "@/server/queries/schedule";
import { getAdminStream } from "@/lib/admin-stream";
import { getAdminT } from "@/lib/translations/admin";
import { StreamBadge } from "@/components/admin/StreamBadge";
import { LockedEditLink } from "@/components/admin/LockedEditLink";
import { LockedDeleteButton } from "@/components/admin/LockedDeleteButton";
import { deleteScheduleItem } from "@/server/actions/schedule";

export default async function AdminSchedulePage() {
  const adminStream = await getAdminStream();
  const t = getAdminT(adminStream);
  const items = await getAllScheduleItems(adminStream);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{t.schedule.heading}</h1>
          {adminStream && <StreamBadge stream={adminStream} />}
        </div>
        <Link href="/admin/schedule/new" className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-dark">
          {t.common.add}
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
          {t.schedule.empty}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {!adminStream && <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.stream}</th>}
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.title}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.schedule.colDay}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.schedule.colTime}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.schedule.colLocation}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.status}</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {!adminStream && <td className="px-4 py-3"><StreamBadge stream={item.stream} /></td>}
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.title}
                    {item.category && <span className="ml-2 text-xs text-gray-400">{item.category}</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.weekday}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {item.startTime}{item.endTime && <span className="text-gray-400"> – {item.endTime}</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.location ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${item.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {item.isActive ? t.schedule.active : t.schedule.hidden}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <LockedEditLink href={`/admin/schedule/${item.id}/edit`} itemStream={item.stream} adminStream={adminStream} label={t.common.edit} />
                      <LockedDeleteButton itemStream={item.stream} adminStream={adminStream} deleteAction={deleteScheduleItem.bind(null, item.id)} confirmText={t.schedule.confirmDelete} label={t.common.delete} />
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
