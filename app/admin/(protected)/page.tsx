import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminStream } from "@/lib/admin-stream";
import { StreamBadge } from "@/components/admin/StreamBadge";
import {
  BookOpen,
  Calendar,
  Newspaper,
  Clock,
  Images,
  FileText,
  MessageSquare,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import type { Stream } from "@/lib/generated/prisma/client";

async function getStats(stream: Stream | null) {
  const where = stream ? { stream } : undefined;

  const [sermons, events, news, schedule, albums, pages, contacts, prayers] =
    await Promise.all([
      prisma.sermon.count({ where }),
      prisma.event.count({ where }),
      prisma.newsPost.count({ where }),
      prisma.scheduleItem.count({ where }),
      prisma.galleryAlbum.count({ where }),
      prisma.staticPage.count({ where }),
      prisma.contactSubmission.count({ where }),
      prisma.prayerRequest.count({ where }),
    ]);

  return { sermons, events, news, schedule, albums, pages, contacts, prayers };
}

async function getRecentActivity(stream: Stream | null) {
  const where = stream ? { stream } : undefined;

  const [recentSermons, recentEvents, recentNews] = await Promise.all([
    prisma.sermon.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, title: true, preacher: true, createdAt: true, stream: true },
    }),
    prisma.event.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, title: true, eventDate: true, createdAt: true, stream: true },
    }),
    prisma.newsPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, title: true, createdAt: true, stream: true },
    }),
  ]);

  return { recentSermons, recentEvents, recentNews };
}

const sections = [
  { label: "Проповеди", href: "/admin/sermons", icon: BookOpen, key: "sermons" as const, color: "bg-purple-50 text-purple-600" },
  { label: "Мероприятия", href: "/admin/events", icon: Calendar, key: "events" as const, color: "bg-blue-50 text-blue-600" },
  { label: "Новости", href: "/admin/news", icon: Newspaper, key: "news" as const, color: "bg-green-50 text-green-600" },
  { label: "Расписание", href: "/admin/schedule", icon: Clock, key: "schedule" as const, color: "bg-orange-50 text-orange-600" },
  { label: "Галерея", href: "/admin/gallery", icon: Images, key: "albums" as const, color: "bg-pink-50 text-pink-600" },
  { label: "Страницы", href: "/admin/pages", icon: FileText, key: "pages" as const, color: "bg-gray-100 text-gray-600" },
  { label: "Обращения", href: "/admin/submissions", icon: MessageSquare, key: "contacts" as const, color: "bg-amber-50 text-amber-600" },
];

function formatDate(date: Date) {
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}

export default async function AdminDashboardPage() {
  const adminStream = await getAdminStream();
  const [stats, activity] = await Promise.all([
    getStats(adminStream),
    getRecentActivity(adminStream),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {adminStream
              ? `Показывается поток ${adminStream}`
              : "Все потоки — RO и RU"}
          </p>
        </div>
        {adminStream && <StreamBadge stream={adminStream} />}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {sections.map((s) => (
          <Link
            key={s.key}
            href={s.href}
            className="group flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2 ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <ChevronRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-gold" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats[s.key]}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          </Link>
        ))}

        {/* Prayer requests card */}
        <Link
          href="/admin/submissions"
          className="group flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-rose-50 p-2 text-rose-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <ChevronRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-gold" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats.prayers}</p>
            <p className="text-sm text-gray-500">Молитв. просьбы</p>
          </div>
        </Link>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent sermons */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-700">Последние проповеди</h2>
            <Link href="/admin/sermons" className="text-xs text-gold hover:text-gold-dark">
              Все →
            </Link>
          </div>
          <ul className="divide-y divide-gray-50">
            {activity.recentSermons.length === 0 ? (
              <li className="px-5 py-4 text-sm text-gray-400">Нет записей</li>
            ) : (
              activity.recentSermons.map((s) => (
                <li key={s.id} className="flex items-start gap-3 px-5 py-3">
                  <div className="mt-0.5 rounded bg-purple-50 p-1">
                    <BookOpen className="h-3.5 w-3.5 text-purple-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{s.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-400">{s.preacher}</p>
                      {!adminStream && <StreamBadge stream={s.stream} />}
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-gray-400">{formatDate(s.createdAt)}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Recent events */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-700">Ближайшие мероприятия</h2>
            <Link href="/admin/events" className="text-xs text-gold hover:text-gold-dark">
              Все →
            </Link>
          </div>
          <ul className="divide-y divide-gray-50">
            {activity.recentEvents.length === 0 ? (
              <li className="px-5 py-4 text-sm text-gray-400">Нет записей</li>
            ) : (
              activity.recentEvents.map((e) => (
                <li key={e.id} className="flex items-start gap-3 px-5 py-3">
                  <div className="mt-0.5 rounded bg-blue-50 p-1">
                    <Calendar className="h-3.5 w-3.5 text-blue-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{e.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-400">{formatDate(e.eventDate)}</p>
                      {!adminStream && <StreamBadge stream={e.stream} />}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Recent news */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-700">Последние новости</h2>
            <Link href="/admin/news" className="text-xs text-gold hover:text-gold-dark">
              Все →
            </Link>
          </div>
          <ul className="divide-y divide-gray-50">
            {activity.recentNews.length === 0 ? (
              <li className="px-5 py-4 text-sm text-gray-400">Нет записей</li>
            ) : (
              activity.recentNews.map((n) => (
                <li key={n.id} className="flex items-start gap-3 px-5 py-3">
                  <div className="mt-0.5 rounded bg-green-50 p-1">
                    <Newspaper className="h-3.5 w-3.5 text-green-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{n.title}</p>
                    {!adminStream && (
                      <div className="mt-0.5">
                        <StreamBadge stream={n.stream} />
                      </div>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-gray-400">{formatDate(n.createdAt)}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
