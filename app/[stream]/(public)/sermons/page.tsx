import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Youtube } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { StaggerChildren, StaggerItem, FadeIn } from "@/components/shared/Animate";
import { getYouTubeVideos, YOUTUBE_CHANNEL_URLS, YOUTUBE_CHANNEL_AVATARS } from "@/lib/youtube";
import { getT, streamToLang } from "@/lib/translations";
import { isValidStream } from "@/lib/stream";

function formatDate(date: Date, locale: string) {
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: { params: Promise<{ stream: string }> }): Promise<Metadata> {
  const { stream } = await params;
  const t = getT(streamToLang(stream));
  return { title: t.sermons.pageTitle, description: t.sermons.pageSubtitle };
}

export default async function SermonsPage({
  params,
}: {
  params: Promise<{ stream: string }>;
}) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();

  const t = getT(streamToLang(stream));
  const videos = await getYouTubeVideos(stream, 18);
  const channelUrl = YOUTUBE_CHANNEL_URLS[stream];
  const channelAvatar = YOUTUBE_CHANNEL_AVATARS[stream];

  return (
    <>
      <PageHero title={t.sermons.pageTitle} subtitle={t.sermons.pageSubtitle} />

      <Section>
        <Container>
          {videos.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              {t.sermons.noSermons}
            </div>
          ) : (
            <StaggerChildren className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <StaggerItem key={video.id}>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl bg-white shadow-md shadow-gray-200/60 transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
                      <div className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-red-600 opacity-0 shadow-lg transition-all group-hover:scale-100 group-hover:opacity-100">
                        <Youtube className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 font-bold leading-snug text-gray-900 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(video.published, t.stream.locale)}
                    </p>
                  </div>
                </a>
                </StaggerItem>
              ))}
            </StaggerChildren>
          )}

          {/* Link to full channel */}
          {videos.length > 0 && (
            <FadeIn className="mt-12 text-center">
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-7 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-red-300 hover:text-red-600"
              >
                <Youtube className="h-4 w-4 text-red-500" />
                {t.home.sermonsAllLink}
              </a>
            </FadeIn>
          )}
        </Container>
      </Section>
    </>
  );
}
