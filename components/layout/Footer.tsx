import Link from "next/link";
import { Instagram, Send, Youtube } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { publicNavItems } from "@/config/navigation.config";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-lg font-bold tracking-widest text-white">ЭММАНУИЛ</p>
            <p className="text-sm text-gray-400">Бельцы · Русский поток</p>
            <p className="text-sm italic text-gold">«соль»</p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Навигация
            </p>
            <ul className="space-y-2">
              {publicNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Контакты
            </p>
            <address className="not-italic space-y-2 text-sm text-gray-400">
              <p>г. Бельцы, Молдова</p>
              <p>+373 — — — — — —</p>
              <p>emmanuil@example.com</p>
            </address>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Церковь Эммануил, Бельцы. Все права защищены.
        </div>
      </Container>
    </footer>
  );
}
