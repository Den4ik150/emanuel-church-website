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
        { label: t.nav.home,       href: `/${stream}` },
        { label: t.nav.about,      href: `/${stream}/about` },
        { label: t.nav.sermons,    href: `/${stream}/sermons` },
        { label: t.nav.events,     href: `/${stream}/events` },
        { label: t.nav.schedule,   href: `/${stream}/schedule` },
        { label: t.nav.gallery,    href: `/${stream}/gallery` },
        { label: t.nav.news,       href: `/${stream}/news` },
        { label: t.nav.contacts,   href: `/${stream}/contacts` },
      ]
    : [];


  return (
    <footer className="bg-[#1A1A2E] text-white">
      {/* Main footer */}
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href={stream ? `/${stream}` : "/"}>
              <p className="text-base font-bold tracking-widest text-white hover:text-gold transition-colors">
                ЭММАНУИЛ / EMANUEL
              </p>
            </Link>
            {t && (
              <p className="mt-1 text-sm text-gold">{t.footer.tagline}</p>
            )}

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
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

          {/* Col 2 — Navigation */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
              {t ? t.footer.navTitle : "Navigation"}
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contacts */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
              {t ? t.footer.contactsTitle : "Contacts"}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>Strada Pușkin 77,<br />MD-3100, Bălți</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <span>+373 231 00 000</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <span>info@emmanuil.md</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Clock className="h-4 w-4 shrink-0 text-gold" />
                <span>
                  {stream === "ro" ? "Duminică · 10:00" : "Воскресенье · 12:00"}
                </span>
              </li>
            </ul>
          </div>

        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <Container>
          <div className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/25 sm:flex-row">
            <p>
              © {new Date().getFullYear()} Biserica Emanuel / Церковь Эммануил, Bălți.
              {t && ` ${t.footer.rights}`}
            </p>
            <Link
              href="/admin"
              className="transition-colors hover:text-white/50"
            >
              Admin
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
