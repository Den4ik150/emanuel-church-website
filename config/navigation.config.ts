export type NavItem = {
  label: string;
  href: string;
};

export const publicNavItems: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "О церкви", href: "/about" },
  { label: "Служения", href: "/ministries" },
  { label: "Проповеди", href: "/sermons" },
  { label: "Мероприятия", href: "/events" },
  { label: "Расписание", href: "/schedule" },
  { label: "Галерея", href: "/gallery" },
  { label: "Новости", href: "/news" },
  { label: "Контакты", href: "/contacts" },
];

export const adminNavItems: NavItem[] = [
  { label: "Главная", href: "/admin" },
  { label: "Проповеди", href: "/admin/sermons" },
  { label: "Мероприятия", href: "/admin/events" },
  { label: "Новости", href: "/admin/news" },
  { label: "Расписание", href: "/admin/schedule" },
  { label: "Страницы", href: "/admin/pages" },
  { label: "Галерея", href: "/admin/gallery" },
  { label: "Обращения", href: "/admin/submissions" },
  { label: "Настройки", href: "/admin/settings" },
  { label: "Аккаунт", href: "/admin/account" },
];
