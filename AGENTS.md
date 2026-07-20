# BurgerAPI Website — Implementation & Documentation Standards

These instructions apply to all edits to the `burger-api-website` Docusaurus site
(`D:\Coding\BurgerAPI-work\burger-api-website`). Follow them for every documentation
change so the site stays cohesive, beginner-friendly, and consistent.

## 1. Documentation Writing Standards

Goal: documentation that is **easy to read, easy to navigate, and enjoyable to learn from**.

1. **Do not repeat content.** Before writing a new page, search existing docs. Keep one
   page as the **canonical source** for each topic. Summarize elsewhere and link to it.
2. **Keep docs DRY.** Do not copy API descriptions, code snippets, architecture
   explanations, validation rules, install steps, or config steps. Reuse via links.
3. **Use simple English.** Short sentences, common words, active voice. Write for
   developers whose first language may not be English.
4. **Explain gradually.** What it is → why it exists → simple example → how it works →
   related docs. Do not open with implementation details.
5. **Keep examples simple.** Teach one idea at a time. Combine concepts only in dedicated
   end-to-end tutorials.
6. **Consistent structure.** Prefer: Introduction → Why use it → Basic example →
   Explanation → Common use cases → Best practices → Related documentation.
7. **Avoid unnecessary jargon.** Use plain language (shared request object, fewer memory
   allocations, lazy loading, faster request processing). If a technical term is required,
   explain it immediately in simple words.
8. **Link instead of repeating.** Write a short summary + link to the dedicated page.
9. **Final audit.** Before done: no duplicated explanations/examples, one primary page per
   topic, natural cross-links, consistent terminology, clear simple writing, no need to
   read the same explanation twice.

### Writing-style examples
- ❌ "BurgerContext facilitates deferred query-string materialization through lazily evaluated accessors."
- ✅ "BurgerContext only parses the query string when you use `req.query`."
- ❌ "BurgerAPI leverages prototype sharing to maximize hidden-class stability."
- ✅ "BurgerAPI shares one request structure across all requests. This helps Bun process requests more efficiently."

Replace jargon: `shared prototype` → "same object template", `shape` (hidden class) →
"structure", `hot path` → "busiest code path", `allocat*` → "use memory", `overhead` →
"extra cost", `dead-path elimination` → one plain sentence, `micro-optimizations` →
"small low-level tweaks", `user-space dispatch` → "routing in our own code".

## 2. BurgerAPI Content Constraints (carried over)

- **Source of truth:** the framework package `D:\Coding\BurgerAPI-work\burger-api\packages\burger-api`
  (currently **v0.14.0**). Verify behavior there before documenting it.
- **Runtime:** requires **Bun ≥ 1.3.0**; **Zod ^4**. State these in install/prereq docs.
- **Document only real public APIs.** `BurgerRequest` handler type is class-based at the
  type level; `BurgerContext` is the shared-prototype implementation behind it. `req.query`,
  `req.route`, `req.set`, `req.validated`, `req.params` are the public request fields.
- **No roadmap / phase / milestone / AOT language.** Do not present capabilities as "coming
  soon", "under development", "introduced in", or "now supports". Describe them as inherent.
- **No comparisons to other frameworks** (Elysia, etc.).
- **No published benchmark numbers.** Performance pages describe design philosophy only.

## 2b. Related Repositories

BurgerAPI is split across several repositories. This repo is docs only — keep
framework code and benchmarks out of it:

- **`burger-api-website`** (this repo) — the Docusaurus site + blog
  (`https://burger-api.com`). User-facing documentation and release posts.
- **`burger-api`** — the framework + CLI. The source of truth for API behavior
  (currently **v0.14.0**). Verify behavior there before documenting it; do not
  copy framework code here.
- **`burger-api-benchmarks`** — the dedicated, official home for all BurgerAPI
  performance benchmarks. Do **not** publish benchmark numbers on this site;
  link to that repo instead of embedding measurements.

