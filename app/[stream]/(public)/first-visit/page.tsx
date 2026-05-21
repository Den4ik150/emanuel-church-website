import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { isValidStream } from "@/lib/stream";

const content = {
  ro: { label: "Prima vizită", title: "Prima ta vizită", subtitle: "Tot ce trebuie să știi" },
  ru: { label: "Первый визит", title: "Ваш первый визит", subtitle: "Всё, что нужно знать" },
};

export default async function FirstVisitPage({ params }: { params: Promise<{ stream: string }> }) {
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
