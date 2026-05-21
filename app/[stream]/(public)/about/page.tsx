import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { isValidStream } from "@/lib/stream";

const content = {
  ro: {
    label: "Despre noi",
    title: "Biserica Emanuel",
    subtitle: "O comunitate creștină în inima Bălțiului",
    body: [
      "Suntem o biserică creștină situată în orașul Bălți, Moldova. Fluxul nostru român reunește oameni de toate vârstele, naționalitățile și mediile sociale care caută pe Dumnezeu și doresc să crească spiritual.",
      "Igreja Emanuel a fost fondată cu dorința de a fi o comunitate unde oamenii pot găsi o credință autentică, un sprijin real și un loc de acasă. Credem în puterea rugăciunii, a Cuvântului lui Dumnezeu și a comunității frățești.",
      "Activitățile noastre includ slujbe duminicale, studii biblice, grupuri de tineret, activități pentru copii și numeroase proiecte de slujire în comunitate.",
    ],
    pastorLabel: "Pastorul nostru",
    pastorName: "Pastor Name",
    pastorBio: "Informații despre pastor vor fi adăugate în curând.",
  },
  ru: {
    label: "О церкви",
    title: "Церковь Эммануил",
    subtitle: "Христианская община в сердце Бельц",
    body: [
      "Мы — христианская церковь в городе Бельцы, Молдова. Русский поток объединяет людей разных возрастов, национальностей и социального положения, которые ищут Бога и хотят расти духовно.",
      "Церковь Эммануил была основана с желанием стать общиной, где люди могут найти настоящую веру, реальную поддержку и чувство дома. Мы верим в силу молитвы, Слова Божьего и братского общения.",
      "Наша деятельность включает воскресные богослужения, библейские занятия, молодёжные встречи, детские служения и множество проектов служения в обществе.",
    ],
    pastorLabel: "Наш пастор",
    pastorName: "Имя пастора",
    pastorBio: "Информация о пасторе будет добавлена в ближайшее время.",
  },
};

export default async function AboutPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();
  const c = content[stream];

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">{c.label}</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{c.title}</h1>
            <p className="mt-2 text-gray-500">{c.subtitle}</p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            {c.body.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-gray-600">{paragraph}</p>
            ))}
          </div>
        </Container>
      </Section>

      <div className="bg-gray-50">
        <Section>
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-2xl font-bold text-gray-900">{c.pastorLabel}</h2>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gray-200">
                  <span className="text-2xl text-gray-400">👤</span>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">{c.pastorName}</h3>
                  <p className="leading-relaxed text-gray-600">{c.pastorBio}</p>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
