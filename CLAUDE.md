# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

Always use **pnpm** instead of npm or yarn.

```bash
pnpm install              # Install all workspace dependencies
pnpm add <pkg>            # Add to current package
pnpm add -D <pkg>         # Add dev dependency
pnpm dev                  # Dev server for all packages
pnpm build                # Build all packages
pnpm --filter @doc-monorepo/apps dev          # Dev a specific package
pnpm --filter @doc-monorepo/apps build        # Build a specific package
```

Available filters: `@doc-monorepo/apps`, `@doc-monorepo/api`, `@doc-monorepo/web-components`

## Architecture

This is a pnpm monorepo with three packages:

- **`api/`** — Leaf package. Typed HTTP client (`src/client.ts`) targeting `https://api.nofrixion.com`, plus TanStack React Query hooks in `src/hooks/`. No dependencies on other local packages.
- **`apps/`** — Main React SPA. Imports from `api/` via `@api/*` alias. Has MSW mocks in `src/mocks/` (dev-only). Features a screenshot-to-PowerPoint export system via `DeckContext`.
- **`web-components/`** — Custom elements wrapping components from `apps/` (via `@/*` alias pointing to `apps/src/`) and hooks from `api/`. Uses `postcss-prefix-selector` to scope CSS for shadow DOM isolation.

Dependency flow: `web-components` → `apps` + `api`; `apps` → `api`; `api` → nothing local.

Path aliases are configured in each package's `tsconfig.json` and mirrored in `vite.config.ts`:
- `@/*` → package-specific src (apps: own src; web-components: apps/src)
- `@api/*` → api/src

## UI & Styling

- Always use **Tailwind CSS** for styling
- Always use **tanstack/react-table** for tables
- UI components: shadcn/ui + Radix UI
- Icons: Lucide React

## Key Patterns

**Data fetching:** TanStack React Query. All server state goes through `useQuery`/`useMutation` hooks defined in `api/src/hooks/`.

**Mock data (dev only):** MSW handlers in `apps/src/mocks/handlers.ts`. The worker is started in `apps/src/main.tsx` only when `import.meta.env.DEV` is true. `mockServiceWorker.js` lives in `apps/public/` and is excluded from production builds via a Vite plugin in `apps/vite.config.ts`.

**Screenshot/PowerPoint export:** `DeckContext` (`apps/src/app/dashboard/contexts/DeckContext.tsx`) uses `@zumer/snapdom` to capture DOM nodes and `pptxgenjs` to assemble exports.

**Web component CSS isolation:** `web-components` uses `postcss-prefix-selector` and `tailwindcss-patch` to scope all utility classes, preventing style leakage into the host page.
