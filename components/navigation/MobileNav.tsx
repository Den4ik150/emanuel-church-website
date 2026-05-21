"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/config/navigation.config";

type Props = {
  items: NavItem[];
  stream?: string;
};

export function MobileNav({ items, stream }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function handleStreamSwitch() {
    if (!stream) return;
    const otherStream = stream === "ro" ? "ru" : "ro";
    const newPath = pathname.replace(/^\/(ro|ru)/, `/${otherStream}`);
    setOpen(false);
    router.push(newPath);
  }

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Menu className="h-6 w-6" />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[999] flex flex-col bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <p className="text-sm font-bold tracking-widest text-gray-900">ЭММАНУИЛ / EMANUEL</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
                className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-1">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-4 py-3.5 text-base font-medium transition-colors",
                      pathname === item.href
                        ? "bg-gold/10 text-gold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer: stream switcher */}
            {stream && (
              <div className="border-t border-gray-100 p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Поток / Flux</p>
                <div className="flex rounded-md border border-gray-200 overflow-hidden text-sm font-semibold">
                  <button
                    onClick={() => { if (stream !== "ro") handleStreamSwitch(); }}
                    className={`flex-1 py-2.5 transition-colors ${
                      stream === "ro" ? "bg-gold text-white" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    🇷🇴 RO
                  </button>
                  <span className="w-px self-stretch bg-gray-200" />
                  <button
                    onClick={() => { if (stream !== "ru") handleStreamSwitch(); }}
                    className={`flex-1 py-2.5 transition-colors ${
                      stream === "ru" ? "bg-gold text-white" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    🇷🇺 RU
                  </button>
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
