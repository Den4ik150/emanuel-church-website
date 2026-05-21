export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { MapPin, Clock, PlayCircle, Calendar, ArrowRight } from "lucide-react";
import { getUpcomingEvents } from "@/server/queries/events";
import { getYouTubeVideos, YOUTUBE_CHANNEL_URLS } from "@/lib/youtube";
import { getT, streamToLang } from "@/lib/translations";
import { toStreamEnum, isValidStream } from "@/lib/stream";

const HERO_IMAGE =
  "https://res.cloudinary.com/dcml2gd8n/image/upload/v1779380572/emmanuil-church/hero/church-exterior.jpg";

const PASTOR_IMAGES: Record<string, string> = {
  ro: "https://res.cloudinary.com/dcml2gd8n/image/upload/v1779372223/emmanuil-church/people/pastor-ro.jpg",
  ru: "https://res.cloudinary.com/dcml2gd8n/image/upload/v1779380575/emmanuil-church/people/pastor-ru.jpg",
};

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
    getYouTubeVideos(stream, 3),
  ]);

  const nextEvent = upcomingEvents[0] ?? null;
  const pastorPhoto = PASTOR_IMAGES[stream] ?? "";

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <div className="relative min-h-[92vh] flex flex-col">
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt="Церковь Эммануил"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[35%_50%] sm:object-center"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-1 items-center">
          <Container>
            <div className="max-w-2xl py-24">
              {/* Gold pill badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                  {t.home.subtitle}
                </span>
              </div>

              <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                {t.home.title}
              </h1>

              <p className="mb-10 text-lg leading-relaxed text-white/70 sm:text-xl">
                {t.home.heroText}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${stream}/about`}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gold/25 transition-all hover:bg-gold-dark hover:shadow-gold/40"
                >
                  {t.home.btnAbout}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/${stream}/contacts`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  {t.home.btnHowToFind}
                </Link>
              </div>
            </div>
          </Container>
        </div>

        {/* Floating service strip */}
        <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
          <Container>
            <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20">
                  <Clock className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold/80">
                    {nextEvent ? t.home.nextEventLabel : t.home.nextServiceLabel}
                  </p>
                  <p className="text-sm font-medium text-white">
                    {nextEvent
                      ? `${nextEvent.title} · ${formatDate(nextEvent.eventDate, t.stream.locale)}`
                      : t.home.defaultService}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-gold" />
                <span>{nextEvent?.location ?? "Strada Pușkin 77, Bălți"}</span>
              </div>
              <Link
                href={`/${stream}/schedule`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-gold-dark"
              >
                {t.home.scheduleLink}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Container>
        </div>
      </div>

      {/* ─── ABOUT ────────────────────────────────────────────────── */}
      <div className="bg-[#F7F5F0]">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 py-24 lg:grid-cols-2">
            {/* Text */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
                {t.home.aboutLabel}
              </p>
              <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900">
                {t.home.churchName}
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">{t.home.aboutText1}</p>
              <p className="mb-8 leading-relaxed text-gray-600">{t.home.aboutText2}</p>
              <Link
                href={`/${stream}/about`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-dark"
              >
                {t.home.learnMore}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Pastor photo */}
            <div className="relative">
              {/* Decorative gold block behind */}
              <div className="absolute -right-4 -top-4 h-3/4 w-3/4 rounded-2xl bg-gold/15" />
              <div className="absolute -bottom-4 -left-4 h-1/3 w-1/3 rounded-2xl bg-gold/10" />

              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                {pastorPhoto ? (
                  <Image
                    src={pastorPhoto}
                    alt="Пастор"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200">
                    <p className="text-sm text-gray-400">{t.home.churchPhoto}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ─── EVENTS ───────────────────────────────────────────────── */}
      <div className="bg-[#1A1A2E]">
        <Container>
          <div className="py-24">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  {t.home.eventsLabel}
                </p>
                <h2 className="text-3xl font-bold text-white">{t.home.eventsTitle}</h2>
              </div>
              <Link
                href={`/${stream}/events`}
                className="hidden items-center gap-1.5 text-sm font-medium text-gold transition-colors hover:text-gold-dark sm:inline-flex"
              >
                {t.home.eventsAllLink}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-white/40">{t.home.noEvents}</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {upcomingEvents.map((event, idx) => (
                  <div
                    key={event.id}
                    className={`rounded-2xl p-6 transition-all ${
                      idx === 0
                        ? "bg-gold shadow-lg shadow-gold/20"
                        : "border border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {(event.isFeatured || idx === 0) && (
                      <p
                        className={`mb-3 text-xs font-semibold uppercase tracking-widest ${
                          idx === 0 ? "text-white/70" : "text-gold"
                        }`}
                      >
                        {t.home.featured}
                      </p>
                    )}
                    <h3
                      className={`mb-4 text-lg font-bold ${
                        idx === 0 ? "text-white" : "text-white"
                      }`}
                    >
                      {event.title}
                    </h3>
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        idx === 0 ? "text-white/80" : "text-white/50"
                      }`}
                    >
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(event.eventDate, t.stream.locale)}
                        {event.eventTimeLabel && ` · ${event.eventTimeLabel}`}
                      </span>
                    </div>
                    {event.location && (
                      <div
                        className={`mt-2 flex items-center gap-2 text-sm ${
                          idx === 0 ? "text-white/80" : "text-white/50"
                        }`}
                      >
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 sm:hidden">
              <Link
                href={`/${stream}/events`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gold"
              >
                {t.home.eventsAllLink}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* ─── SERMONS ──────────────────────────────────────────────── */}
      <div className="bg-[#F7F5F0]">
        <Container>
          <div className="py-24">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  {t.home.sermonsLabel}
                </p>
                <h2 className="text-3xl font-bold text-gray-900">{t.home.sermonsTitle}</h2>
              </div>
              <a
                href={YOUTUBE_CHANNEL_URLS[stream]}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 text-sm font-medium text-gold transition-colors hover:text-gold-dark sm:inline-flex"
              >
                {t.home.sermonsAllLink}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {recentSermons.length === 0 ? (
              <p className="text-sm text-gray-400">{t.home.noSermons}</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {recentSermons.map((video) => (
                  <a
                    key={video.id}
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group overflow-hidden rounded-2xl bg-white shadow-md shadow-gray-200/80 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Play overlay on hover */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
                        <div className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-gold opacity-0 shadow-lg shadow-gold/30 transition-all group-hover:scale-100 group-hover:opacity-100">
                          <PlayCircle className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5">
                      <h3 className="mb-2 font-bold leading-snug text-gray-900">{video.title}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(video.published, t.stream.locale)}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}

            <div className="mt-8 sm:hidden">
              <a
                href={YOUTUBE_CHANNEL_URLS[stream]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gold"
              >
                {t.home.sermonsAllLink}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <div className="bg-[#1A1A2E]">
        <Container>
          <div className="py-16 text-center">
            <h2 className="mb-8 text-3xl font-bold text-white">
              {stream === "ro" ? "Veniți la noi" : "Приходите к нам"}
            </h2>
            <Link
              href={`/${stream}/contacts`}
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold/10"
            >
              {t.home.btnHowToFind}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
