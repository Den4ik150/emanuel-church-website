# emanuel-church-website
Web application for local baptist church in Balti

# Church Website Project README

## 1. Project Overview

**Project name:** Church Website
**Type:** Fullstack web application
**Goal:** Build a modern, scalable, maintainable website for the church with a public-facing site and an admin panel for content management.

## 2. Core Development Principles

* Build step by step, without skipping architecture.
* Keep the stack modern but practical.
* Record every major decision here.
* Record every structural change here.
* Record progress after each meaningful implementation step.
* Treat this file as the single source of truth for project scope and progress.

## 3. Working Method

We will use this README to:

* store the project vision
* record the selected tech stack
* define the feature scope
* track development phases
* log decisions and changes
* avoid losing context between sessions

## 4. Proposed Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui

### Backend

* Next.js Route Handlers / Server Actions
* Prisma ORM
* PostgreSQL

### Infrastructure

* Supabase or Neon for database
* Supabase Storage or Cloudinary for media
* Vercel for deployment

### Validation and Forms

* Zod
* React Hook Form

## 5. Target Product Structure

### Public Section

* Home page
* About the church
* Ministries / service areas
* Sermons
* Events
* Schedule
* Gallery
* Contacts
* Prayer request form
* Donations page
* News / blog

### Admin Section

* Admin login
* Dashboard
* Manage sermons
* Manage events
* Manage news
* Manage schedule
* Manage gallery
* Manage static pages
* Manage prayer requests / contact submissions

## 6. Planned Development Phases

### Phase 1 — Discovery and Planning

* Define exact goals
* Define user roles
* Define required pages
* Define content structure
* Define MVP scope

### Phase 2 — Architecture

* Finalize stack
* Design folder structure
* Design database schema
* Define routing
* Define admin access model

### Phase 3 — UI Foundation

* Define visual style
* Define reusable components
* Build layout
* Build header / footer / navigation

### Phase 4 — MVP Development

* Public pages
* Basic admin panel
* Database connection
* CRUD for core content

### Phase 5 — Expansion

* Authentication
* Media upload
* SEO
* Multi-language support
* Donation integrations

### Phase 6 — Production Readiness

* Deployment
* Performance optimization
* Security hardening
* Backups
* Error handling

## 7. Product Requirements (Confirmed)

### 7.1 Church Identity

* **Church name:** Церковь Эммануил | Бельцы, русский поток
* **Current slogan:** «соль»
* **Scope:** one church, currently building the website for the Russian stream first

### 7.2 Product Type

* Public-facing fullstack church website
* No personal accounts for ordinary church members
* Public site with admin-only access for content management
* Content-oriented structure similar to a church information portal / blog

### 7.3 Supported Languages

* Russian
* Romanian
* English
* **Primary language:** Russian
* Russian content is the initial priority
* Site structure should support language switching for all main pages

### 7.4 Core Public Pages for MVP

* Home
* About the Church
* Ministries / Служения
* Sermons / Проповеди
* Events / Мероприятия
* Schedule / Расписание
* Contacts
* Blog / News
* Gallery

### 7.5 Additional Public Pages Planned

* Church History
* Mission and Values
* FAQ
* First Visit / How to Visit Us

### 7.6 Home Page Requirements

The home page should include:

* Welcome banner / hero section
* Nearest service with time information
* Short introduction about the church
* Upcoming events block
* Church location map
* Contact form
* Block for new visitors / newcomers
* Banner with upcoming service date and time
* Optional visitor counter / site visits counter for a selected period

### 7.7 Sermons Section Requirements

* Sermons are based primarily on YouTube livestreams / videos
* Each sermon item should support:

  * title
  * topic
  * preacher
  * date
  * visual banner / thumbnail
  * link to the full livestream or video
  * timestamp link to the exact sermon start inside the livestream
  * optional attached notes / materials
* Filtering required by:

  * sermon title
  * topic
  * date
* No separate page required for each sermon in MVP

### 7.8 Events Section Requirements

* Dedicated full events section required
* Each event should support:

  * title
  * description
  * date
  * time
  * image
  * optional registration form in future
* Event registration is postponed for now
* Architecture should allow event registration to be added later without major redesign

### 7.9 Schedule Requirements

* Separate section for regular schedule is required
* Initial schedule types:

  * Sunday service
  * Youth meeting
  * Home groups
