import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";

export default function HomePage() {
  return (
    <>
      <div className="bg-gray-900 text-white">
        <Container>
          <Section>
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-medium tracking-widest text-gold uppercase">
                Церковь Эммануил · Бельцы
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Добро пожаловать
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                Место, где вы найдёте живую веру, настоящее общение и Слово Божье.
                Мы рады видеть вас на нашем сайте.
              </p>
            </div>
          </Section>
        </Container>
      </div>

      <Container>
        <Section>
          <p className="text-center text-sm text-gray-400">
            Контент главной страницы будет добавлен на следующем этапе.
          </p>
        </Section>
      </Container>
    </>
  );
}
