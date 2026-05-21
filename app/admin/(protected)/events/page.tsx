import Link from "next/link";
import { getAllEvents } from "@/server/queries/events";
import { getAdminStream } from "@/lib/admin-stream";
import { getAdminT } from "@/lib/translations/admin";
import { StreamBadge } from "@/components/admin/StreamBadge";
import { LockedEditLink } from "@/components/admin/LockedEditLink";
import { LockedDeleteButton } from "@/components/admin/LockedDeleteButton";
import { deleteEvent } from "@/server/actions/events";

export default async function AdminEventsPage() {
  const adminStream = await getAdminStream();
  const t = getAdminT(adminStream);
  const events = await getAllEvents(adminStream);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{t.events.heading}</h1>
          {adminStream && <StreamBadge stream={adminStream} />}
        </div>
        <Link href="/admin/events/new" className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-dark">
          {t.common.add}
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
          {t.events.empty}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {!adminStream && <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.stream}</th>}
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.title}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.date}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.events.colLocation}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t.common.status}</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  {!adminStream && <td className="px-4 py-3"><StreamBadge stream={event.stream} /></td>}
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {event.title}
                    {event.isFeatured && (
                      <span className="ml-2 inline-flex rounded-full bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold">
                        {t.events.colFeatured}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {event.eventDate.toLocaleDateString(t.common.locale)}
                    {event.eventTimeLabel && <span className="ml-1 text-gray-400">{event.eventTimeLabel}</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{event.location ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${event.isPublished ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {event.isPublished ? t.common.published : t.common.draft}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <LockedEditLink href={`/admin/events/${event.id}/edit`} itemStream={event.stream} adminStream={adminStream} label={t.common.edit} />
                      <LockedDeleteButton itemStream={event.stream} adminStream={adminStream} deleteAction={deleteEvent.bind(null, event.id)} confirmText={t.events.confirmDelete} label={t.common.delete} />
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