* Schedule must be editable through the admin panel

### 7.10 Gallery Requirements

* Gallery is required
* Preferred structure:

  * albums
  * date for each album
  * description for each album
  * support for photos
  * support for videos
* Albums may be tied to events, ministries, camps, and other church activities

### 7.11 Ministries / Church Activity Content

The site should support ministry-related content sections, potentially including:

* Sunday services
* Youth fellowships / youth meetings
* Small groups / home groups
* Youth camps
  Each section may later contain dated posts, photos, videos, and recap materials.

### 7.12 Forms

Required forms for MVP:

* Contact form
* Prayer request form

Constraints:

* Prayer requests must be private
* Forms should be protected from spam
* Event registration is postponed
* No ministry application form
* No pastor question form

### 7.13 Donations

* Donations are postponed
* May be added in a later phase

### 7.14 Admin Panel Requirements

* Admin panel required from the start
* Multiple admins / content editors expected
* Editable entities from admin panel:

  * events
  * sermons
  * news
  * schedule
  * static pages
  * gallery
  * form submissions
* No advanced role system required for MVP
* Authentication only for administration area

### 7.15 Access Model

* No user registration for public visitors
* No personal accounts for regular members
* Public website + protected admin area only

### 7.16 Design Direction

* Initial style: modern minimalism
* Design should remain flexible for later refinement by another designer
* Initial preferred palette references:

  * white
  * gray
  * black
  * gold
  * blue
  * light blue
  * yellow
  * green
  * lime
* Existing assets:

  * approximate logo exists
  * photos exist
* Fonts should be neutral, readable, non-decorative
* Dark mode is optional, not required for MVP

### 7.17 Contacts Section Requirements

Must support:

* church address
* embedded map
* preacher / church contact phone
* church email
* social links

Initial social platforms:

* Instagram
* Telegram
* YouTube

### 7.18 Content Strategy for Development

* Use placeholders initially for:

  * texts
  * photos
  * videos
  * sermons
  * schedules
  * ministry descriptions
* Real content will be inserted later through editing

### 7.19 SEO and Optimization

* SEO, full technical optimization, domain launch, and advanced production hardening are important but postponed to later stages
* Mobile responsiveness and long-term performance remain required architectural goals from the beginning

### 7.20 MVP Scope Principle

MVP must include:

* a launch-ready site structure
* all essential public sections
* basic content management through admin panel
* stable architecture without unnecessary overload

MVP should avoid:

* unnecessary complexity
* excessive decorative elements
* unused features

### 7.21 Development Workflow Requirements

* Development must be staged carefully
* Full context must be documented in README
* Architecture must be designed before implementation
* Guidance must be step-by-step through folders, files, and modules
* The project should be built with future growth in mind even if MVP is smaller
* Backups / rollback safety must be considered during development

## 8. Progress Tracker

### Current Status

* Project initialized at planning stage.
* README created as persistent project context.
* Initial product requirements gathered and confirmed.
* Project positioned as a public multilingual church website with admin panel.
* Next step: convert requirements into technical architecture, entities, and MVP implementation plan.

## 9. Decision Log

### Decision 001

* Use a single fullstack architecture instead of splitting frontend and backend unnecessarily.
* Reason: simpler maintenance, faster development, better consistency.

### Decision 002

* Start from architecture and planning before writing implementation code.
* Reason: reduces rework and confusion.

## 10. Decision Log

### Decision 001

* Use a single fullstack architecture instead of splitting frontend and backend unnecessarily.
* Reason: simpler maintenance, faster development, better consistency.

### Decision 002

* Start from architecture and planning before writing implementation code.
* Reason: reduces rework and confusion.

### Decision 003

* Build a public site with admin-only access and no ordinary member accounts.
* Reason: matches the actual use case and reduces unnecessary complexity.

### Decision 004

* Russian is the primary language, but architecture must support Romanian and English.
* Reason: multilingual expansion is required from the beginning.

### Decision 005

* Event registration and donations are postponed, but architecture should allow them later.
* Reason: keeps MVP focused while preserving scalability.

## 11. Change Log

### Initial Entry

* Created base project README.
* Added stack proposal.
* Added feature scope draft.
* Added phased roadmap.
* Added decision log and progress tracker.

### Session Update 001

