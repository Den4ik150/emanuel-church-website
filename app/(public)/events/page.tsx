import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Calendar, Clock, MapPin } from "lucide-react";

const events = [
  {
    title: "Воскресное богослужение",
    description: "Приглашаем всех на еженедельное воскресное богослужение. Поклонение, Слово, общение.",
    date: "25 мая 2025",
    time: "10:00",
    location: "Зал церкви",
  },
  {
    title: "Молодёжное собрание",
    description: "Встреча молодёжи церкви. Тема: «Призвание и жизнь с Богом».",
    date: "30 мая 2025",
    time: "18:00",
    location: "Малый зал",
  },
  {
    title: "Летний лагерь 2025",
    description: "Ежегодный летний лагерь для молодёжи и подростков. Регистрация скоро откроется.",
    date: "15–20 июля 2025",
    time: "Многодневный",
    location: "За городом",
  },
  {
    title: "День молитвы и поста",
    description: "Совместный день молитвы всей церкви. Приходите в любое удобное время.",
    date: "6 июня 2025",
    time: "08:00–20:00",
    location: "Зал церкви",
  },
  {
    title: "Семейный вечер",
    description: "Вечер для семей нашей церкви. Игры, общение, ужин.",
    date: "14 июня 2025",
    time: "17:00",
    location: "Зал церкви",
  },
  {
    title: "Евангелизационная встреча",
    description: "Открытая встреча для всех желающих узнать о христианской вере.",
    date: "21 июня 2025",
    time: "16:00",
    location: "Зал церкви",
  },
];

export default function EventsPage() {
  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Жизнь церкви</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Мероприятия</h1>
            <p className="mt-2 text-gray-500">
              Ближайшие события и встречи нашей церкви.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.title} className="flex flex-col rounded-xl border border-gray-200 overflow-hidden hover:border-gold/40 transition-colors">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <p className="text-xs text-gray-400">Фото мероприятия</p>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 font-semibold text-gray-900">{event.title}</h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                    {event.description}
                  </p>
                  <div className="space-y-1.5 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gold" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gold" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gold" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
