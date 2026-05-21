export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { PlayCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { getPublishedSermons } from "@/server/queries/sermons";
import { getT, streamToLang } from "@/lib/translations";
import { toStreamEnum, isValidStream } from "@/lib/stream";

function formatDate(date: Date, locale: string) {
  return date.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}

export default async function SermonsPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();
  const t = getT(streamToLang(stream));
  const sermons = await getPublishedSermons(toStreamEnum(stream));

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t.sermons.pageTitle}</h1>
            <p className="mt-2 text-gray-500">{t.sermons.pageSubtitle}</p>
          </div>
        </Container>
      </div>
      <Section>
        <Container>
          {sermons.length === 0 ? (
            <div className="py-16 text-center text-gray-400">{t.sermons.noSermons}</div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sermons.map((sermon) => (
                <a
                  key={sermon.id}
                  href={sermon.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-xl border border-gray-200 transition-colors hover:border-gold/40"
                >
                  <div className="relative flex aspect-video items-center justify-center bg-gray-100">
                    {sermon.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={sermon.thumbnailUrl} alt={sermon.title} className="h-full w-full object-cover" />
                    ) : (
                      <PlayCircle className="h-10 w-10 text-gray-300 transition-colors group-hover:text-gold" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <PlayCircle className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div className="p-5">
                    {sermon.topic && (
                      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">{sermon.topic}</p>
                    )}
                    <h3 className="mb-1 font-semibold text-gray-900">{sermon.title}</h3>
                    <p className="text-sm text-gray-500">
                      {sermon.preacher} · {formatDate(sermon.sermonDate, t.stream.locale)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
