export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { MapPin, Phone, PlayCircle, Calendar } from "lucide-react";
import { getUpcomingEvents } from "@/server/queries/events";
import { getRecentSermons } from "@/server/queries/sermons";
import { getT, streamToLang } from "@/lib/translations";
import { toStreamEnum, isValidStream } from "@/lib/stream";

function formatDate(date: Date, locale: string) {
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ stream: string }>;
}) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();

  const t = getT(streamToLang(stream));
  const streamEnum = toStreamEnum(stream);

  const [upcomingEvents, recentSermons] = await Promise.all([
    getUpcomingEvents(streamEnum, 3),
    getRecentSermons(streamEnum, 3),
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
                {t.home.subtitle}
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {t.home.title}
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-400">
                {t.home.heroText}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${stream}/about`}
                  className="rounded-md bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
                >
                  {t.home.btnAbout}
                </Link>
                <Link
                  href={`/${stream}/contacts`}
                  className="rounded-md border border-gray-600 px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-gray-400 hover:text-white"
                >
                  {t.home.btnHowToFind}
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
                  {nextEvent ? t.home.nextEventLabel : t.home.nextServiceLabel}
                </p>
                <p className="mt-1 text-xl font-bold text-gray-900">
                  {nextEvent
                    ? `${nextEvent.title} · ${formatDate(nextEvent.eventDate, t.stream.locale)}`
                    : t.home.defaultService}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4 text-gold" />
                <span>{nextEvent?.location ?? "Bălți, Moldova"}</span>
              </div>
              <Link
                href={`/${stream}/schedule`}
                className="text-sm font-medium text-gold transition-colors hover:text-gold-dark"
              >
                {t.home.scheduleLink}
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
                {t.home.aboutLabel}
              </p>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                {t.home.churchName}
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">{t.home.aboutText1}</p>
              <p className="mb-6 leading-relaxed text-gray-600">{t.home.aboutText2}</p>
              <Link
                href={`/${stream}/about`}
                className="text-sm font-semibold text-gold transition-colors hover:text-gold-dark"
              >
                {t.home.learnMore}
              </Link>
            </div>
            <div className="flex aspect-video items-center justify-center rounded-xl bg-gray-100">
              <p className="text-sm text-gray-400">{t.home.churchPhoto}</p>
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
                  {t.home.eventsLabel}
                </p>
                <h2 className="text-2xl font-bold text-gray-900">{t.home.eventsTitle}</h2>
              </div>
              <Link
                href={`/${stream}/events`}
                className="text-sm font-medium text-gold transition-colors hover:text-gold-dark"
              >
                {t.home.eventsAllLink}
              </Link>
            </div>

            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-gray-400">{t.home.noEvents}</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                  >
                    {event.isFeatured && (
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                        {t.home.featured}
                      </p>
                    )}
                    <h3 className="mb-3 font-semibold text-gray-900">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 text-gold" />
                      <span>
                        {formatDate(event.eventDate, t.stream.locale)}
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
                {t.home.sermonsLabel}
              </p>
              <h2 className="text-2xl font-bold text-gray-900">{t.home.sermonsTitle}</h2>
            </div>
            <Link
              href={`/${stream}/sermons`}
              className="text-sm font-medium text-gold transition-colors hover:text-gold-dark"
            >
              {t.home.sermonsAllLink}
            </Link>
          </div>

          {recentSermons.length === 0 ? (
            <p className="text-sm text-gray-400">{t.home.noSermons}</p>
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
                      <PlayCircle className="h-8 w-8 text-gray-300 transition-colors group-hover:text-gold" />
                    )}
                  </div>
                  {sermon.topic && (
                    <p className="mb-1 text-xs font-medium uppercase tracking-widest text-gold">
                      {sermon.topic}
                    </p>
                  )}
                  <h3 className="mb-1 font-semibold text-gray-900">{sermon.title}</h3>
                  <p className="text-sm text-gray-500">
                    {sermon.preacher} · {formatDate(sermon.sermonDate, t.stream.locale)}
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
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-white">{t.home.address}</p>
                  <p className="text-sm text-gray-400">Bălți, Moldova</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-white">{t.home.phone}</p>
                  <p className="text-sm text-gray-400">+373 — — — — — —</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
