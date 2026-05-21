"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PlayCircle,
  Calendar,
  Newspaper,
  Clock,
  FileText,
  Image,
  MessageSquare,
  Settings,
  UserCog,
  LogOut,
} from "lucide-react";
import type { AdminTranslations } from "@/lib/translations/admin";

const iconMap: Record<string, React.ElementType> = {
  "/admin": LayoutDashboard,
  "/admin/sermons": PlayCircle,
  "/admin/events": Calendar,
  "/admin/news": Newspaper,
  "/admin/schedule": Clock,
  "/admin/pages": FileText,
  "/admin/gallery": Image,
  "/admin/submissions": MessageSquare,
  "/admin/settings": Settings,
  "/admin/account": UserCog,
};

interface Props {
  t: AdminTranslations;
}

export function AdminSidebar({ t }: Props) {
  const pathname = usePathname();

  const navItems = [
    { label: t.nav.dashboard, href: "/admin" },
    { label: t.nav.sermons, href: "/admin/sermons" },
    { label: t.nav.events, href: "/admin/events" },
    { label: t.nav.news, href: "/admin/news" },
    { label: t.nav.schedule, href: "/admin/schedule" },
    { label: t.nav.pages, href: "/admin/pages" },
    { label: t.nav.gallery, href: "/admin/gallery" },
    { label: t.nav.submissions, href: "/admin/submissions" },
    { label: t.nav.settings, href: "/admin/settings" },
    { label: t.nav.account, href: "/admin/account" },
  ];

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="border-b border-gray-100 px-5 py-4">
        <p className="text-sm font-bold tracking-widest text-gray-900">{t.sidebar.title}</p>
        <p className="text-xs text-gray-400">{t.sidebar.subtitle}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.href] ?? LayoutDashboard;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gold/10 text-gold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign out */}
      <div className="border-t border-gray-100 p-3">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {t.sidebar.signOut}
        </button>
      </div>
    </aside>
  );
}
