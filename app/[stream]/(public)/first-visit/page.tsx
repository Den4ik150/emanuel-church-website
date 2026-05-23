import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/shared/Animate";
import { isValidStream } from "@/lib/stream";
import { Clock, MapPin, Shirt, Heart, Baby, Coffee } from "lucide-react";

const content = {
  ro: {
    label: "Prima vizită",
    title: "Prima ta vizită",
    subtitle: "Tot ce trebuie să știi înainte să vii",
    blocks: [
      {
        icon: "clock",
        title: "Când ne adunăm?",
        text: "Slujba duminicală a fluxului român are loc la ora 10:00. Grupurile de tineret și studiile biblice au loc în timpul săptămânii — verificați pagina Orar pentru detalii.",
      },
      {
        icon: "map",
        title: "Unde ne găsiți?",
        text: "Strada Pușkin 77, Bălți, MD-3100. Există loc de parcare în fața clădirii. De la centrul orașului puteți ajunge cu troleibuzul sau pe jos în 10 minute.",
      },
      {
        icon: "shirt",
        title: "Cum să veniți îmbrăcați?",
        text: "Nu există un cod vestimentar strict. Veniți așa cum vă simțiți confortabil. Cel mai important este că sunteți bineveniti exact așa cum sunteți.",
      },
      {
        icon: "baby",
        title: "Copiii sunt bineveniți",
        text: "Avem un program special pentru copii în timpul slujbei. Copiii pot rămâne cu părinții sau participa la activitățile dedicate lor.",
      },
      {
        icon: "heart",
        title: "Ce să așteptați?",
        text: "O slujbă durează aproximativ 1,5 ore și include adorare prin cântare, rugăciune și predică din Biblie. Atmosfera este caldă și primitoare.",
      },
      {
        icon: "coffee",
        title: "После службы",
        text: "После каждого воскресного богослужения приглашаем на чай и кофе — это отличная возможность познакомиться с членами общины.",
      },
    ],
    cta: "Ne bucurăm să vă vedem duminică!",
  },
  ru: {
    label: "Первый визит",
    title: "Ваш первый визит",
    subtitle: "Всё, что нужно знать перед тем, как прийти",
    blocks: [
      {
        icon: "clock",
        title: "Когда мы собираемся?",
        text: "Воскресное богослужение русского потока проходит в 15:00. Молодёжные встречи и библейские занятия проводятся в течение недели — смотрите страницу «Расписание».",
      },
      {
        icon: "map",
        title: "Как нас найти?",
        text: "Улица Пушкина 77, Бельцы, MD-3100. Рядом есть парковка. От центра города можно доехать на троллейбусе или дойти пешком за 10 минут.",
      },
      {
        icon: "shirt",
        title: "Как одеться?",
        text: "Строгого дресс-кода нет. Приходите так, как вам удобно. Главное — вы желанный гость именно таким, какой вы есть.",
      },
      {
        icon: "baby",
        title: "Дети приветствуются",
        text: "У нас есть специальная программа для детей во время богослужения. Дети могут оставаться с родителями или участвовать в детских занятиях.",
      },
      {
        icon: "heart",
        title: "Чего ожидать?",
        text: "Богослужение длится около 1,5 часов и включает поклонение через песни, молитву и проповедь из Библии. Атмосфера тёплая и радушная.",
      },
      {
        icon: "coffee",
        title: "После службы",
        text: "После каждого воскресного богослужения приглашаем на чай и кофе — это отличная возможность познакомиться с членами общины.",
      },
    ],
    cta: "Будем рады видеть вас в воскресенье!",
  },
};

const ICON_MAP = {
  clock: Clock,
  map: MapPin,
  shirt: Shirt,
  heart: Heart,
  baby: Baby,
  coffee: Coffee,
};

export async function generateMetadata({ params }: { params: Promise<{ stream: string }> }): Promise<Metadata> {
  const { stream } = await params;
  const c = content[stream as "ro" | "ru"];
  return { title: c?.title, description: c?.subtitle };
}

export default async function FirstVisitPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();
  const c = content[stream as "ro" | "ru"];

  return (
    <>
      <PageHero label={c.label} title={c.title} subtitle={c.subtitle} />
      <Section>
        <Container>
          <StaggerChildren className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.blocks.map((block) => {
              const Icon = ICON_MAP[block.icon as keyof typeof ICON_MAP];
              return (
                <StaggerItem key={block.icon}>
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="mb-2 font-serif text-lg font-bold text-gray-900">{block.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{block.text}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>

          <FadeIn className="mx-auto mt-12 max-w-xl rounded-2xl bg-[#1A1A2E] p-8 text-center">
            <p className="font-serif text-xl font-bold text-gold">{c.cta}</p>
            <p className="mt-2 text-sm text-white/60">
              {stream === "ru" ? "Strada Pușkin 77 · Воскресенье, 15:00" : "Strada Pușkin 77 · Duminică, 10:00"}
            </p>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
