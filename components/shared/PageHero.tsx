import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "./Container";

const HERO_IMAGE =
  "https://res.cloudinary.com/dcml2gd8n/image/upload/v1779380572/emmanuil-church/hero/church-exterior.jpg";

type Props = {
  label?: string;
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
};

export function PageHero({ label, title, subtitle, backHref, backLabel }: Props) {
  return (
    <div className="relative flex min-h-[36vh] items-end">
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt="Церковь Эммануил"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[35%_50%] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
      </div>
      <div className="relative z-10 w-full pb-10 pt-20">
        <Container>
          {backHref && (
            <Link
              href={backHref}
              className="mb-4 inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
          )}
          {label && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
              {label}
            </p>
          )}
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-base text-white/65">{subtitle}</p>
          )}
        </Container>
      </div>
    </div>
  );
}
