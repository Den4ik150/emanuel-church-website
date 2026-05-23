export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { StaggerChildren, StaggerItem } from "@/components/shared/Animate";
import { getPublishedNews } from "@/server/queries/news";
import { getT, streamToLang } from "@/lib/translations";
import { toStreamEnum, isValidStream } from "@/lib/stream";

function formatDate(date: Date | null, locale: string) {
  if (!date) return "";
  return date.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}

function getCoverThumb(url: string) {
  if (url.includes("/video/upload/")) {
    return url
      .replace("/video/upload/", "/video/upload/so_2,w_800,h_450,c_fill/")
      .replace(/\.mp4$/, ".jpg");
  }
  return url;
}

export async function generateMetadata({ params }: { params: Promise<{ stream: string }> }): Promise<Metadata> {
  const { stream } = await params;
  const t = getT(streamToLang(stream));
  return { title: t.news.pageTitle, description: t.news.pageSubtitle };
}

export default async function NewsPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();
  const t = getT(streamToLang(stream));
  const posts = await getPublishedNews(toStreamEnum(stream));

  return (
    <>
      <PageHero title={t.news.pageTitle} subtitle={t.news.pageSubtitle} />
      <Section>
        <Container>
          {posts.length === 0 ? (
            <div className="py-16 text-center text-gray-400">{t.news.noNews}</div>
          ) : (
            <StaggerChildren className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                <Link
                  href={`/${stream}/news/${post.slug}`}
                  className="group block overflow-hidden rounded-xl border border-gray-200 transition-colors hover:border-gold/40"
                >
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gray-100">
                    {post.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={getCoverThumb(post.coverImageUrl)} alt={post.title} className="h-full w-full object-cover" />
                    ) : (
                      <p className="text-xs text-gray-400">{t.news.pageTitle}</p>
                    )}
                    {post.coverImageUrl?.includes("/video/upload/") && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50">
                          <svg className="h-5 w-5 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
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
                </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          )}
        </Container>
      </Section>
    </>
  );
}
