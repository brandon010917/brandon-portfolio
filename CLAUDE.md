# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (Astro + Vite HMR)
pnpm build        # Production build
pnpm preview      # Preview production build locally
```

There is no test runner configured in this project.

## Architecture

This is an **Astro + React** portfolio site. Astro handles routing and layout; interactive UI is built as React components hydrated with `client:load`.

**Rendering model:** `.astro` files are server-rendered shells. React components are island-hydrated — always use `client:load` when mounting interactive components in Astro pages.

**Page structure** (`src/pages/index.astro`): single-page layout composed of `Navbar`, `Hero`, and `Skills` sections. New sections should follow the same pattern: create a React component, import it into `index.astro`, and add `client:load`.

**Styling:** Tailwind CSS v4 (configured via `@tailwindcss/vite`, no `tailwind.config.*` file). Design tokens are CSS custom properties defined in `src/styles/global.css` under `:root`. The design system uses OKLCH colors with a dark-mode-first green-accent theme. Custom utilities (`text-glow`, `border-glow`, `bg-grid`, `glass`, `scan-line`, `bg-gradient-hero`, `bg-gradient-card`) are defined there and should be preferred over inline styles for theme-consistent effects. The `cn()` helper (`src/lib/utils.ts`) merges Tailwind classes using `clsx` + `tailwind-merge`.

**Animations:** Use `motion/react` (Framer Motion v12). `whileInView` with `viewport={{ once: true }}` is the pattern for scroll-triggered entrance animations on section content. `AnimatePresence` + `layoutId` is used for tab transitions.

**UI components:** shadcn-style components live in `src/components/ui/`. They use `class-variance-authority` (cva) for variants. Add new primitives there following the existing `button.tsx` / `tabs.tsx` pattern.

**Path alias:** `@/` maps to `src/` (e.g., `import x from "@/assets/..."`).

**Content language:** Text content is written in Spanish (the portfolio targets a Spanish-speaking audience).
