# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Individual power users, creators, and professionals who need clean, dependable cloud storage for personal and creative work without corporate red tape or dark patterns.
Secondary: Small collaborative teams and client-contractor workflows sharing assets and folders via workspaces and role permissions.

## Product Purpose

MangoCloud gives users an intuitive, lightweight cloud drive built from scratch. It solves the fragmentation and anxiety of local storage limits, hardware loss, and bloated legacy cloud tools by offering instant uploads, fast organization, reliable backups, and clear sharing controls. Success means users feel their files are secure, clutter-free, and accessible without cognitive overload.

## Positioning

"A cloud built by hand" — an honest, high-craft alternative to legacy corporate cloud monopolies (Google Drive, Dropbox, OneDrive). Free from surveillance capitalism, bloated enterprise suites, and opaque subscription tricks. Every feature exists because it serves the user directly ("If a step doesn't help you, it goes").

## Operating Context

- Responsive browser environments on desktop and mobile web.
- Uploading individual files, large media assets, and nested directory trees via drag-and-drop or file pickers.
- Managing files: previewing, sorting, starring, tagging, sharing via public or permissioned links, moving, and trash/restore cycles.
- Multi-lingual operating environment supporting English (`en`), Romanian (`ro`), and Russian (`ru`).

## Capabilities and Constraints

- **Capabilities:**
  - File and folder hierarchy (nested directories, breadcrumbs, tree navigation).
  - Cloudflare R2 storage backend with presigned/chunked upload sessions and checksum validation.
  - Multi-tier storage quotas: Sprout (Free, 5 GB), Ripe (Pro, 100 GB), Harvest (Team, 1 TB).
  - Fine-grained sharing and permissions: viewer, commenter, editor, owner roles, plus time-limited or public share links.
  - Organization utilities: Starred files, Recent files, Spam filter, Trash with recovery, Activity logs.
  - Multi-locale i18n support across web client UI.
  - Dedicated admin dashboard for system monitoring, user quotas, and service health.
- **Constraints:**
  - Web client built on React 19, Vite, Tailwind CSS v4, shadcn/ui primitives.
  - Admin client built on Vue 3, Vite, Tailwind, shadcn-vue.
  - Backend built on NestJS with Prisma ORM and PostgreSQL.
  - Preserves existing localization boundaries (`public/locales/{en,ro,ru}/`).

## Brand Commitments

- **Name:** MangoCloud (informally r-mango-cloud in developer contexts).
- **Tone & Voice:** Friendly, fresh, approachable, and craft-focused. Unapologetically indie, transparent, and direct ("Because simple should taste like mango"). Avoid corporate jargon, fake hype, or clinical enterprise sterility.
- **Visual Identity Roots:** Warm mango accent tones alongside crisp dark/light workspace neutrals. Clean typography and whitespace.

## Evidence on Hand

- Production web application in `mango-web` with functioning route structure (`/cloud/home`, `/cloud/my-cloud`, `/cloud/starred`, etc.), layouts, and marketing pages (`/`, `/about`, `/pricing`).
- Full localization strings in `mango-web/public/locales/` (`en`, `ro`, `ru`).
- Data schema models defined in `mango-api/prisma/schema/` (`node.prisma`, `user.prisma`, `workspace.prisma`, `permission.prisma`).
- Shipped pricing model in `PricingPage.tsx`: Sprout ($0 / 5GB), Ripe ($9 / 100GB), Harvest ($29 / 1TB).

## Product Principles

1. **Craft over bloat:** Every control, button, and menu must earn its presence. Eliminate unnecessary modal steps and friction.
2. **Transparent ownership:** The user always knows where their data lives, how much quota is used, who has access, and how to export or delete it.
3. **Speed and responsiveness:** File actions (uploading, renaming, moving, starring) must provide immediate feedback with optimistic updates and clear progress indicators.
4. **Honest simplicity:** Say what the product does plainly. Never obscure limitations or disguise paid upgrade triggers behind dark UX.

## Accessibility & Inclusion

- Responsive web interface designed for seamless desktop and mobile browser interaction.
- Accessible interactive elements adhering to WAI-ARIA guidelines via shadcn/ui and Radix/Base UI primitives.
- Multi-language inclusivity with complete localization parity across supported languages.
