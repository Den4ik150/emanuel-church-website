import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Clock, MapPin, Heart, MessageCircle } from "lucide-react";

const steps = [
  { icon: MapPin, title: "Найдите нас", description: "Мы находимся по адресу: г. Бельцы, ул. Пушкина, 1. Парковка доступна рядом." },
  { icon: Clock, title: "Приходите вовремя", description: "Богослужение начинается в 10:00 по воскресеньям. Рекомендуем прийти чуть раньше." },
  { icon: Heart, title: "Будьте собой", description: "Дресс-кода нет. Никаких ожиданий. Просто приходите и посмотрите, что мы из себя представляем." },
  { icon: MessageCircle, title: "Познакомьтесь с нами", description: "После богослужения у вас будет возможность пообщаться с людьми и задать любые вопросы." },
];

export default function FirstVisitPage() {
  return (
    <>
      <div className="bg-gray-900 text-white">
        <Container>
          <Section>
            <div className="max-w-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Впервые у нас?</p>
              <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Добро пожаловать!</h1>
              <p className="text-lg leading-relaxed text-gray-400">
                Мы рады каждому новому человеку. Вот всё, что нужно знать перед первым визитом.
              </p>
            </div>
          </Section>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Просто</p>
            <h2 className="text-2xl font-bold text-gray-900">Как это работает</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-gray-200 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <div className="bg-gray-50">
        <Section>
          <Container>
            <div className="max-w-xl">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Чего ожидать</h2>
              <div className="space-y-3 text-gray-600">
                <p>Богослужение длится около <strong className="text-gray-900">1,5 часа</strong> и включает поклонение через музыку, проповедь из Библии и время молитвы.</p>
                <p>Дети могут посещать <strong className="text-gray-900">детское служение</strong> одновременно с взрослым богослужением.</p>
                <p>После богослужения всегда есть время для <strong className="text-gray-900">общения и чаепития</strong>.</p>
                <p>Вас никто ни к чему не обязывает. Первый визит — просто возможность познакомиться.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contacts"
                  className="rounded-md bg-gold px-6 py-3 text-sm font-semibold text-white hover:bg-gold-dark transition-colors"
                >
                  Связаться с нами
                </Link>
                <Link
                  href="/schedule"
                  className="rounded-md border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-gray-300 transition-colors"
                >
                  Расписание богослужений
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
