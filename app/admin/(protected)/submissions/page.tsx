import Link from "next/link";
import { getAllContactSubmissions, getAllPrayerRequests } from "@/server/queries/submissions";
import type { Stream } from "@/lib/generated/prisma/client";

function StreamBadge({ stream }: { stream: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        stream === "RO"
          ? "bg-blue-50 text-blue-700"
          : "bg-emerald-50 text-emerald-700"
      }`}
    >
      {stream === "RO" ? "🇷🇴 RO" : "🇷🇺 RU"}
    </span>
  );
}

interface Props {
  searchParams: Promise<{ stream?: string }>;
}

export default async function AdminSubmissionsPage({ searchParams }: Props) {
  const { stream: streamParam } = await searchParams;
  const activeStream: Stream | undefined =
    streamParam === "RO" ? "RO" : streamParam === "RU" ? "RU" : undefined;

  const [contacts, prayers] = await Promise.all([
    getAllContactSubmissions(activeStream),
    getAllPrayerRequests(activeStream),
  ]);

  const tabClass = (s: string) =>
    `px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
      (streamParam ?? "") === s
        ? "bg-gold text-white shadow-sm"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Обращения</h1>
        {/* Stream filter tabs */}
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
          <Link href="/admin/submissions" className={tabClass("")}>
            Все потоки
          </Link>
          <Link href="/admin/submissions?stream=RO" className={tabClass("RO")}>
            🇷🇴 Румынский
          </Link>
          <Link href="/admin/submissions?stream=RU" className={tabClass("RU")}>
            🇷🇺 Русский
          </Link>
        </div>
      </div>

      {/* Contact Submissions */}
      <section>
        <h2 className="mb-3 text-base font-semibold text-gray-700">
          Контактные формы ({contacts.length})
        </h2>
        {contacts.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            Обращений нет
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Поток</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Имя</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Телефон</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Сообщение</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Дата</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <StreamBadge stream={c.stream} />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="px-4 py-3 text-gray-600">{c.email}</td>
                    <td className="px-4 py-3 text-gray-600">{c.phone ?? "—"}</td>
                    <td className="max-w-xs px-4 py-3 text-gray-600">
                      <p className="truncate">{c.message}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {c.createdAt.toLocaleDateString("ru-RU")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Prayer Requests */}
      <section>
        <h2 className="mb-3 text-base font-semibold text-gray-700">
          Молитвенные просьбы ({prayers.length})
        </h2>
        {prayers.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            Просьб нет
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Поток</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Имя</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Просьба</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Приватно</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Дата</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {prayers.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <StreamBadge stream={p.stream} />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-gray-600">{p.email ?? "—"}</td>
                    <td className="max-w-xs px-4 py-3 text-gray-600">
                      <p className="truncate">{p.message}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          p.isPrivate
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {p.isPrivate ? "Да" : "Нет"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {p.createdAt.toLocaleDateString("ru-RU")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
