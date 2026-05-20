import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { MainNav } from "@/components/navigation/MainNav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { publicNavItems } from "@/config/navigation.config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex flex-col leading-tight">
            <span className="text-base font-bold tracking-widest text-gray-900 transition-colors group-hover:text-gold">
              ЭММАНУИЛ
            </span>
            <span className="text-[10px] tracking-widest text-gray-400 uppercase">
              Бельцы · Русский поток
            </span>
          </Link>

          <MainNav items={publicNavItems} />

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-1.5 text-xs font-medium sm:flex">
              <span className="text-gold">RU</span>
              <span className="text-gray-200">|</span>
              <span className="cursor-pointer text-gray-400 transition-colors hover:text-gray-700">RO</span>
              <span className="text-gray-200">|</span>
              <span className="cursor-pointer text-gray-400 transition-colors hover:text-gray-700">EN</span>
            </div>
            <MobileNav items={publicNavItems} />
          </div>
        </div>
      </Container>
    </header>
  );
}
