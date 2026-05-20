import { Calendar } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { getPublishedNews } from "@/server/queries/news";

function formatDate(date: Date | null) {
  if (!date) return "";
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsPage() {
  const posts = await getPublishedNews();

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
              Новости
            </p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Новости и блог
            </h1>
            <p className="mt-2 text-gray-500">
              Последние события, объявления и истории из жизни церкви.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          {posts.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              Новостей пока нет
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group rounded-xl border border-gray-200 overflow-hidden hover:border-gold/40 transition-colors"
                >
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    {post.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <p className="text-xs text-gray-400">Обложка</p>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="mb-2 font-semibold text-gray-900 group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mb-3 text-sm leading-relaxed text-gray-600">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(post.publishedAt)}</span>
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
