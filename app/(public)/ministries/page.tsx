import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

const ministries = [
  {
    title: "Воскресные богослужения",
    tag: "Еженедельно",
    description:
      "Каждое воскресенье мы собираемся для совместного поклонения, молитвы и изучения Слова Божьего. Богослужения открыты для всех желающих.",
    schedule: "Воскресенье, 10:00",
  },
  {
    title: "Молодёжь",
    tag: "Активно",
    description:
      "Молодёжное служение объединяет людей в возрасте 16–30 лет. Мы встречаемся для общения, изучения Библии и совместного служения.",
    schedule: "Пятница, 18:00",
  },
  {
    title: "Домашние группы",
    tag: "По районам",
    description:
      "Малые группы — сердце нашей церкви. Мы встречаемся по домам, изучаем Библию и поддерживаем друг друга в повседневной жизни.",
    schedule: "Среда, 19:00",
  },
  {
    title: "Детское служение",
    tag: "Дети",
    description:
      "Во время воскресного богослужения для детей проводятся специальные занятия в соответствии с возрастом.",
    schedule: "Воскресенье, 10:00",
  },
  {
    title: "Молитвенное служение",
    tag: "Молитва",
    description:
      "Регулярные встречи для совместной молитвы — за церковь, город, семьи и личные нужды.",
    schedule: "Среда, 18:30",
  },
  {
    title: "Лагеря и выезды",
    tag: "Сезонно",
    description:
      "Ежегодные молодёжные лагеря, семейные выезды и совместный отдых — важная часть жизни нашей церкви.",
    schedule: "По расписанию",
  },
];

export default function MinistriesPage() {
  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Наши направления</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Служения</h1>
            <p className="mt-2 max-w-xl text-gray-500">
              Разные формы служения, через которые живёт и развивается наша церковь.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.map((m) => (
              <div key={m.title} className="rounded-xl border border-gray-200 p-6 hover:border-gold/40 transition-colors">
                <div className="mb-4 flex items-start justify-between">
                  <h2 className="font-semibold text-gray-900">{m.title}</h2>
                  <span className="ml-2 shrink-0 rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold">
                    {m.tag}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">{m.description}</p>
                <p className="text-xs font-medium text-gray-400">{m.schedule}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
