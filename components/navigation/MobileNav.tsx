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
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Выбрать поток / Selectează flux
                </p>
                <div className="flex flex-col gap-2">
                  {/* RO */}
                  <button
                    onClick={() => { if (stream !== "ro") { handleStreamSwitch(); } }}
                    className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                      stream === "ro"
                        ? "border-gold bg-gold/5 cursor-default"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-2xl">🇷🇴</span>
                    <div className="flex-1">
                      <p className={`font-bold ${stream === "ro" ? "text-gold" : "text-gray-800"}`}>
                        Flux Român
                      </p>
                      <p className="text-xs text-gray-400">Servicii în limba română</p>
                    </div>
                    {stream === "ro" && (
                      <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-white">
                        ACTIV
                      </span>
                    )}
                  </button>

                  {/* RU */}
                  <button
                    onClick={() => { if (stream !== "ru") { handleStreamSwitch(); } }}
                    className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                      stream === "ru"
                        ? "border-gold bg-gold/5 cursor-default"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-2xl">🇷🇺</span>
                    <div className="flex-1">
                      <p className={`font-bold ${stream === "ru" ? "text-gold" : "text-gray-800"}`}>
                        Русский поток
                      </p>
                      <p className="text-xs text-gray-400">Богослужения на русском языке</p>
                    </div>
                    {stream === "ru" && (
                      <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-white">
                        АКТИВ
                      </span>
                    )}
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
