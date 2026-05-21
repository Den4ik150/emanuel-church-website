import type { Stream } from "@/lib/generated/prisma/client";

const ru = {
  // Sidebar
  sidebar: {
    title: "ЭММАНУИЛ",
    subtitle: "Панель управления",
    signOut: "Выйти",
  },
  // Switcher
  switcher: {
    all: "Все",
  },
  // Dashboard
  dashboard: {
    heading: "Панель управления",
    descAll: "Все потоки — RO и RU",
    descStream: "Показывается поток",
    recentSermons: "Последние проповеди",
    upcomingEvents: "Ближайшие мероприятия",
    recentNews: "Последние новости",
    noRecords: "Нет записей",
    all: "Все →",
  },
  // Nav labels
  nav: {
    dashboard: "Главная",
    sermons: "Проповеди",
    events: "Мероприятия",
    news: "Новости",
    schedule: "Расписание",
    pages: "Страницы",
    gallery: "Галерея",
    submissions: "Обращения",
    settings: "Настройки",
    account: "Аккаунт",
  },
  // Common
  common: {
    add: "+ Добавить",
    edit: "Изменить",
    delete: "Удалить",
    published: "Опубликовано",
    draft: "Черновик",
    stream: "Поток",
    actions: "Действия",
    status: "Статус",
    title: "Название",
    date: "Дата",
    locale: "ru-RU",
  },
  // Sermons
  sermons: {
    heading: "Проповеди",
    colPreacher: "Проповедник",
    colTopic: "Тема",
    empty: "Проповедей пока нет",
    confirmDelete: "Удалить эту проповедь? Действие необратимо.",
  },
  // Events
  events: {
    heading: "Мероприятия",
    colLocation: "Место",
    colFeatured: "Главное",
    empty: "Мероприятий пока нет",
    confirmDelete: "Удалить это мероприятие?",
    yes: "Да",
    no: "Нет",
  },
  // News
  news: {
    heading: "Новости",
    empty: "Новостей пока нет",
    confirmDelete: "Удалить эту новость?",
  },
  // Schedule
  schedule: {
    heading: "Расписание",
    colDay: "День",
    colTime: "Время",
    colOrder: "Порядок",
    colLocation: "Место",
    active: "Активно",
    hidden: "Скрыто",
    empty: "Расписание пусто",
    confirmDelete: "Удалить этот пункт расписания?",
  },
  // Gallery
  gallery: {
    heading: "Галерея",
    colPhotos: "Фото",
    empty: "Альбомов пока нет",
    confirmDelete: "Удалить этот альбом?",
  },
  // Pages
  pages: {
    heading: "Страницы",
    colSlug: "Слаг",
    empty: "Страниц пока нет",
    confirmDelete: "Удалить эту страницу?",
  },
  // Submissions
  submissions: {
    heading: "Обращения",
    contactsLabel: "Контактные формы",
    prayersLabel: "Молитвенные просьбы",
    colName: "Имя",
    colEmail: "Email",
    colPhone: "Телефон",
    colMessage: "Сообщение",
    colRequest: "Просьба",
    colPrivate: "Приватно",
    colDate: "Дата",
    emptyContacts: "Обращений нет",
    emptyPrayers: "Просьб нет",
    yes: "Да",
    no: "Нет",
  },
  // Settings
  settings: {
    heading: "Настройки сайта",
    desc: "Глобальные параметры, отображаемые на сайте.",
    pinHeading: "Защита потоков (PIN-коды)",
    pinDesc: "Установите PIN для каждого потока. Без PIN нельзя редактировать контент чужого потока.",
  },
  // Account
  account: {
    heading: "Мой аккаунт",
  },
};

const ro: typeof ru = {
  sidebar: {
    title: "EMANUEL",
    subtitle: "Panou de control",
    signOut: "Ieșire",
  },
  switcher: {
    all: "Toate",
  },
  dashboard: {
    heading: "Panou de control",
    descAll: "Toate fluxurile — RO și RU",
    descStream: "Se afișează fluxul",
    recentSermons: "Predici recente",
    upcomingEvents: "Evenimente viitoare",
    recentNews: "Știri recente",
    noRecords: "Nu există înregistrări",
    all: "Toate →",
  },
  nav: {
    dashboard: "Acasă",
    sermons: "Predici",
    events: "Evenimente",
    news: "Știri",
    schedule: "Program",
    pages: "Pagini",
    gallery: "Galerie",
    submissions: "Sesizări",
    settings: "Setări",
    account: "Cont",
  },
  common: {
    add: "+ Adaugă",
    edit: "Editează",
    delete: "Șterge",
    published: "Publicat",
    draft: "Ciornă",
    stream: "Flux",
    actions: "Acțiuni",
    status: "Statut",
    title: "Titlu",
    date: "Dată",
    locale: "ro-RO",
  },
  sermons: {
    heading: "Predici",
    colPreacher: "Predicator",
    colTopic: "Temă",
    empty: "Nu există predici",
    confirmDelete: "Ștergeți această predică? Acțiunea este ireversibilă.",
  },
  events: {
    heading: "Evenimente",
    colLocation: "Locație",
    colFeatured: "Principal",
    empty: "Nu există evenimente",
    confirmDelete: "Ștergeți acest eveniment?",
    yes: "Da",
    no: "Nu",
  },
  news: {
    heading: "Știri",
    empty: "Nu există știri",
    confirmDelete: "Ștergeți această știre?",
  },
  schedule: {
    heading: "Program",
    colDay: "Zi",
    colTime: "Oră",
    colOrder: "Ordine",
    colLocation: "Locație",
    active: "Activ",
    hidden: "Ascuns",
    empty: "Programul este gol",
    confirmDelete: "Ștergeți acest element din program?",
  },
  gallery: {
    heading: "Galerie",
    colPhotos: "Foto",
    empty: "Nu există albume",
    confirmDelete: "Ștergeți acest album?",
  },
  pages: {
    heading: "Pagini",
    colSlug: "Slug",
    empty: "Nu există pagini",
    confirmDelete: "Ștergeți această pagină?",
  },
  submissions: {
    heading: "Sesizări",
    contactsLabel: "Formulare de contact",
    prayersLabel: "Rugăciuni",
    colName: "Nume",
    colEmail: "Email",
    colPhone: "Telefon",
    colMessage: "Mesaj",
    colRequest: "Cerere",
    colPrivate: "Privat",
    colDate: "Dată",
    emptyContacts: "Nu există sesizări",
    emptyPrayers: "Nu există rugăciuni",
    yes: "Da",
    no: "Nu",
  },
  settings: {
    heading: "Setări site",
    desc: "Parametri globali afișați pe site.",
    pinHeading: "Protecție fluxuri (coduri PIN)",
    pinDesc: "Setați un PIN pentru fiecare flux. Fără PIN nu se poate edita conținutul altui flux.",
  },
  account: {
    heading: "Contul meu",
  },
};

export type AdminTranslations = typeof ru;

/** Returns RO translations when stream is RO, Russian otherwise (null = all streams = RU default) */
export function getAdminT(stream: Stream | null): AdminTranslations {
  return stream === "RO" ? ro : ru;
}
