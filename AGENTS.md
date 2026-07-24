# BurgerAPI Website — Documentation Standards

These instructions apply to all edits to `burger-api-website`.

## 0. Source of truth

**Architecture and product decisions:**

`../burger-api-roadmaps/BURGERAPI_VISION.md`

When website content conflicts with the vision, **the vision wins**.  
Do not invent or redesign architecture. If unclear, stop and ask.

Also: `../burger-api-roadmaps/ARCHITECTURE.md`, framework `AGENTS.md`.

The site should teach the **vision-aligned public API**. Where the shipped package
still uses legacy names, say so briefly and show the target API.

---

## 1. Documentation writing standards

1. Do not repeat content. One canonical page per topic; link elsewhere.
2. Keep docs DRY.
3. Simple English. Short sentences. Active voice.
4. Explain gradually: what → why → example → how → related.
5. One idea per example.
6. Prefer: Introduction → Why → Example → Explanation → Use cases → Best practices → Related.
7. Avoid jargon; explain terms when required.
8. Link instead of copying.
9. Final audit for duplication and terminology.

### Writing style

- Prefer `ctx` / `BurgerContext` in new examples.
- No em dashes (`—`). Use colon, period, or bullets.
- No comparisons to other frameworks.
- No published benchmark numbers (link to `burger-api-benchmarks` only).
- No Phase / roadmap / milestone language in user docs.

---

## 2. Target architecture (document this)

### Runtime

- Bun ≥ 1.3.0 primary; Node 24+ and WinterCG edge where practical
- Zod ^4 / Standard Schema

### Project shape

```
burger.build.ts          # build-time only
src/index.ts
src/plugins.ts
src/providers.ts
src/hooks.ts
src/api/**/
ecosystem/hooks/
ecosystem/plugins/
ecosystem/skills/
```

### Route convention files (first-class)

Each route directory is self-contained (**no group inheritance**):

| File | Role |
|------|------|
| `route.ts` | `export async function GET(ctx: BurgerContext)` → `Response` |
| `schema.ts` | `export const GET = { body, query, ... }` |
| `hooks.ts` | Route hooks |
| `openapi.ts` | `export const GET = { summary, tags, ... }` |
| `config.ts` | Route options (auth, cache, timeout, …) |

Per-method named exports (`GET`, `POST`, …) on route/schema/openapi.

### Hooks vs plugins

- **Hooks** = request lifecycle (`onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`)
- **Plugins** = application extensions (`burger.usePlugin` in `src/plugins.ts`)

Keep separate. Do not teach a middleware framework model as the primary API.

### Context

Public type: **`BurgerContext`**. Standard Web `Response` only.

### Validation

After `transform`, before `beforeRoute`. Throw `ValidationError` → `onError` → default 422 + RFC 9457.

### Auth

Official ecosystem **plugins** under `ecosystem/plugins/` integrating with hooks + `config.ts`. Core is auth-agnostic.

### Config layers

| Layer | Where |
|-------|--------|
| Build | `burger.build.ts` |
| App | `new Burger({...})` |
| Plugins | `src/plugins.ts` |
| Route | `config.ts` |

### Planned / not planned

- Planned: file-based WebSocket router (`src/websocket/**/ws.ts`)
- Not planned: dedicated webhook router, ORM, group inheritance

### Legacy (do not teach as primary)

`globalMiddleware`, `export const middleware`, `BurgerRequest` as primary type,
`beforeHandle`/`afterHandle`/`onResponse`/lifecycle `provide`, `burger.config.ts`,
route `use.ts`/`webhook.ts`, group inheritance, lowercase schema `get`/`post` as primary.

---

## 3. Related repositories

- `burger-api-website` — this site
- `burger-api` — framework + CLI
- `burger-api-benchmarks` — benchmarks only
- `burger-api-roadmaps` — vision + roadmaps

## 4. Verification

- `bun run build` must pass (`onBrokenLinks: "throw"`)
- `bun run typecheck` must pass
- Grep for forbidden: Phase, roadmap, Elysia, Coming Soon, middleware-as-primary framing

## 5. Sidebar migration note

Prefer category **Hooks** over **Middleware**. Prefer **BurgerContext** over **BurgerRequest** API pages. Ecosystem = hooks + plugins.
