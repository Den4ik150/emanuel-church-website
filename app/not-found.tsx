import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/Container";

const HERO_IMAGE =
  "https://res.cloudinary.com/dcml2gd8n/image/upload/v1779380572/emmanuil-church/hero/church-exterior.jpg";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt="Церковь Эммануил"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[35%_50%] sm:object-center"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <Container className="relative z-10 text-center">
        <p className="mb-4 font-serif text-8xl font-bold text-gold">404</p>
        <h1 className="mb-4 font-serif text-3xl font-bold text-white sm:text-4xl">
          Страница не найдена
        </h1>
        <p className="mb-10 text-lg text-white/60">
          Такой страницы не существует. Возможно, ссылка устарела.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/ru"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gold/25 transition-all hover:bg-gold-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Русский поток
          </Link>
          <Link
            href="/ro"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            Flux Român
          </Link>
        </div>
      </Container>
    </div>
  );
}
