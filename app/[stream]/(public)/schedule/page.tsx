export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, MapPin } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/shared/Animate";
import { getActiveScheduleItems } from "@/server/queries/schedule";
import { getT, streamToLang, type Translations } from "@/lib/translations";
import { toStreamEnum, isValidStream } from "@/lib/stream";

const WEEKDAY_ORDER_KEYS: (keyof Translations["weekdays"])[] = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

export async function generateMetadata({ params }: { params: Promise<{ stream: string }> }): Promise<Metadata> {
  const { stream } = await params;
  const t = getT(streamToLang(stream));
  return { title: t.schedule.pageTitle, description: t.schedule.pageSubtitle };
}

export default async function SchedulePage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();
  const t = getT(streamToLang(stream));
  const items = await getActiveScheduleItems(toStreamEnum(stream));

  // Items are stored with weekday in English ("Sunday", "Monday", etc.)
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!acc[item.weekday]) acc[item.weekday] = [];
    acc[item.weekday].push(item);
    return acc;
  }, {});

  const sortedDays = Object.keys(grouped).sort(
    (a, b) =>
      WEEKDAY_ORDER_KEYS.indexOf(a as keyof Translations["weekdays"]) -
      WEEKDAY_ORDER_KEYS.indexOf(b as keyof Translations["weekdays"])
  );

  return (
    <>
      <PageHero title={t.schedule.pageTitle} subtitle={t.schedule.pageSubtitle} />
      <Section>
        <Container>
          {items.length === 0 ? (
            <div className="py-16 text-center text-gray-400">{t.schedule.noItems}</div>
          ) : (
            <StaggerChildren className="max-w-2xl space-y-8">
              {sortedDays.map((dayKey) => (
                <StaggerItem key={dayKey}>
                  <h2 className="mb-4 border-b border-gray-100 pb-2 font-serif text-lg font-bold text-gray-900">
                    {t.weekdays[dayKey as keyof Translations["weekdays"]] ?? dayKey}
                  </h2>
                  <div className="space-y-3">
                    {grouped[dayKey].map((item) => (
                      <div key={item.id} className="flex gap-4 rounded-xl border border-gray-200 p-5 transition-colors hover:border-gold/30">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                          <Clock className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <div className="mb-1 flex flex-wrap items-center gap-3">
                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                            <span className="text-sm font-medium text-gold">
                              {item.startTime}
                            </span>
                          </div>
                          {item.description && (
                            <p className="mb-1 text-sm text-gray-600">{item.description}</p>
                          )}
                          {item.location && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          )}
        </Container>
      </Section>
    </>
  );
}
