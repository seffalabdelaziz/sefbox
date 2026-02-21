# Sefbox - SaaS AI Agent Platform Blueprint

This repository now contains an initial full-stack scaffold for a Manus-like SaaS AI agent platform with **NestJS + Prisma + MySQL** backend and **React + Vite + TypeScript** frontend.

## Structure

- `backend/` - Clean architecture-inspired modular NestJS backend.
- `frontend/` - React app with page and state scaffolding.
- `docker-compose.yml` - Local deployment setup (MySQL + backend + frontend).

## Backend Highlights

- JWT auth with register/login endpoints.
- Multi-tenant data model by `workspaceId`.
- Skill importer parsing markdown frontmatter from `/skills`.
- Recommendation engine with:
  - embedding similarity (cosine)
  - tag/category/recent usage boosting
  - recommendation logging
- Agent flow endpoint to simulate skill execution.
- Redis-ready cache port + BullMQ-ready queue port abstractions.
- API versioning (`/api/v1`) + rate limiting + logging interceptor.

## Frontend Highlights

- Pages: Login, Register, Dashboard, Agent Chat, Skill Analytics.
- Chat-style interface scaffolding.
- Recommended skills sidebar with confidence.
- Zustand agent state store.
- React Query + Axios setup.

## Quick Start

```bash
# from repo root
docker compose up --build
```

Then:
- Backend API: `http://localhost:3000/api/v1`
- Frontend: `http://localhost:5173`

## Key Endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/agent/message`
- `GET /api/v1/skills?workspaceId=...`
- `GET /api/v1/recommendations/:sessionId`
