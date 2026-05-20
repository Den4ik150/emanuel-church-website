import Link from "next/link";
import { getAllEvents } from "@/server/queries/events";
import { DeleteEventButton } from "@/features/events/DeleteEventButton";

export default async function AdminEventsPage() {
  const events = await getAllEvents();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Мероприятия</h1>
        <Link
          href="/admin/events/new"
          className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
        >
          + Добавить
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
          Мероприятий пока нет
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Название
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Дата
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Место
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Статус
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {event.title}
                    {event.isFeatured && (
                      <span className="ml-2 inline-flex rounded-full bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold">
                        Главная
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {event.eventDate.toLocaleDateString("ru-RU")}
                    {event.eventTimeLabel && (
                      <span className="ml-1 text-gray-400">
                        {event.eventTimeLabel}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {event.location ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        event.isPublished
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {event.isPublished ? "Опубликовано" : "Черновик"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100"
                      >
                        Изменить
                      </Link>
                      <DeleteEventButton id={event.id} />
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
