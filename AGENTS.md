# AGENTS.md - Brandon Portfolio

## Commands

```bash
pnpm dev          # Start dev server at localhost:4321
pnpm build        # Build production site to ./dist/
pnpm preview      # Preview build locally
pnpm astro ...   # Run Astro CLI commands (e.g., astro check)
```

## Project Overview

- **Framework:** Astro 6 + React 19
- **Styling:** Tailwind CSS v4 (CSS-based, no tailwind.config.js)
- **Package Manager:** pnpm
- **Node Version:** >=22.12.0
- **UI Components:** shadcn/ui (radix-nova style)
- **Icons:** Lucide React
- **Animations:** motion/react
- **Path Alias:** `@/*` maps to `./src/*`

## Code Style

### Imports

Order imports by category, separated by blank lines:

```tsx
// 1. React/Next imports
import { useState, useEffect } from "react"

// 2. Third-party libraries
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"

// 3. Internal utils/lib
import { cn } from "@/lib/utils"

// 4. Components
import Navbar from "@/components/Navbar"
import { Button, buttonVariants } from "@/components/ui/button"
```

Use the `@/` alias for all internal imports.

### TypeScript

- Use strict TypeScript mode (extends astro/tsconfigs/strict)
- Prefer type inference for obvious types, explicit types for function parameters
- Use `interface` for public API types, `type` for unions/intersections
- Avoid `any`, use `unknown` when type is truly uncertain

```tsx
// Good
const [count, setCount] = useState(0)
const handleClick = (id: string) => void

// Avoid
const [count, setCount] = useState<any>(0)
```

### Naming Conventions

- **Components:** PascalCase (e.g., `Navbar.tsx`, `Button.tsx`)
- **Functions:** camelCase (e.g., `cn()`, `handleSubmit()`)
- **Constants:** SCREAMING_SNAKE_CASE for config/constants
- **Files:** kebab-case for non-component files

### Formatting

- Use double quotes for all strings (`"string"`, not `'string'`)
- Maximum line length: 80 characters
- Use Prettier defaults (2-space indent, semicolons)
- Trailing commas in objects/arrays
- Single space after keywords (`if ()`, not `if()`)

### JSX

- Self-closing tags must have trailing slash: `<Component />`
- Props on new lines when more than 2 props
- Always include `key` prop in lists

```tsx
// Good
<Button
  variant="default"
  size="lg"
  onClick={handleClick}
>
  Submit
</Button>

// Bad
<Button variant="default" size="lg" onClick={handleClick}>Submit</Button>
```

## Component Guidelines

### shadcn/ui Components

Follow shadcn/ui patterns with `class-variance-authority`:

```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center...",
  {
    variants: {
      variant: {
        default: "...",
        destructive: "...",
      },
      size: {
        default: "...",
        sm: "...",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export function Button({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { buttonVariants }
```

### Tailwind CSS v4

Tailwind v4 uses CSS-based configuration. Use utility classes directly:

```tsx
// In components
<div className="flex items-center gap-4 p-4 bg-primary text-foreground">

// In global.css (@theme block for custom values)
@theme {
  --color-primary: oklch(70% 0.2 250);
}
```

Avoid creating separate CSS files for component styles.

### Motion Animations

Use motion/react for animations:

```tsx
import { motion } from "motion/react"

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
```

## Error Handling

- Use try/catch for async operations with user feedback
- Display errors gracefully in UI (toast/alert)
- Never expose internal error details to users

```tsx
try {
  await fetchData()
} catch (error) {
  console.error("Failed to fetch:", error)
  toast({ title: "Error", description: "Failed to load data" })
}
```

## File Structure

```
src/
├── assets/          # Static assets (images, svgs)
├── components/     # React components
│   └── ui/          # shadcn/ui components
├── layouts/        # Astro layouts
├── lib/            # Utilities (utils.ts)
├── pages/          # Astro pages
└── styles/         # Global CSS
```

## Testing

This project does not currently have tests configured. When adding tests:

- Use Vitest for unit tests
- Use Playwright for E2E tests
- Place tests alongside components: `Button.tsx` → `Button.test.tsx`

## Linting

No ESLint/Prettier configuration currently exists. Recommended additions:

- ESLint with React and Astro plugins
- Prettier for code formatting
- Run `pnpm astro check` for type checking
