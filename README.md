# htha-demo

Simple TypeScript + Express demo for property listings (local, in-memory store).

## Overview

This repository contains a small Express server written in TypeScript providing endpoints to create and search property records. It's intentionally lightweight and uses an in-memory store for fast iteration and testability.

## Purpose for HTHA

This REST API was created for HTHA to provide basic property search and creation functionality. The primary goals are:
- Allow creating property records via `POST /properties`.
- Allow searching properties via `GET /properties/search` with support for nested address fields and numeric range queries (e.g., price ranges).

Planned enhancement: implement average pricing calculations for property assets (e.g., compute and expose average prices by suburb/city or other segments) so HTHA can analyse market values and asset portfolios.

Key features implemented during development:
- TypeScript setup (`tsconfig.json`) and build scripts.
- Express server entrypoint at `src/server.ts` with JSON body parsing and CORS enabled.
- `POST /properties` handler to create property records with validation (Yup).
- `GET /properties/search` handler to search properties with query param handling and numeric range support.
- In-memory database utilities in `src/utils/database.ts` with CRUD and `query`.
- Matching utilities in `src/utils/matcher.ts` including `matchNumberRange` and attribute matching using `lodash/get`.
- Validation logic using `yup` under `src/api/properties/*/logic`.
- Tests using Jest + `ts-jest` and integration tests with `supertest` under `src/api/properties`.
- Formatting and editor settings for consistent 2-space indentation (Prettier, .editorconfig, VSCode settings).
- Runtime path aliasing via `module-alias` (configured in `package.json` `_moduleAliases`) for `utils` imports.
- ID generation uses Node's `crypto.randomUUID()` to avoid ESM `uuid` issues during tests.

## Notable Change

During updates, the `suburb` field was moved into the `Address` type (so it is now `address.suburb`). Tests and validation were updated to reflect this change. Search query mapping (`generateQueryPayload`) now maps `suburb` to `address.suburb` so queries filter on the nested property.

## Project structure (important files)

- `src/server.ts` — Express app and route registration
- `src/routes.ts` — route wiring
- `src/api/properties/create/handler.ts` — create property handler
- `src/api/properties/search/handler.ts` — search handler
- `src/utils/database.ts` — in-memory DB with `create`, `query`, `read`, `update`, `remove`, `reset`
- `src/utils/matcher.ts` — attribute matching helpers and numeric range matcher
- `src/types.ts` — TypeScript types (including `Property` and `Address`)
- `src/api/properties/*` — validation and test files

## Scripts

Run these from the project root.

- Install dependencies:

```bash
yarn install
# or
npm install
```

- Run in development (auto-reload with ts-node-dev):

```bash
yarn dev
```

- Build to `dist`:

```bash
yarn build
```

- Run compiled app:

```bash
yarn start
```

- Run tests:

```bash
yarn test
```

- Format code (Prettier):

```bash
yarn format
```

## How to contribute / next steps

- Ensure tests pass: `yarn test`.
- Keep `suburb` as `address.suburb` when adding fixtures or payloads.
- Consider adding GitHub Actions to run tests on push (CI) — I can add a workflow if you want.

## Pushed to GitHub

This repository was initialized locally and pushed to `https://github.com/kevde/htha-demo.git`.

If you'd like, I can:
- Add a `README` badge or license.
- Add CI (`.github/workflows/ci.yml`) to run tests on push.

---

If you want this README expanded (usage examples, API request samples, or CI), tell me what to include and I will update it.