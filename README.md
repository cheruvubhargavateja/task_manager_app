# Task Manager

A simple Task Manager application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Users can register, sign in, and manage tasks (create, view, update status, delete). Data and authentication state persist in **localStorage**.

## Features

- **Authentication**: Register and login (stored in localStorage)
- **Tasks**: Create, view, update status, edit, and delete tasks
- **Persistence**: All data (users, auth, tasks) stored in localStorage
- **Protected routes**: Dashboard requires login; unauthenticated users are redirected to `/login`
- **Responsive UI**: Works on mobile and desktop

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Setup

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project structure

- `src/app/` – Next.js App Router pages and layout
- `src/components/` – Presentational components (auth, tasks, ui)
- `src/containers/` – Container components (connect data/handlers to presentational)
- `src/contexts/` – React Context (Auth, Task)
- `src/hooks/` – Custom hooks (useAuth, useTasks)
- `src/hoc/` – Higher-order component (withAuth for protected routes)
- `src/types/` – Shared TypeScript types
- `src/constants/` – App constants (e.g. storage keys)
- `src/utils/` – Helpers (storage, id)

## Patterns

- **Container / Presentation** – Containers (`LoginContainer`, `RegisterContainer`, `DashboardContainer`) own data, routing, and handlers; presentational components (`LoginForm`, `TaskList`, `TaskItem`, `AddTaskForm`, `EditTaskModal`) receive props and render UI only. Keeps UI testable and logic reusable.
- **Context + Provider** – `AuthContext` and `TaskContext` hold global auth and task state; `AuthProvider` and `TaskProvider` wrap the app in `providers.tsx` so any page or component can consume auth/tasks via hooks.
- **Custom hooks (facade)** – `useAuth` and `useTasks` expose context in a simple API (`useAuth()`, `useTasks()`), hiding provider details and keeping components decoupled from context implementation.
- **Higher-Order Component (HOC)** – `withAuth` wraps pages that require login (e.g. dashboard); unauthenticated users are redirected to `/login` and see a short “Redirecting…” state.
- **Centralized types** – Domain types (`Task`, `User`, `AuthState`, credentials, etc.) live in `src/types/index.ts` for consistent typing and reuse.
- **Constants** – Storage keys and other literals live in `src/constants/storage.ts` (and similar) to avoid magic strings and simplify changes.
- **Utility abstraction** – `src/utils/storage.ts` and `src/utils/id.ts` encapsulate localStorage access and ID generation; storage helpers are SSR-safe (`typeof window` checks) for Next.js.

## Optimization techniques

- **`useCallback`** – Event handlers and context methods (e.g. `handleSubmit`, `addTask`, `updateTaskStatus`) are wrapped in `useCallback` with correct dependency arrays so stable references are passed to children and list items, reducing unnecessary re-renders.
- **`useMemo`** – Context provider values (`AuthContext`, `TaskContext`) are built with `useMemo` so the context value object is stable unless its inputs change; consumers re-render only when auth or task data actually changes.
- **`React.memo`** – Presentational components that receive props (`TaskList`, `TaskItem`, `Button`, `AddTaskForm`, `EditTaskModal`) are wrapped in `memo()` so they skip re-renders when props are referentially equal.
- **Stable context value** – Providers expose a single memoized value (e.g. `{ user, login, logout, ... }`) so multiple `useContext` consumers don’t thrash from new object identities on every render.
- **Early returns** – Containers and forms use early returns (e.g. “redirect if already authenticated”, “return if title is empty”) to keep the main flow clear and avoid deep nesting.
- **SSR-safe storage** – `utils/storage` checks `typeof window !== "undefined"` before using `localStorage`, so the app can be server-rendered without runtime errors.

## License

MIT