- The framework uses **`route.ts`** files for routes (never `<name>.ts` as a route file).

## 3. Terminology (use consistently)

- **BurgerContext** = the canonical name for the shared request context. "request context"
  is the plain-language description. Reserve "request object" for the native `Request` /
  `BurgerRequest` instance (`req`).
- **route handler** (not "handler") in prose; `Handlers` page title → "Route Handlers".
- **query string** = raw `?…` portion / lazy parsing; **query parameters** = parsed values
  via `req.query`.
- **API directory** (capitalized) in prose; `apiDir` is the config key.
- **route** is the primary term in framework/routing docs; **endpoint** only for OpenAPI/REST.
- **validation schema** = "the `schema` export" (define on first use per page).

## 4. Verification

- `bun run build` must pass. `docusaurus.config.ts` sets `onBrokenLinks: "throw"`, so every
  new/kept link must resolve to a real page.
- `bun run typecheck` (tsc) must pass.
- After edits, grep the docs for regressions of forbidden wording (`Phase`, `Roadmap`,
  `milestone`, `AOT`, `Elysia`, `Coming Soon`, `Under Development`) and leftover jargon
  (`shared prototype`, `hot path`, `dead-path elimination`).

## 5. Writing Conventions (hard rules)

- **No em dashes (`—`) in any doc/blog/changelog content.** Use a colon, period,
  or `:` bullet separator instead. This rule applies to all newly generated
  content. (Pre-existing pages written before this rule may still contain them;
  do not silently rewrite those unless the task is an explicit cleanup.)
- **Diagrams:** Mermaid is enabled (`markdown.mermaid: true`,
  `@docusaurus/theme-mermaid`). Use ` ```mermaid ` fenced code blocks for
  architecture/flow diagrams instead of ASCII art where it improves clarity.
- **Release post titles** follow the form `BurgerAPI vX.Y.Z Released`
  (not `BurgerAPI vX.Y.Z — The <Name>`). The blog `slug` stays
  `burger-api-vX.Y.Z-release`.

## 6. Architecture Reset Context

BurgerAPI underwent a pre-1.0 architecture reset (see framework `ROADMAP.md`).
The reset sets the version to **v0.14.0** and does **not** promise backward
compatibility. Source of truth for current behavior is the `burger-api` package
(currently **v0.14.0**); verify there before documenting.

**What the current code actually does (document this, not the vision):**

- The request lifecycle runs through a **middleware pipeline**:
  `ServerOptions.globalMiddleware` followed by a route's `middleware` array.
  A middleware returns `Response` (stop early), a function `(Response) =>
  Promise<Response>` (transform the final response, applied in reverse order), or
  `undefined` (continue). Validation, `405`/`Allow`, auto-`HEAD`, and loose
  trailing-slash are compiled into the runtime.
- Route-file conventions are `route.ts`, `schema.ts`, `openapi.ts`, and the
  **reserved** `hooks.ts` / `use.ts` / `webhook.ts`. A `middleware.ts` route
  file is rejected (middleware is registered as functions, not discovered as a
  route file).
- `hooks.ts`, `use.ts`, and `webhook.ts` are discovered and carried through the
  compiler but are **not yet executed at runtime**. Document them only as
  "reserved / carried through, not yet wired". Do not present `beforeHandle`,
  `afterHandle`, `onError`, `onResponse`, or `provide` as working v0.14.0
  features.
- Pre-reset release posts (`v0.3.0` through `v0.9.9`) carry a disclaimer banner
  noting they predate the reset. Their wording (e.g. "backward compatible",
  "AOT") no longer applies. Do not use them as a source of current behavior.

- No `Phase` / `roadmap` / `milestone` / `AOT` language in current docs.
- When editing older pages that conflict with the reset, flag the conflict; do not
  rewrite large pre-reset docs without an explicit request.