* Added confirmed church identity and project scope.
* Added multilingual requirement: Russian, Romanian, English.
* Added confirmed MVP page structure.
* Added home page requirements.
* Added sermons section behavior and filtering requirements.
* Added events, schedule, gallery, forms, and admin requirements.
* Added content placeholder strategy.
* Added workflow requirement to document all progress in README and build step by step.

## 12. Next Required Input

Before implementation, we still need to define:

1. Final brand direction (temporary palette vs final palette)
2. Exact ministries list for first version
3. Whether Russian stream branding must explicitly appear in header / footer
4. Whether Romanian stream will later reuse the same codebase
5. Exact admin access strategy (single shared admin area or separated editor permissions later)
6. Whether blog/news and ministry posts should be separate content types or unified
7. Whether gallery albums should be linked directly to events in the database
8. Whether sermons should be stored as independent entries or as embedded video-based records only
9. Preferred deployment path for development environment
10. Git and backup workflow

## 13. Documentation and Progress Rules

All important project information must be fixed in this README, including:

* folder structure
* file naming conventions
* architecture decisions
* dependency decisions
* database entities
* route structure
* admin panel structure
* every meaningful change
* implementation progress by session
* blockers and risks
* backup / rollback checkpoints

### Mandatory Documentation Policy

Before or immediately after each major step, record:

1. What was added
2. What was changed
3. Which folders were created
4. Which files were created
5. Which files were edited
6. Why the change was made
7. What remains next
8. What commit / backup point should exist

### README Update Scope

The README should gradually contain:

* project overview
* product scope
* technical architecture
* database models
* route map
* folder map
* admin features
* implementation phases
* session log
* change log
* rollback points

## 14. Implementation Roadmap (Ordered)

### Stage 1 — Final Technical Planning

Goal:

* freeze the initial architecture before coding

Tasks:

* finalize stack
* define MVP boundaries
* define database entities
* define route structure
* define admin scope
* define multilingual strategy
* define content model strategy

Deliverables:

* architecture blueprint
* entity list
* route map
* implementation order

### Stage 2 — Repository and Project Bootstrap

Goal:

* create the project skeleton safely

Tasks:

* create repository
* initialize Next.js project with TypeScript
* configure Tailwind CSS
* configure ESLint / formatting
* prepare base app structure
* prepare README project sections for technical implementation
* create first backup / checkpoint

Deliverables:

* working base project
* initial folder structure
* first commit checkpoint

### Stage 3 — Core Folder Architecture

Goal:

* prepare a scalable structure before feature coding

Tasks:

* define app routing structure
* define components folders
* define features folders
* define shared utilities folders
* define content / constants / config folders
* define admin area structure
* define lib and server boundaries

Deliverables:

* stable folder structure
* documented naming conventions
* documented architectural boundaries

### Stage 4 — UI Foundation

Goal:

* build the base visual shell of the project

Tasks:

* create global layout
* create header
* create footer
* create navigation
* create language switch placeholder
* create reusable section wrappers
* create design tokens / theme variables

Deliverables:

* reusable layout system
* consistent base UI

### Stage 5 — Public Page Skeletons

Goal:

* create all main public routes as structured placeholders

Tasks:

* build Home page shell
* build About page shell
* build Ministries page shell
* build Sermons page shell
* build Events page shell
* build Schedule page shell
* build Contacts page shell
* build Blog / News page shell
* build Gallery page shell
* optionally add History / Mission / FAQ / First Visit shells

Deliverables:

* navigable site skeleton
* placeholder content structure for all main pages

### Stage 6 — Database and Prisma Setup

Goal:

* connect persistent data layer

Tasks:

* configure PostgreSQL
* configure Prisma
* design initial schema
* generate first migrations
* prepare seed strategy if needed
* define data access conventions

Deliverables:

* working database connection
* first schema migration
* documented models

### Stage 7 — Admin Authentication and Protected Area

Goal:

* create secure administration access

Tasks:

* choose auth strategy
* create admin login
* protect admin routes
* create base admin layout
* create admin dashboard shell

Deliverables:

* protected admin area
* login flow for admins

### Stage 8 — Core Content Management

Goal:

* connect admin panel to core church content

Tasks:

* CRUD for sermons
* CRUD for events
* CRUD for news
* CRUD for schedule
* CRUD for pages
* CRUD for gallery albums
* basic submissions view for forms

Deliverables:

* usable content management system
* editable public content

### Stage 9 — Public Dynamic Data Integration

