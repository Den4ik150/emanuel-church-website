import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Search, PlayCircle } from "lucide-react";

const sermons = [
  { title: "Сила молитвы", topic: "Молитва", preacher: "Пастор Иван", date: "18 мая 2025" },
  { title: "Вера, которая двигает горы", topic: "Вера", preacher: "Пастор Иван", date: "11 мая 2025" },
  { title: "Благодать для каждого", topic: "Благодать", preacher: "Диакон Сергей", date: "4 мая 2025" },
  { title: "Путь к примирению", topic: "Прощение", preacher: "Пастор Иван", date: "27 апр 2025" },
  { title: "Живая вода", topic: "Евангелие", preacher: "Гость", date: "20 апр 2025" },
  { title: "Семья по замыслу Бога", topic: "Семья", preacher: "Пастор Иван", date: "13 апр 2025" },
];

export default function SermonsPage() {
  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Медиа</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Проповеди</h1>
            <p className="mt-2 text-gray-500">
              Записи богослужений и проповедей нашей церкви.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          {/* Filters */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по названию..."
                className="w-full rounded-md border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </div>
            <select className="rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-gold">
              <option value="">Все темы</option>
              <option>Молитва</option>
              <option>Вера</option>
              <option>Благодать</option>
              <option>Евангелие</option>
              <option>Семья</option>
            </select>
            <input
              type="month"
              className="rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-gold"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => (
              <div
                key={sermon.title}
                className="group cursor-pointer rounded-xl border border-gray-200 overflow-hidden hover:border-gold/40 transition-colors"
              >
                <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                  <p className="text-xs text-gray-400">Превью</p>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <PlayCircle className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
                    {sermon.topic}
                  </p>
                  <h3 className="mb-1 font-semibold text-gray-900">{sermon.title}</h3>
                  <p className="text-sm text-gray-500">
                    {sermon.preacher} · {sermon.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
