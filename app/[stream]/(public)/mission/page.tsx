import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/shared/Animate";
import { isValidStream } from "@/lib/stream";

const content = {
  ro: {
    label: "Misiunea noastră",
    title: "Misiune & Viziune",
    subtitle: "Ce ne definește și spre ce tindem",
    missionTitle: "Misiunea",
    missionText:
      "Misiunea noastră este să vestim Evanghelia lui Isus Hristos, să facem ucenici și să construim o comunitate vie, ancorată în Cuvântul lui Dumnezeu. Credem că fiecare persoană merită să audă vestea bună și să găsească un loc de acasă în trupul lui Hristos.",
    visionTitle: "Viziunea",
    visionText:
      "Visăm la o biserică unde oamenii de toate vârstele, naționalitățile și mediile sociale să se simtă primiți, transformați de Evanghelie și trimiși să schimbe lumea din jurul lor.",
    values: [
      { title: "Biblia", text: "Cuvântul lui Dumnezeu este fundamentul credinței și vieții noastre." },
      { title: "Rugăciunea", text: "Credem în puterea rugăciunii și ne adunăm regulat pentru a ne ruga împreună." },
      { title: "Comuniunea", text: "Trăim credința împreună, sprijinindu-ne unii pe alții în bucurii și în greutăți." },
      { title: "Slujirea", text: "Ieșim din zidurile bisericii pentru a sluji comunitatea din Bălți și dincolo de ea." },
    ],
    valuesTitle: "Valorile noastre",
  },
  ru: {
    label: "Миссия",
    title: "Миссия и видение",
    subtitle: "Что нас определяет и к чему мы стремимся",
    missionTitle: "Миссия",
    missionText:
      "Наша миссия — возвещать Евангелие Иисуса Христа, воспитывать учеников и строить живую общину, укоренённую в Слове Божьем. Мы верим, что каждый человек достоин услышать благую весть и найти духовный дом в теле Христовом.",
    visionTitle: "Видение",
    visionText:
      "Мы мечтаем о церкви, где люди всех возрастов, национальностей и социальных положений чувствуют себя принятыми, преображёнными Евангелием и посланными изменять мир вокруг них.",
    values: [
      { title: "Библия", text: "Слово Божье — основание нашей веры и жизни." },
      { title: "Молитва", text: "Мы верим в силу молитвы и регулярно собираемся для совместного молитвенного общения." },
      { title: "Общение", text: "Мы проживаем веру вместе, поддерживая друг друга в радостях и трудностях." },
      { title: "Служение", text: "Мы выходим за стены церкви, чтобы служить городу Бельцы и людям за его пределами." },
    ],
    valuesTitle: "Наши ценности",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ stream: string }> }): Promise<Metadata> {
  const { stream } = await params;
  const c = content[stream as "ro" | "ru"];
  return { title: c?.title, description: c?.subtitle };
}

export default async function MissionPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();
  const c = content[stream as "ro" | "ru"];

  return (
    <>
      <PageHero label={c.label} title={c.title} subtitle={c.subtitle} />

      {/* Mission + Vision */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl space-y-12">
            <FadeIn>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                {c.missionTitle}
              </p>
              <p className="text-lg leading-relaxed text-gray-700">{c.missionText}</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                {c.visionTitle}
              </p>
              <p className="text-lg leading-relaxed text-gray-700">{c.visionText}</p>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <div className="bg-[#F7F5F0]">
        <Section>
          <Container>
            <FadeIn className="mb-10 text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900">{c.valuesTitle}</h2>
            </FadeIn>
            <StaggerChildren className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
              {c.values.map((v, i) => (
                <StaggerItem key={i}>
                  <div className="rounded-2xl border border-gray-200 bg-white p-7">
                    <div className="mb-3 inline-block rounded-lg bg-gold/10 px-3 py-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-gold">{v.title}</span>
                    </div>
                    <p className="leading-relaxed text-gray-600">{v.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </Container>
        </Section>
      </div>
    </>
  );
}
