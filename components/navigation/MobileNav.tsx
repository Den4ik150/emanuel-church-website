"use client";

import { useState } from "react";
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

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
              <span className="text-sm font-semibold tracking-widest text-gray-900">
                ЭММАНУИЛ
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
                className="p-1 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-3 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-gold/10 text-gold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-gray-100 p-4">
              <div className="flex gap-3 text-sm font-medium">
                <span className="text-gold">RU</span>
                <span className="text-gray-300">|</span>
                <span className="cursor-pointer text-gray-400 hover:text-gray-700">RO</span>
                <span className="text-gray-300">|</span>
                <span className="cursor-pointer text-gray-400 hover:text-gray-700">EN</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
