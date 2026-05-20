export const dynamic = "force-dynamic";

import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { getPublishedSermons } from "@/server/queries/sermons";

function formatDate(date: Date) {
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function SermonsPage() {
  const sermons = await getPublishedSermons();

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
              Медиа
            </p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Проповеди
            </h1>
            <p className="mt-2 text-gray-500">
              Записи богослужений и проповедей нашей церкви.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          {sermons.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              Проповеди скоро появятся
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sermons.map((sermon) => (
                <a
                  key={sermon.id}
                  href={sermon.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-gray-200 overflow-hidden hover:border-gold/40 transition-colors"
                >
                  <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                    {sermon.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sermon.thumbnailUrl}
                        alt={sermon.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <PlayCircle className="h-10 w-10 text-gray-300 group-hover:text-gold transition-colors" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <PlayCircle className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div className="p-5">
                    {sermon.topic && (
                      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
                        {sermon.topic}
                      </p>
                    )}
                    <h3 className="mb-1 font-semibold text-gray-900">
                      {sermon.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {sermon.preacher} · {formatDate(sermon.sermonDate)}
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
