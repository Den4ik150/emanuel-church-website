# Церковь Эммануил — сайт (русский поток)

Fullstack-сайт церкви Эммануил, Бельцы, Молдова. Публичная часть + панель управления для администратора.

## Стек

| Слой | Технология |
|---|---|
| Фреймворк | Next.js 16 (App Router) |
| Язык | TypeScript |
| Стили | Tailwind CSS v4 |
| UI-компоненты | shadcn/ui |
| ORM | Prisma v7 (`prisma-client` generator + `@prisma/adapter-pg`) |
| База данных | PostgreSQL |
| Аутентификация | next-auth v4 (Credentials + JWT) |
| Формы | React Hook Form v7 + Zod v4 + @hookform/resolvers |

## Быстрый старт

### 1. Требования

- Node.js ≥ 20
- pnpm ≥ 9
- PostgreSQL (локально или через облачный провайдер)

### 2. Установка

```bash
git clone <repo-url>
cd emmanuil-church-website
pnpm install
```

### 3. Переменные окружения

```bash
cp .env.example .env
# Заполните .env своими значениями
```

Обязательные переменные:

| Переменная | Описание |
|---|---|
| `DATABASE_URL` | Строка подключения PostgreSQL |
| `NEXTAUTH_SECRET` | Случайный секрет — `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Полный URL приложения (напр. `http://localhost:3000`) |

### 4. База данных

```bash
# Применить миграции
pnpm prisma migrate dev

# Создать первого администратора (admin@emmanuil.md / admin123)
pnpm db:seed
```

### 5. Запуск

```bash
pnpm dev        # http://localhost:3000
```

## Скрипты

| Команда | Действие |
|---|---|
| `pnpm dev` | Dev-сервер с hot reload |
| `pnpm build` | Production-сборка |
| `pnpm start` | Запуск production-сборки |
| `pnpm lint` | ESLint-проверка |
| `pnpm db:seed` | Создание администратора (`admin@emmanuil.md` / `admin123`) |
| `pnpm prisma generate` | Перегенерация Prisma-клиента после изменений схемы |
| `pnpm prisma migrate dev --name <name>` | Создание и применение новой миграции |

## Структура проекта

```
app/
  (public)/          — 13 публичных страниц
  admin/
    login/           — страница входа
    (protected)/     — все страницы панели управления (за авторизацией)
  api/auth/          — next-auth API-маршрут

features/<entity>/   — схема Zod, форма, кнопка удаления (по сущности)
server/
  actions/           — Server Actions (create, update, delete)
  queries/           — запросы к БД (admin + public варианты)

components/
  layout/            — Header, Footer
  navigation/        — MainNav, MobileNav
  shared/            — Container, Section, AuthSessionProvider
  admin/             — AdminSidebar

lib/
  prisma.ts          — синглтон PrismaClient (с PrismaPg-адаптером)
  utils.ts           — cn() (clsx + tailwind-merge)

prisma/
  schema.prisma      — 11 моделей
  seed.ts            — начальный администратор
  migrations/        — история миграций
```

## Панель управления

URL: `/admin` → редирект на `/admin/login` без авторизации.

После `pnpm db:seed`:
- Email: `admin@emmanuil.md`
- Пароль: `admin123`

**Разделы:** Проповеди, События, Новости, Расписание, Галерея, Статические страницы, Обращения (контакты + молитвенные просьбы), Настройки.

## Деплой на Vercel

1. Создайте проект в [Vercel](https://vercel.com/new) и подключите репозиторий
2. Добавьте переменные окружения в настройках проекта:
   - `DATABASE_URL` — строка подключения к production PostgreSQL
   - `NEXTAUTH_SECRET` — сгенерированный секрет
   - `NEXTAUTH_URL` — `https://your-domain.com`
3. Рекомендованные провайдеры PostgreSQL: [Neon](https://neon.tech), [Supabase](https://supabase.com), [Railway](https://railway.app)

> **Важно:** После деплоя выполните `pnpm prisma migrate deploy` (или настройте `postinstall`-скрипт) и `pnpm db:seed` для создания первого администратора.
