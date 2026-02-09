# Moment Energy Take Home (Monorepo)

This repository contains both the `frontend` and `backend` projects in a single monorepo.

Quick commands (from repository root):

- Install dependencies (pnpm) for `frontend` and `backend` separately:

```bash
pnpm install
```

- Run frontend or backend individually:

```bash
pnpm --filter backend start:dev   # start backend in dev mode
pnpm --filter frontend dev       # start frontend (Next.js) in dev mode
```

- Seed mocked voltage data (backend):

```bash
cd backend
pnpm run seed:voltage
```

Notes:

- Environment variables should be placed in `backend/.env` (or provided on the command line).
- The root `package.json` uses pnpm workspaces. You can omit it and run each project separately if you prefer.
