import Link from "next/link";
import { getAllScheduleItems } from "@/server/queries/schedule";
import { DeleteScheduleButton } from "@/features/schedule/DeleteScheduleButton";

export default async function AdminSchedulePage() {
  const items = await getAllScheduleItems();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Расписание</h1>
        <Link
          href="/admin/schedule/new"
          className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
        >
          + Добавить
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
          Расписания пока нет
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
                  День
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Время
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
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.title}
                    {item.category && (
                      <span className="ml-2 text-xs text-gray-400">
                        {item.category}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.weekday}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {item.startTime}
                    {item.endTime && (
                      <span className="text-gray-400"> – {item.endTime}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {item.location ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.isActive ? "Активно" : "Скрыто"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/schedule/${item.id}/edit`}
                        className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100"
                      >
                        Изменить
                      </Link>
                      <DeleteScheduleButton id={item.id} />
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
