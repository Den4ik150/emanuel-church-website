import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Calendar } from "lucide-react";

const posts = [
  {
    title: "Итоги молодёжного лагеря 2025",
    excerpt: "Более 80 участников, три дня насыщенной программы, незабываемые моменты. Делимся впечатлениями.",
    date: "15 мая 2025",
    category: "Молодёжь",
  },
  {
    title: "Крещение — май 2025",
    excerpt: "В этом месяце ещё несколько человек сделали публичное исповедание веры через крещение.",
    date: "11 мая 2025",
    category: "Богослужение",
  },
  {
    title: "Новое расписание домашних групп",
    excerpt: "С июня домашние группы расширяются — присоединяйтесь к группе в вашем районе.",
    date: "3 мая 2025",
    category: "Объявление",
  },
  {
    title: "День молитвы — результаты и впечатления",
    excerpt: "Благодарим всех, кто принял участие в нашем дне молитвы и поста.",
    date: "25 апр 2025",
    category: "Молитва",
  },
  {
    title: "Семейный вечер прошёл успешно",
    excerpt: "Несколько семей нашей церкви провели вечер вместе. Игры, ужин и живое общение.",
    date: "18 апр 2025",
    category: "Мероприятие",
  },
  {
    title: "Пасхальное богослужение 2025",
    excerpt: "Пасха — главный праздник христиан. Делимся воспоминаниями о нашем совместном праздновании.",
    date: "20 апр 2025",
    category: "Праздник",
  },
];

export default function NewsPage() {
  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Новости</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Новости и блог</h1>
            <p className="mt-2 text-gray-500">
              Последние события, объявления и истории из жизни церкви.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="group cursor-pointer rounded-xl border border-gray-200 overflow-hidden hover:border-gold/40 transition-colors"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <p className="text-xs text-gray-400">Обложка</p>
                </div>
                <div className="p-5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
                    {post.category}
                  </p>
                  <h2 className="mb-2 font-semibold text-gray-900 group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="mb-3 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