Goal:

* replace placeholders with real dynamic content

Tasks:

* connect public pages to database content
* render sermons from admin data
* render events from admin data
* render news from admin data
* render gallery from admin data
* render schedule from admin data

Deliverables:

* functional public website powered by database content

### Stage 10 — Forms and Submission Flow

Goal:

* add communication features safely

Tasks:

* create contact form
* create prayer request form
* add spam protection strategy
* store submissions or forward appropriately
* make prayer requests private in admin area

Deliverables:

* working forms
* protected submission flow

### Stage 11 — Media and Attachment Handling

Goal:

* support real-world church content uploads

Tasks:

* define upload strategy
* support image uploads
* support gallery media
* support sermon material attachments
* prepare optional video / external link handling

Deliverables:

* media-ready admin workflow

### Stage 12 — Multilingual Expansion Layer

Goal:

* prepare and/or implement multilingual content handling

Tasks:

* finalize i18n routing strategy
* define translated page handling
* define translated content handling
* connect language switcher
* decide MVP translation depth

Deliverables:

* multilingual-ready or multilingual-active system

### Stage 13 — Stabilization and MVP Release Preparation

Goal:

* make the first version stable enough for review

Tasks:

* clean codebase
* remove dead code
* test navigation and admin flows
* improve responsiveness
* fix critical UI issues
* prepare demo / review version

Deliverables:

* stable MVP candidate

### Stage 14 — Post-MVP Expansion

Potential future additions:

* event registration
* donations
* deeper SEO
* analytics
* advanced permissions
* search
* public filtering enhancements
* improved media library
* Romanian stream expansion using same codebase

## 15. Technical Architecture Blueprint v1

### 15.1 Final Recommended Stack

#### Core Framework

* Next.js (App Router)
* TypeScript

#### Styling and UI

* Tailwind CSS
* shadcn/ui
* lucide-react
* class-variance-authority
* clsx / tailwind-merge

#### Data and Backend

* PostgreSQL
* Prisma ORM
* Next.js Server Actions and Route Handlers
* Zod for schema validation

#### Forms

* React Hook Form
* Zod resolver

#### Authentication

* Admin-only authentication
* Recommended MVP choice: Auth.js with credentials-based login or email-based admin auth
* Public users do not have accounts

#### Storage and Media

* MVP: structured external links and local placeholders during development
* Growth path: Supabase Storage or Cloudinary

#### Tooling

* ESLint
* Prettier (optional but recommended)
* Git + GitHub
* environment variables via .env

### 15.2 Architecture Principles

* Single fullstack codebase
* Public site and admin panel in one project
* Scalable structure from day one
* Content-first architecture
* Minimal but extensible admin system
* Clear separation between UI, business logic, data access, and validation
* README-driven progress tracking
* Git checkpoints for rollback safety

### 15.3 High-Level Application Areas

The application is divided into four main areas:

1. Public-facing website
2. Admin panel
3. Server/data layer
4. Shared UI and utilities

### 15.4 Route Strategy

#### Public Routes

* /
* /about
* /ministries
* /sermons
* /events
* /schedule
* /gallery
* /news
* /contacts
* /history
* /mission
* /faq
* /first-visit

#### Admin Routes

* /admin/login
* /admin
* /admin/sermons
* /admin/events
* /admin/news
* /admin/schedule
* /admin/pages
* /admin/gallery
* /admin/submissions
* /admin/settings

#### Future i18n-Aware Version

The route system should be designed so it can later become:

* /ru/...
* /ro/...
* /en/...

For MVP, implementation may begin with Russian-first routing, but the codebase must remain ready for multilingual extension.

### 15.5 Folder Structure Blueprint

Recommended root structure:

