import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

const timeline = [
  { year: "1990-е", title: "Основание", description: "Церковь была основана небольшой группой верующих. Первые собрания проходили по домам." },
  { year: "2000-е", title: "Рост и развитие", description: "Община росла, появились первые служения для молодёжи и детей. Начало регулярных богослужений." },
  { year: "2010-е", title: "Расширение", description: "Открытие малых групп по всему городу. Начало летних лагерей и выездов." },
  { year: "Сегодня", title: "Настоящее время", description: "Активная церковная жизнь с разнообразными служениями. Продолжаем расти и развиваться." },
];

export default function HistoryPage() {
  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Наш путь</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">История церкви</h1>
            <p className="mt-2 text-gray-500">
              Краткая история церкви Эммануил в Бельцах.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="max-w-2xl">
            <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-gray-200">
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-6">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 ring-4 ring-white">
                    <div className="h-2.5 w-2.5 rounded-full bg-gold" />
                  </div>
                  <div className="pb-2">
                    <p className="mb-1 text-sm font-bold text-gold">{item.year}</p>
                    <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
