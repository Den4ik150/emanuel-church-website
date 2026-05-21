export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { getPublishedNewsBySlug } from "@/server/queries/news";
import { getT, streamToLang } from "@/lib/translations";
import { toStreamEnum, isValidStream } from "@/lib/stream";

function formatDate(date: Date | null, locale: string) {
  if (!date) return "";
  return date.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}

function isVideo(url: string) {
  return url.includes("/video/upload/") || url.endsWith(".mp4") || url.endsWith(".mov");
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ stream: string; slug: string }>;
}) {
  const { stream, slug } = await params;
  if (!isValidStream(stream)) notFound();

  const t = getT(streamToLang(stream));
  const streamEnum = toStreamEnum(stream);
  const post = await getPublishedNewsBySlug(slug, streamEnum);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title={post.title}
        subtitle={formatDate(post.publishedAt, t.stream.locale)}
        backHref={`/${stream}/news`}
        backLabel={t.news.pageTitle}
      />

      <Container>
        <div className="mx-auto max-w-2xl py-12">
          {/* Video or cover image */}
          {post.coverImageUrl && (
            <div className="mb-8 overflow-hidden rounded-2xl bg-black">
              {isVideo(post.coverImageUrl) ? (
                <video
                  src={post.coverImageUrl}
                  controls
                  playsInline
                  className="w-full"
                  poster={post.coverImageUrl
                    .replace("/video/upload/", "/video/upload/so_2/")
                    .replace(".mp4", ".jpg")}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full object-cover"
                />
              )}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            {post.content.split("\n").map((line, i) =>
              line.trim() ? (
                <p key={i} className="mb-4 leading-relaxed text-gray-700">{line}</p>
              ) : (
                <br key={i} />
              )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
