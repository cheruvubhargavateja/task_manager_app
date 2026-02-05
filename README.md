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

## License

MIT
