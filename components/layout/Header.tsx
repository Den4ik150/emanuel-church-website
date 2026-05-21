import Link from "next/link";
import { Settings } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { MainNav } from "@/components/navigation/MainNav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { StreamSwitcher } from "@/components/navigation/StreamSwitcher";
import { getT, streamToLang } from "@/lib/translations";
import type { NavItem } from "@/config/navigation.config";
import type { StreamSlug } from "@/lib/stream";

type Props = {
  stream?: StreamSlug;
};

export function Header({ stream }: Props) {
  const isStreamPage = !!stream;
  const t = stream ? getT(streamToLang(stream)) : null;

  const navItems: NavItem[] = stream && t
    ? [
        { label: t.nav.home,        href: `/${stream}` },
        { label: t.nav.about,       href: `/${stream}/about` },
        { label: t.nav.ministries,  href: `/${stream}/ministries` },
        { label: t.nav.sermons,     href: `/${stream}/sermons` },
        { label: t.nav.events,      href: `/${stream}/events` },
        { label: t.nav.schedule,    href: `/${stream}/schedule` },
        { label: t.nav.gallery,     href: `/${stream}/gallery` },
        { label: t.nav.news,        href: `/${stream}/news` },
        { label: t.nav.contacts,    href: `/${stream}/contacts` },
      ]
    : [];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={stream ? `/${stream}` : "/"}
            className="group flex flex-col leading-tight"
          >
            <span className="text-base font-bold tracking-widest text-gray-900 transition-colors group-hover:text-gold">
              ЭММАНУИЛ / EMANUEL
            </span>
            {t && (
              <span className="text-[10px] tracking-widest text-gold uppercase">
                {t.stream.name}
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          {isStreamPage && <MainNav items={navItems} />}

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Stream switcher — visible on all screen sizes */}
            {stream && <StreamSwitcher currentStream={stream} />}

            {/* Admin link */}
            <Link
              href="/admin"
              className="rounded-md p-1.5 text-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-500"
              title="Панель управления"
            >
              <Settings className="h-4 w-4" />
            </Link>

            {/* Mobile nav */}
            {isStreamPage && (
              <MobileNav items={navItems} stream={stream} />
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
