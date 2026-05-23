import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { Instagram, ArrowRight } from "lucide-react";
import { isValidStream } from "@/lib/stream";
import { MINISTRIES, SOCIAL } from "@/lib/social";
import { StaggerChildren, StaggerItem } from "@/components/shared/Animate";

const content = {
  ro: {
    label: "Slujirii",
    title: "Slujirii",
    subtitle: "Comunitate, creștere și slujire împreună",
    churchLabel: "Pagina oficială",
    churchName: "Biserica Emanuel Bălți",
    instagramBtn: "Instagram",
  },
  ru: {
    label: "Служения",
    title: "Служения",
    subtitle: "Сообщество, рост и служение вместе",
    churchLabel: "Официальная страница",
    churchName: "Церковь Эммануил Бельцы",
    instagramBtn: "Instagram",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ stream: string }> }): Promise<Metadata> {
  const { stream } = await params;
  const c = content[stream as "ro" | "ru"];
  return { title: c?.title, description: c?.subtitle };
}

export default async function MinistriesPage({
  params,
}: {
  params: Promise<{ stream: string }>;
}) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();

  const c = content[stream as "ro" | "ru"];
  const ministries = MINISTRIES[stream as "ro" | "ru"];
  const churchInstagram = SOCIAL.instagram[stream as "ro" | "ru"];

  return (
    <>
      <PageHero label={c.label} title={c.title} subtitle={c.subtitle} />

      <Section>
        <Container>
          <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* Church main account */}
            <StaggerItem>
            <a
              href={churchInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A2E] to-[#2a2a4e] p-7 text-white transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-2xl">
                ⛪
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
                {c.churchLabel}
              </p>
              <h3 className="mb-2 font-serif text-lg font-bold">{c.churchName}</h3>
              <div className="mt-4 flex items-center gap-2 text-sm text-white/60 transition-colors group-hover:text-gold">
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </a>
            </StaggerItem>

            {/* Ministry cards */}
            {ministries.map((ministry) => (
              <StaggerItem key={ministry.key}>
              <a
                href={ministry.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-2xl">
                  {ministry.emoji}
                </div>
                <h3 className="mb-1 font-serif text-lg font-bold text-gray-900">{ministry.name}</h3>
                <p className="mb-4 text-sm text-gray-500">{ministry.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400 transition-colors group-hover:text-gold">
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </a>
              </StaggerItem>
            ))}

          </StaggerChildren>
        </Container>
      </Section>
    </>
  );
}
