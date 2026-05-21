export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { getPublishedNews } from "@/server/queries/news";
import { getT, streamToLang } from "@/lib/translations";
import { toStreamEnum, isValidStream } from "@/lib/stream";

function formatDate(date: Date | null, locale: string) {
  if (!date) return "";
  return date.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}

export default async function NewsPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();
  const t = getT(streamToLang(stream));
  const posts = await getPublishedNews(toStreamEnum(stream));

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t.news.pageTitle}</h1>
            <p className="mt-2 text-gray-500">{t.news.pageSubtitle}</p>
          </div>
        </Container>
      </div>
      <Section>
        <Container>
          {posts.length === 0 ? (
            <div className="py-16 text-center text-gray-400">{t.news.noNews}</div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-xl border border-gray-200 transition-colors hover:border-gold/40"
                >
                  <div className="flex aspect-video items-center justify-center bg-gray-100">
                    {post.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.coverImageUrl} alt={post.title} className="h-full w-full object-cover" />
                    ) : (
                      <p className="text-xs text-gray-400">{t.news.pageTitle}</p>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="mb-2 font-semibold text-gray-900 transition-colors group-hover:text-gold">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mb-3 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(post.publishedAt, t.stream.locale)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
