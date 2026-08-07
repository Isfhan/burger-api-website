# BurgerAPI Website — Documentation Standards

These instructions apply to all edits to `burger-api-website`.

## 0. Source of truth

**Architecture and product decisions** are locked in the framework's
[`burger-api/AGENTS.md`](../burger-api/AGENTS.md).

When website content conflicts with the locked architecture, **AGENTS.md wins**.  
Do not invent or redesign architecture. If unclear, stop and ask.

The site teaches the **locked public API**. Write as if BurgerAPI has always
worked this way: file-based routing, `BurgerContext`, six lifecycle hooks,
plugins, providers, macros, OpenAPI generation, and WebSocket under `src/ws/`.

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

---

## 3. Related repositories

- `burger-api-website` — this site
- `burger-api` — framework + CLI
- `burger-api-benchmarks` — benchmarks only

## 4. Verification

- `bun run build` must pass (`onBrokenLinks: "throw"`)
- `bun run typecheck` must pass

## 5. Style notes

Prefer the **Hooks** category for lifecycle content. Use **BurgerContext** in
all API pages. Ecosystem = hooks + plugins.
