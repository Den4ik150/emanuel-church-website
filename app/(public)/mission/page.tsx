import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

const values = [
  { title: "Слово", description: "Мы верим, что Библия — богодухновенное Слово Бога, авторитетное в вопросах веры и жизни." },
  { title: "Молитва", description: "Молитва — это не религиозный ритуал, а живой разговор с Богом. Мы молимся вместе и лично." },
  { title: "Евангелие", description: "Благая весть о спасении через Иисуса Христа — центр всего, что мы делаем и говорим." },
  { title: "Семья", description: "Семья — основа общества и церкви. Мы поддерживаем и укрепляем семьи нашей общины." },
  { title: "Единство", description: "Мы едины в главном, свободны во второстепенном, во всём — любовь." },
  { title: "Служение", description: "Каждый член церкви призван служить — своими дарами, временем и ресурсами." },
];

export default function MissionPage() {
  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Зачем мы существуем</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Миссия и ценности</h1>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="max-w-2xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Наша миссия</h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-600">
              Познавать Бога, расти вместе и нести Его любовь нашему городу и миру.
            </p>
            <p className="leading-relaxed text-gray-600">
              Мы существуем для того, чтобы люди встречали живого Бога, становились учениками Иисуса
              Христа и жили в настоящей христианской общине — поддерживая друг друга и служа окружающим.
            </p>
          </div>
        </Container>
      </Section>

      <div className="bg-gray-50">
        <Section>
          <Container>
            <div className="mb-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Основа</p>
              <h2 className="text-2xl font-bold text-gray-900">Наши ценности</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v) => (
                <div key={v.title} className="rounded-xl bg-white border border-gray-200 p-6">
                  <h3 className="mb-2 font-semibold text-gray-900">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{v.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
