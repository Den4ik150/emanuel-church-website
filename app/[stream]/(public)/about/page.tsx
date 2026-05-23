import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { isValidStream } from "@/lib/stream";

const HERO_IMAGE =
  "https://res.cloudinary.com/dcml2gd8n/image/upload/v1779380572/emmanuil-church/hero/church-exterior.jpg";

const PASTOR_IMAGES: Record<string, string> = {
  ro: "https://res.cloudinary.com/dcml2gd8n/image/upload/v1779372223/emmanuil-church/people/pastor-ro.jpg",
  ru: "https://res.cloudinary.com/dcml2gd8n/image/upload/v1779380575/emmanuil-church/people/pastor-ru.jpg",
};

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
    pastorName: "Pastorul fluxului român",
    pastorBio: "Lider al fluxului român al Bisericii Emanuel din Bălți.",
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
    pastorName: "Павел Полищук",
    pastorBio: "Пастор русского потока церкви Эммануил в Бельцах.",
  },
};

export default async function AboutPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();
  const c = content[stream as "ro" | "ru"];
  const pastorPhoto = PASTOR_IMAGES[stream];

  return (
    <>
      {/* ── Hero with church photo ─────────────────────────── */}
      <div className="relative flex min-h-[45vh] items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt="Церковь Эммануил"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[35%_50%] sm:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        <div className="relative z-10 w-full pb-12 pt-24">
          <Container>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
              {c.label}
            </p>
            <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">{c.title}</h1>
            <p className="mt-3 text-lg text-white/70">{c.subtitle}</p>
          </Container>
        </div>
      </div>

      {/* ── About text ────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            {c.body.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-gray-600">{paragraph}</p>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Pastor ────────────────────────────────────────────── */}
      <div className="bg-[#F7F5F0]">
        <Section>
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                {c.pastorLabel}
              </p>
              <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-start">
                {/* Pastor photo */}
                <div className="relative mx-auto w-48 shrink-0 sm:mx-0">
                  <div className="absolute -right-2 -top-2 h-full w-full rounded-2xl bg-gold/15" />
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
                    {pastorPhoto ? (
                      <Image
                        src={pastorPhoto}
                        alt={c.pastorName}
                        fill
                        sizes="192px"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200">
                        <span className="text-4xl text-gray-400">👤</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pastor info */}
                <div className="pt-2">
                  <h2 className="mb-3 font-serif text-2xl font-bold text-gray-900">{c.pastorName}</h2>
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
