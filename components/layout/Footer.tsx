import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Instagram, Send, Youtube, Facebook } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { getT, streamToLang } from "@/lib/translations";
import { YOUTUBE_CHANNEL_URLS } from "@/lib/youtube";
import { SOCIAL } from "@/lib/social";
import type { StreamSlug } from "@/lib/stream";

type Props = {
  stream?: StreamSlug;
};

export function Footer({ stream }: Props) {
  const t = stream ? getT(streamToLang(stream)) : null;
  const youtubeUrl = stream ? YOUTUBE_CHANNEL_URLS[stream] : "#";
  const instagramUrl = stream ? SOCIAL.instagram[stream] : "#";
  const facebookUrl = stream ? SOCIAL.facebook[stream] : "#";
  const telegramUrl = stream ? SOCIAL.telegram[stream] || "#" : "#";

  const navLinks = stream && t
    ? [
        { label: t.nav.home,      href: `/${stream}` },
        { label: t.nav.about,     href: `/${stream}/about` },
        { label: t.nav.sermons,   href: `/${stream}/sermons` },
        { label: t.nav.events,    href: `/${stream}/events` },
        { label: t.nav.schedule,  href: `/${stream}/schedule` },
        { label: t.nav.gallery,   href: `/${stream}/gallery` },
        { label: t.nav.news,      href: `/${stream}/news` },
        { label: t.nav.contacts,  href: `/${stream}/contacts` },
      ]
    : [];

  const serviceTime = stream === "ro" ? "Duminică · 10:00" : "Воскресенье · 12:00";

  return (
    <footer className="bg-[#1A1A2E] text-white">
      <Container className="py-14">

        {/* ── Contact cards ─────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {/* Address */}
          <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
              <MapPin className="h-5 w-5 text-gold" />
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
              {t ? t.contacts.addressLabel : "Address"}
            </p>
            <p className="text-sm leading-relaxed text-white/70">
              Strada Pușkin 77,<br />MD-3100, Bălți
            </p>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
              <Phone className="h-5 w-5 text-gold" />
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
              {t ? t.contacts.phoneLabel : "Phone"}
            </p>
            <p className="text-sm text-white/70">+373 231 00 000</p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
              <Mail className="h-5 w-5 text-gold" />
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
              {t ? t.contacts.emailLabel : "Email"}
            </p>
            <p className="text-sm text-white/70">info@emmanuil.md</p>
          </div>

          {/* Schedule */}
          <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
              <Clock className="h-5 w-5 text-gold" />
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
              {t ? t.contacts.scheduleLabel : "Schedule"}
            </p>
            <p className="text-sm text-white/70">{serviceTime}</p>
          </div>
        </div>

        {/* ── Nav + social icons ────────────────────────────── */}
        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-blue-400/50 hover:text-blue-400"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-pink-400/50 hover:text-pink-400"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-sky-400/50 hover:text-sky-400"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-red-400/50 hover:text-red-400"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>

      {/* ── Copyright bar ─────────────────────────────────────── */}
      <div className="border-t border-white/5">
        <Container>
          <div className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/25 sm:flex-row">
            <p>
              © {new Date().getFullYear()} Biserica Emanuel / Церковь Эммануил, Bălți.
              {t && ` ${t.footer.rights}`}
            </p>
            <Link href="/admin" className="transition-colors hover:text-white/50">
              Admin
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