```text
project-root/
├─ README.md
├─ package.json
├─ next.config.ts
├─ tsconfig.json
├─ .env
├─ .env.example
├─ public/
│  ├─ images/
│  ├─ icons/
│  └─ placeholders/
├─ prisma/
│  ├─ schema.prisma
│  ├─ migrations/
│  └─ seed.ts
├─ src/
│  ├─ app/
│  │  ├─ (public)/
│  │  │  ├─ page.tsx
│  │  │  ├─ about/page.tsx
│  │  │  ├─ ministries/page.tsx
│  │  │  ├─ sermons/page.tsx
│  │  │  ├─ events/page.tsx
│  │  │  ├─ schedule/page.tsx
│  │  │  ├─ gallery/page.tsx
│  │  │  ├─ news/page.tsx
│  │  │  ├─ contacts/page.tsx
│  │  │  ├─ history/page.tsx
│  │  │  ├─ mission/page.tsx
│  │  │  ├─ faq/page.tsx
│  │  │  └─ first-visit/page.tsx
│  │  ├─ admin/
│  │  │  ├─ login/page.tsx
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ sermons/page.tsx
│  │  │  ├─ events/page.tsx
│  │  │  ├─ news/page.tsx
│  │  │  ├─ schedule/page.tsx
│  │  │  ├─ pages/page.tsx
│  │  │  ├─ gallery/page.tsx
│  │  │  ├─ submissions/page.tsx
│  │  │  └─ settings/page.tsx
│  │  ├─ api/
│  │  │  └─ ...
│  │  ├─ layout.tsx
│  │  └─ globals.css
│  ├─ components/
│  │  ├─ ui/
│  │  ├─ layout/
│  │  ├─ navigation/
│  │  ├─ shared/
│  │  └─ admin/
│  ├─ features/
│  │  ├─ sermons/
│  │  ├─ events/
│  │  ├─ news/
│  │  ├─ schedule/
│  │  ├─ gallery/
│  │  ├─ pages/
│  │  ├─ contacts/
│  │  ├─ prayer-requests/
│  │  ├─ auth/
│  │  └─ settings/
│  ├─ lib/
│  │  ├─ prisma.ts
│  │  ├─ utils.ts
│  │  ├─ validations/
│  │  ├─ constants/
│  │  └─ permissions/
│  ├─ server/
│  │  ├─ db/
│  │  ├─ actions/
│  │  ├─ queries/
│  │  ├─ services/
│  │  └─ auth/
│  ├─ types/
│  ├─ config/
│  ├─ hooks/
│  └─ content/
│     └─ placeholders/
└─ docs/
   ├─ architecture/
   ├─ backups/
   └─ session-notes/
```

### 15.6 Folder Responsibility Rules

#### `src/app/`

Contains routing, layouts, pages, route handlers, and route-level composition only.

#### `src/components/`

Reusable presentation components.
Should not contain direct database logic.

#### `src/features/`

Feature-specific UI, forms, local schemas, helpers, and composition for each domain.
Each feature should encapsulate its own behavior as much as practical.

#### `src/lib/`

Shared utilities, constants, validators, generic helper logic.

#### `src/server/`

Server-side logic only.
Contains data access, business rules, actions, services, and auth helpers.
No client-side rendering code here.

#### `src/types/`

Shared TypeScript types that are not Prisma-generated types.

#### `src/config/`

Static app configuration such as navigation config, metadata defaults, admin menu config.

#### `src/content/`

Placeholder content or local structured content during early development.

#### `docs/`

Extra architectural notes, backup logs, rollback notes, and session summaries when needed.

### 15.7 Naming Conventions

#### General

* Use lowercase folder names
* Use kebab-case for route folders
* Use PascalCase for React component files
* Use camelCase for utility files unless file represents a React component
* Use descriptive names, avoid vague names like `data.ts` unless scoped clearly

#### Examples

* `HeroSection.tsx`
* `UpcomingEvents.tsx`
* `AdminSidebar.tsx`
* `sermon-form.schema.ts`
* `create-sermon.ts`
* `getUpcomingEvents.ts`
* `navigation.config.ts`

### 15.8 MVP Data Model Strategy

The MVP should use distinct content entities rather than one generic “post” model for everything.
This avoids confusion in the admin panel and public rendering.

Recommended separate entities:

* AdminUser
* StaticPage
* Sermon
* Event
* ScheduleItem
* NewsPost
* GalleryAlbum
* GalleryItem
* ContactSubmission
* PrayerRequest
* SiteSetting

### 15.9 Initial Database Entity Definitions

#### AdminUser

Purpose:

* administration access only

Suggested fields:

* id
* email
* passwordHash
* name
* isActive
* createdAt
* updatedAt

#### StaticPage

Purpose:

* editable pages like About, Mission, FAQ, First Visit, History

Suggested fields:

* id
* slug
* title
* excerpt
* content
* seoTitle
* seoDescription
* isPublished
* createdAt
* updatedAt

#### Sermon

Purpose:

