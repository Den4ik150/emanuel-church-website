import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Clock, MapPin } from "lucide-react";

const schedule = [
  {
    category: "Воскресенье",
    items: [
      { title: "Воскресное богослужение", time: "10:00", location: "Зал церкви", description: "Общее поклонение, Слово Божье, молитва" },
    ],
  },
  {
    category: "Пятница",
    items: [
      { title: "Молодёжное собрание", time: "18:00", location: "Малый зал", description: "Встреча для молодёжи церкви" },
    ],
  },
  {
    category: "Среда",
    items: [
      { title: "Домашние группы", time: "19:00", location: "По домам", description: "Малые группы по районам города" },
      { title: "Молитвенное собрание", time: "18:30", location: "Зал церкви", description: "Совместная молитва" },
    ],
  },
];

export default function SchedulePage() {
  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Регулярно</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Расписание</h1>
            <p className="mt-2 text-gray-500">
              Регулярные встречи и собрания нашей церкви.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="max-w-2xl space-y-8">
            {schedule.map((group) => (
              <div key={group.category}>
                <h2 className="mb-4 text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
                  {group.category}
                </h2>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item.title} className="flex gap-4 rounded-xl border border-gray-200 p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                        <Clock className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <span className="text-sm font-medium text-gold">{item.time}</span>
                        </div>
                        <p className="mb-1 text-sm text-gray-600">{item.description}</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-gold/30 bg-gold/5 p-6 max-w-2xl">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Обратите внимание:</span> расписание может меняться
              в праздничные дни. Актуальную информацию уточняйте в наших соцсетях или по телефону.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
