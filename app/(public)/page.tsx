import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { MapPin, Clock, Phone, Instagram, Send, Youtube, PlayCircle, Calendar } from "lucide-react";
import { getUpcomingEvents } from "@/server/queries/events";
import { getRecentSermons } from "@/server/queries/sermons";

function formatDate(date: Date) {
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function HomePage() {
  const [upcomingEvents, recentSermons] = await Promise.all([
    getUpcomingEvents(3),
    getRecentSermons(3),
  ]);

  const nextEvent = upcomingEvents[0] ?? null;

  return (
    <>
      {/* Hero */}
      <div className="bg-gray-900 text-white">
        <Container>
          <Section>
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gold">
                Церковь Эммануил · Бельцы
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Добро пожаловать
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-400">
                Место, где вы найдёте живую веру, настоящее общение и Слово
                Божье. Мы рады видеть вас среди нас.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="rounded-md bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
                >
                  О церкви
                </Link>
                <Link
                  href="/contacts"
                  className="rounded-md border border-gray-600 px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-gray-400 hover:text-white"
                >
                  Как нас найти
                </Link>
              </div>
            </div>
          </Section>
        </Container>
      </div>

      {/* Next Service / Next Event */}
      <div className="border-b border-gray-100 bg-white">
        <Container>
          <div className="py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  {nextEvent ? "Ближайшее мероприятие" : "Ближайшее богослужение"}
                </p>
                <p className="mt-1 text-xl font-bold text-gray-900">
                  {nextEvent
                    ? `${nextEvent.title} · ${formatDate(nextEvent.eventDate)}`
                    : "Воскресенье · 10:00"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4 text-gold" />
                <span>
                  {nextEvent?.location ?? "г. Бельцы, Молдова"}
                </span>
              </div>
              <Link
                href="/schedule"
                className="text-sm font-medium text-gold transition-colors hover:text-gold-dark"
              >
                Полное расписание →
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* About Preview */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                О нас
              </p>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Церковь Эммануил
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                Мы — христианская церковь в городе Бельцы, Молдова. Наш русский
                поток объединяет людей разных возрастов, которые ищут Бога и
                хотят жить по Его слову.
              </p>
              <p className="mb-6 leading-relaxed text-gray-600">
                Каждое воскресенье мы собираемся для совместного поклонения,
                изучения Библии и общения. Приходите — мы вас ждём.
              </p>
              <Link
                href="/about"
                className="text-sm font-semibold text-gold transition-colors hover:text-gold-dark"
              >
                Узнать больше →
              </Link>
            </div>
            <div className="flex aspect-video items-center justify-center rounded-xl bg-gray-100">
              <p className="text-sm text-gray-400">Фото церкви</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Upcoming Events */}
      <div className="bg-gray-50">
        <Section>
          <Container>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
                  Мероприятия
                </p>
                <h2 className="text-2xl font-bold text-gray-900">
                  Ближайшие события
                </h2>
              </div>
              <Link
                href="/events"
                className="text-sm font-medium text-gold transition-colors hover:text-gold-dark"
              >
                Все события →
              </Link>
            </div>

            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-gray-400">
                В ближайшее время мероприятий не запланировано
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                  >
                    {event.isFeatured && (
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                        Важное
                      </p>
                    )}
                    <h3 className="mb-3 font-semibold text-gray-900">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 text-gold" />
                      <span>
                        {formatDate(event.eventDate)}
                        {event.eventTimeLabel && ` · ${event.eventTimeLabel}`}
                      </span>
                    </div>
                    {event.location && (
                      <div className="mt-1.5 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 text-gold" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Container>
        </Section>
      </div>

      {/* Recent Sermons */}
      <Section>
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
                Проповеди
              </p>
              <h2 className="text-2xl font-bold text-gray-900">
                Последние проповеди
              </h2>
            </div>
            <Link
              href="/sermons"
              className="text-sm font-medium text-gold transition-colors hover:text-gold-dark"
            >
              Все проповеди →
            </Link>
          </div>

          {recentSermons.length === 0 ? (
            <p className="text-sm text-gray-400">
              Проповеди скоро появятся
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {recentSermons.map((sermon) => (
                <a
                  key={sermon.id}
                  href={sermon.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-gray-200 p-6 transition-colors hover:border-gold/40"
                >
                  <div className="mb-3 flex aspect-video items-center justify-center rounded-lg bg-gray-100">
                    {sermon.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sermon.thumbnailUrl}
                        alt={sermon.title}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    ) : (
                      <PlayCircle className="h-8 w-8 text-gray-300 group-hover:text-gold transition-colors" />
                    )}
                  </div>
                  {sermon.topic && (
                    <p className="mb-1 text-xs font-medium uppercase tracking-widest text-gold">
                      {sermon.topic}
                    </p>
                  )}
                  <h3 className="mb-1 font-semibold text-gray-900">
                    {sermon.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {sermon.preacher} · {formatDate(sermon.sermonDate)}
                  </p>
                </a>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Contacts strip */}
      <div className="bg-gray-900 text-white">
        <Container>
          <div className="py-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-white">Адрес</p>
                  <p className="text-sm text-gray-400">г. Бельцы, Молдова</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-white">Телефон</p>
                  <p className="text-sm text-gray-400">+373 — — — — — —</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Telegram"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <Send className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
