import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

const values = [
  { title: "Слово Божье", description: "Библия — наш главный авторитет в вере и жизни." },
  { title: "Молитва", description: "Мы верим в силу молитвы и практикуем её вместе." },
  { title: "Общение", description: "Настоящие отношения строятся в малых группах и семьях." },
  { title: "Служение", description: "Каждый призван использовать свои дары для служения другим." },
  { title: "Евангелие", description: "Мы несём Благую весть нашему городу и миру." },
  { title: "Семья", description: "Церковь — это семья, где каждый принят и любим." },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">О нас</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">О церкви</h1>
            <p className="mt-2 max-w-xl text-gray-500">
              Узнайте о нашей истории, миссии и людях, которые составляют церковь Эммануил.
            </p>
          </div>
        </Container>
      </div>

      {/* Main intro */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center">
              <p className="text-sm text-gray-400">Фото церкви</p>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Кто мы</h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                Церковь Эммануил — это христианская церковь в городе Бельцы, Молдова.
                Наш русский поток объединяет людей разных возрастов и социальных групп,
                которые стремятся познать Бога и жить по Его слову.
              </p>
              <p className="leading-relaxed text-gray-600">
                Мы убеждены, что церковь — это не здание, а люди. Люди, соединённые верой
                во Христа, готовые поддержать друг друга и нести любовь Божью в мир вокруг.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pastor */}
      <div className="bg-gray-50">
        <Section>
          <Container>
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Пастор</h2>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="h-32 w-32 shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                <p className="text-xs text-gray-400">Фото</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Имя Фамилия</h3>
                <p className="mb-3 text-sm text-gold">Пастор церкви</p>
                <p className="leading-relaxed text-gray-600">
                  Краткое описание пастора, его биография, призвание и служение.
                  Этот текст будет заменён реальным содержимым через панель управления.
                </p>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      {/* Values */}
      <Section>
        <Container>
          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Что нами движет</p>
            <h2 className="text-2xl font-bold text-gray-900">Наши ценности</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl border border-gray-200 p-6">
                <h3 className="mb-2 font-semibold text-gray-900">{value.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
