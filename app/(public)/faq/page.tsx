import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

const faqs = [
  {
    q: "Нужно ли регистрироваться, чтобы прийти на богослужение?",
    a: "Нет, регистрация не требуется. Богослужения открыты для всех желающих. Просто приходите в воскресенье в 10:00.",
  },
  {
    q: "Как одеваться на богослужение?",
    a: "Строгого дресс-кода нет. Приходите в том, в чём вам комфортно. Главное — ваше присутствие.",
  },
  {
    q: "Есть ли занятия для детей во время богослужения?",
    a: "Да, для детей проводятся отдельные занятия в соответствии с возрастом одновременно с взрослым богослужением.",
  },
  {
    q: "Как попасть в домашнюю группу?",
    a: "Свяжитесь с нами через форму на сайте или в соцсетях, и мы поможем найти группу рядом с вашим домом.",
  },
  {
    q: "Проводятся ли богослужения на румынском языке?",
    a: "Наш русский поток проводит богослужения на русском языке. Румынский поток церкви проводит отдельные богослужения.",
  },
  {
    q: "Как я могу помочь церкви?",
    a: "Есть много способов участвовать: через музыкальное служение, работу с детьми, помощь в организации мероприятий и многое другое. Поговорите с нами!",
  },
];

export default function FaqPage() {
  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Ответы</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Часто задаваемые вопросы</h1>
            <p className="mt-2 text-gray-500">
              Ответы на самые популярные вопросы о нашей церкви.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="max-w-2xl space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-gray-200 p-6">
                <h3 className="mb-2 font-semibold text-gray-900">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
