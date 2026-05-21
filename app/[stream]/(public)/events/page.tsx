export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { getPublishedEvents } from "@/server/queries/events";
import { getT, streamToLang } from "@/lib/translations";
import { toStreamEnum, isValidStream } from "@/lib/stream";

function formatDate(date: Date, locale: string) {
  return date.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}

export default async function EventsPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();
  const t = getT(streamToLang(stream));
  const events = await getPublishedEvents(toStreamEnum(stream));

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t.events.pageTitle}</h1>
            <p className="mt-2 text-gray-500">{t.events.pageSubtitle}</p>
          </div>
        </Container>
      </div>
      <Section>
        <Container>
          {events.length === 0 ? (
            <div className="py-16 text-center text-gray-400">{t.events.noEvents}</div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-gray-200 transition-colors hover:border-gold/40"
                >
                  <div className="flex aspect-video items-center justify-center bg-gray-100">
                    {event.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
                    ) : (
                      <p className="text-xs text-gray-400">{t.events.pageTitle}</p>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {event.isFeatured && (
                      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">{t.events.featured}</p>
                    )}
                    <h3 className="mb-2 font-semibold text-gray-900">{event.title}</h3>
                    {event.description && (
                      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">{event.description}</p>
                    )}
                    <div className="space-y-1.5 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gold" />
                        <span>{formatDate(event.eventDate, t.stream.locale)}</span>
                      </div>
                      {event.eventTimeLabel && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gold" />
                          <span>{event.eventTimeLabel}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gold" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
