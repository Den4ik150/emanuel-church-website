import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { MapPin, Clock, Phone, Instagram, Send, Youtube } from "lucide-react";

const upcomingEvents = [
  { title: "Воскресное богослужение", date: "25 мая 2025", time: "10:00", topic: "Богослужение" },
  { title: "Молодёжное собрание", date: "30 мая 2025", time: "18:00", topic: "Молодёжь" },
  { title: "Домашняя группа", date: "28 мая 2025", time: "19:00", topic: "Группы" },
];

const recentSermons = [
  { title: "Сила молитвы", preacher: "Пастор Иван", date: "18 мая 2025", topic: "Молитва" },
  { title: "Вера, которая двигает горы", preacher: "Пастор Иван", date: "11 мая 2025", topic: "Вера" },
  { title: "Благодать для каждого", preacher: "Диакон Сергей", date: "4 мая 2025", topic: "Благодать" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gray-900 text-white">
        <Container>
          <Section>
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gold">
                Церковь Эммануил · Бельцы
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Добро пожаловать
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-400">
                Место, где вы найдёте живую веру, настоящее общение и Слово Божье.
                Мы рады видеть вас среди нас.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="rounded-md bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
                >
                  О церкви
                </Link>
                <Link
                  href="/contacts"
                  className="rounded-md border border-gray-600 px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-gray-400 hover:text-white"
                >
                  Как нас найти
                </Link>
              </div>
            </div>
          </Section>
        </Container>
      </div>

      {/* Next Service */}
      <div className="border-b border-gray-100 bg-white">
        <Container>
          <div className="py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Ближайшее богослужение
                </p>
                <p className="mt-1 text-xl font-bold text-gray-900">Воскресенье, 25 мая · 10:00</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4 text-gold" />
                <span>г. Бельцы, ул. Placeholder, 1</span>
              </div>
              <Link
                href="/schedule"
                className="text-sm font-medium text-gold hover:text-gold-dark transition-colors"
              >
                Полное расписание →
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* About Preview */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                О нас
              </p>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Церковь Эммануил
              </h2>
              <p className="mb-4 text-gray-600 leading-relaxed">
                Мы — христианская церковь в городе Бельцы, Молдова. Наш русский поток объединяет
                людей разных возрастов, которые ищут Бога и хотят жить по Его слову.
              </p>
              <p className="mb-6 text-gray-600 leading-relaxed">
                Каждое воскресенье мы собираемся для совместного поклонения, изучения Библии
                и общения. Приходите — мы вас ждём.
              </p>
              <Link
                href="/about"
                className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
              >
                Узнать больше →
              </Link>
            </div>
            <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center">
              <p className="text-sm text-gray-400">Фото церкви</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Upcoming Events */}
      <div className="bg-gray-50">
        <Section>
          <Container>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
                  Мероприятия
                </p>
                <h2 className="text-2xl font-bold text-gray-900">Ближайшие события</h2>
              </div>
              <Link href="/events" className="text-sm font-medium text-gold hover:text-gold-dark transition-colors">
                Все события →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {upcomingEvents.map((event) => (
                <div key={event.title} className="rounded-xl border border-gray-200 bg-white p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                    {event.topic}
                  </p>
                  <h3 className="mb-3 font-semibold text-gray-900">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{event.date} · {event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </div>

      {/* Recent Sermons */}
      <Section>
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
                Проповеди
              </p>
              <h2 className="text-2xl font-bold text-gray-900">Последние проповеди</h2>
            </div>
            <Link href="/sermons" className="text-sm font-medium text-gold hover:text-gold-dark transition-colors">
              Все проповеди →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {recentSermons.map((sermon) => (
              <div key={sermon.title} className="group rounded-xl border border-gray-200 p-6 hover:border-gold/40 transition-colors">
                <div className="mb-3 aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
                  <p className="text-xs text-gray-400">Превью видео</p>
                </div>
                <p className="mb-1 text-xs font-medium uppercase tracking-widest text-gold">
                  {sermon.topic}
                </p>
                <h3 className="mb-1 font-semibold text-gray-900">{sermon.title}</h3>
                <p className="text-sm text-gray-500">{sermon.preacher} · {sermon.date}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contacts strip */}
      <div className="bg-gray-900 text-white">
        <Container>
          <div className="py-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-white">Адрес</p>
                  <p className="text-sm text-gray-400">г. Бельцы, Молдова</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-white">Телефон</p>
                  <p className="text-sm text-gray-400">+373 — — — — — —</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Telegram" className="text-gray-400 hover:text-white transition-colors">
                  <Send className="h-5 w-5" />
                </a>
                <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