* sermon listing records based on YouTube livestreams/videos

Suggested fields:

* id
* title
* topic
* preacher
* description
* sermonDate
* thumbnailUrl
* videoUrl
* timestampSeconds
* notesUrl
* isPublished
* createdAt
* updatedAt

#### Event

Purpose:

* church events and planned activities

Suggested fields:

* id
* title
* slug
* description
* eventDate
* eventTimeLabel
* location
* imageUrl
* isFeatured
* isPublished
* createdAt
* updatedAt

#### ScheduleItem

Purpose:

* recurring ministry schedule entries

Suggested fields:

* id
* title
* category
* weekday
* startTime
* endTime
* location
* description
* displayOrder
* isActive
* createdAt
* updatedAt

#### NewsPost

Purpose:

* updates, church blog/news entries

Suggested fields:

* id
* title
* slug
* excerpt
* content
* coverImageUrl
* publishedAt
* isPublished
* createdAt
* updatedAt

#### GalleryAlbum

Purpose:

* event/ministry/camp albums

Suggested fields:

* id
* title
* slug
* description
* albumDate
* coverImageUrl
* isPublished
* createdAt
* updatedAt

#### GalleryItem

Purpose:

* media items inside albums

Suggested fields:

* id
* albumId
* type
* title
* fileUrl
* thumbnailUrl
* description
* displayOrder
* createdAt
* updatedAt

#### ContactSubmission

Purpose:

* public contact form submissions

Suggested fields:

* id
* name
* email
* phone
* message
* status
* createdAt

#### PrayerRequest

Purpose:

* private prayer requests

Suggested fields:

* id
* name
* email
* phone
* message
* isPrivate
* status
* createdAt

#### SiteSetting

Purpose:

* site-wide editable values

Suggested fields:

* id
* key
* value
* group
* updatedAt

### 15.10 Multilingual Strategy Recommendation

Because Russian is primary but Romanian and English are planned, the architecture should be multilingual-ready from the beginning.

Recommended staged approach:

1. Build MVP with Russian-first content
2. Design route/config layer to support locale-based navigation later
3. Keep page labels/navigation/messages centralized in config dictionaries
4. Delay full translated database content until after MVP unless multilingual launch is mandatory

Two possible content strategies later:

* Separate translation tables per entity
* JSON-based localized fields

Recommended for maintainability:

* start simple with Russian content
* later add translation tables for content-heavy entities

### 15.11 Admin Panel MVP Scope

The admin panel must allow:

* login
* dashboard overview
* manage sermons
* manage events
* manage news posts
* manage schedule items
* manage static pages
* manage gallery albums and media items
* view contact submissions
* view prayer requests privately
* manage basic site settings

### 15.12 Public MVP Scope

Public MVP must include:

* full navigation shell
* structured public pages
* church identity presence
* sermons list
* events list
* schedule list
* gallery albums
* contact information
* contact form
* prayer request form
* blog/news list
* editable static pages via admin

### 15.13 What Is Explicitly Deferred

Deferred until post-MVP unless requirements change:

* public member accounts
* event registration flow
* online donations integration
* advanced SEO implementation
* analytics dashboards
* complex role hierarchy
* search engine across all content
* full dark mode system
* advanced media library workflow

### 15.14 Backup and Rollback Workflow

Mandatory development safety process:

1. Before major structural changes, create a git commit checkpoint
2. After each completed stage, create a named commit
3. Record commit purpose in README session log
4. For risky refactors, create a backup branch
5. Never combine major architecture changes and feature work in one undocumented step

Recommended commit style:

* `chore: bootstrap nextjs church project`
* `feat: add public route skeletons`
* `feat: add prisma schema for core entities`
* `feat: add admin auth flow`
* `refactor: reorganize feature modules`

### 15.15 Session Log Format

For each implementation session, add an entry like:

* Session number
* Date
* Goal
* Added folders
* Added files
* Updated files
* Decisions made
* Risks/blockers
* Next step
* Commit/checkpoint reference

### 15.16 Current Session Plan

The immediate next work items are:

1. Freeze this blueprint as the working architecture baseline
2. Create the first implementation checklist for Stage 2
3. Start project bootstrap only after README is aligned with this architecture

## 16. Status of Unresolved Questions

* Church branding not defined
* Final database entities not defined
* Final MVP scope not defined
* Deployment choices not finalized
* Auth strategy not finalized
