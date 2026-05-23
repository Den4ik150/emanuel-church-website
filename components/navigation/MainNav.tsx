"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/config/navigation.config";

type Props = {
  items: NavItem[];
};

export function MainNav({ items }: Props) {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-0.5">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
            pathname === item.href
              ? "bg-gold/10 text-gold"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
