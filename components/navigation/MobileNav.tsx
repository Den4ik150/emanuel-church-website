"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/config/navigation.config";

type Props = {
  items: NavItem[];
};

export function MobileNav({ items }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
                <p className="text-sm font-bold tracking-widest text-gray-900">ЭММАНУИЛ</p>
                <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                  Бельцы · Русский поток
                </p>
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

            {/* Language switcher */}
            <div className="border-t border-gray-100 p-5">
              <div className="flex gap-3 text-sm font-medium">
                <span className="text-gold">RU</span>
                <span className="text-gray-300">|</span>
                <span className="cursor-pointer text-gray-400 hover:text-gray-700">RO</span>
                <span className="text-gray-300">|</span>
                <span className="cursor-pointer text-gray-400 hover:text-gray-700">EN</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
