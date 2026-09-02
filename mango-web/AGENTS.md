# Repository Guidelines

## Project Structure & Module Organization

This is a React 19, TypeScript, and Vite single-page application. Application code lives in `src/`: UI is in `src/components/` (`ui/` for primitives, `shared/` for application components), pages in `src/pages/`, and routes in `src/routes/`. Keep state in `src/redux/`, API calls in `src/services/`, reusable behavior in `src/hooks/`, and shared types/utilities in `src/types/` and `src/utils/`.

Static files belong in `public/`; translations are organized by locale under `public/locales/en`, `ro`, and `ru`. Add every user-facing string to the appropriate locale JSON files when changing UI copy.

## Build, Test, and Development Commands

- `npm install` installs the locked dependencies from `package-lock.json`.
- `npm run dev` starts the Vite development server with hot reload.
- `npm run build` type-checks via `tsc -b` and creates the production bundle in `dist/`.
- `npm run lint` runs ESLint across the repository.
- `npm run preview` serves the built `dist/` output locally.

Run `npm run lint` and `npm run build` before opening a pull request. No automated test script exists; include focused manual verification steps in the PR.

## Coding Style & Naming Conventions

Follow the existing TypeScript and React style: two-space indentation, single quotes, no semicolons, and functional components. Use `PascalCase` for component files and exported components (for example, `FileCard.tsx`), `camelCase` for hooks, helpers, variables, and functions (for example, `useCloudUpload.ts`), and `*.types.ts` for type modules.

ESLint is configured in `eslint.config.js` with TypeScript, React Hooks, and React Refresh rules. Do not suppress lint rules without a narrowly documented reason.

## Commit & Pull Request Guidelines

Recent history uses short, imperative, lower-case summaries such as `mini refactor`. Write a specific one-line subject focused on the change; avoid unrelated formatting or refactors.

PRs should explain the user-visible change, note affected routes or translations, link the relevant issue when available, and include screenshots or a short recording for UI changes. State the commands run and any manual checks performed.

## Configuration & Security

Do not commit secrets, tokens, or environment-specific credentials. Keep API and authentication changes within the existing service and Redux boundaries, and verify logged-out and logged-in route flows.
