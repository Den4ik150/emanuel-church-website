import Link from "next/link";
import { Instagram, Send, Youtube } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { getT, streamToLang } from "@/lib/translations";
import type { StreamSlug } from "@/lib/stream";

type Props = {
  stream?: StreamSlug;
};

export function Footer({ stream }: Props) {
  const t = stream ? getT(streamToLang(stream)) : null;

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
    <footer className="bg-gray-900 text-gray-300">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-lg font-bold tracking-widest text-white">ЭММАНУИЛ / EMANUEL</p>
            <p className="text-sm text-gray-400">{t ? t.footer.tagline : "Bălți · Moldova"}</p>
            <p className="text-sm italic text-gold">«соль» / «sare»</p>
            <div className="flex gap-4 pt-2">
              <a href="#" aria-label="Instagram" className="text-gray-400 transition-colors hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Telegram" className="text-gray-400 transition-colors hover:text-white">
                <Send className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-400 transition-colors hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              {t ? t.footer.navTitle : "Navigation"}
            </p>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              {t ? t.footer.contactsTitle : "Contacts"}
            </p>
            <address className="not-italic space-y-2 text-sm text-gray-400">
              <p>Bălți, Moldova</p>
              <p>+373 — — — — — —</p>
              <p>info@emmanuil.md</p>
            </address>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Biserica Emanuel / Церковь Эммануил, Bălți.{" "}
          {t ? t.footer.rights : "All rights reserved."}
        </div>
      </Container>
    </footer>
  );
}
