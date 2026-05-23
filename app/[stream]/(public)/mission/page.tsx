import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { isValidStream } from "@/lib/stream";

const content = {
  ro: { label: "Misiunea noastră", title: "Misiune & Viziune", subtitle: "Ce ne definește și spre ce tindem" },
  ru: { label: "Миссия", title: "Миссия и видение", subtitle: "Что нас определяет и к чему мы стремимся" },
};

export default async function MissionPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();
  const c = content[stream as "ro" | "ru"];
  return (
    <>
      <PageHero label={c.label} title={c.title} subtitle={c.subtitle} />
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-400">
              {stream === "ro" ? "Conținut în curs de completare." : "Контент скоро будет добавлен."}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
