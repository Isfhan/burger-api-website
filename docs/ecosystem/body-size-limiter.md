---
sidebar_label: Body Size Limiter
---

# Body Size Limiter

The body size limiter rejects request bodies larger than a limit, so a client cannot send an oversized payload. Use it on any endpoint that accepts uploads or JSON.

## Install

```bash
burger-api add body-size-limiter
```

## Usage

Compose it in `onRequest`. That stage runs before routing and, more importantly, before schema body validation reads the whole body:

```ts title="src/hooks.ts"
import { bodySizeLimiter } from "../ecosystem/hooks/body-size-limiter/body-size-limiter";

export const onRequest = [bodySizeLimiter()];
```

With no options the limit is 1MB and the hook checks only the `Content-Length` header. Raise the limit for uploads:

```ts title="src/hooks.ts"
import { bodySizeLimiter } from "../ecosystem/hooks/body-size-limiter/body-size-limiter";

export const onRequest = [bodySizeLimiter({ maxSize: 10 * 1024 * 1024 })];
```

Presets are also available: `smallPayloadLimit()` (100KB), `mediumPayloadLimit()` (1MB), `largePayloadLimit()` (10MB), and `extraLargePayloadLimit()` (50MB).

## Options

- `maxSize`: maximum body size in bytes. Default `1048576` (1MB).
- `mode`: `"header"` checks `Content-Length` only. `"stream"` reads and measures a clone of the body. Default `"header"`.
- `onError`: `(size, maxSize) => Response`, called for an oversized body. Default is a `413` JSON response.
- `includeLimit`: when `true`, the default `413` body includes the received and maximum sizes. Default `true`.

## Good to know

- The hook decides by body presence, not by method. A `GET` or `DELETE` with a body is checked like any other request. A request without a body is skipped.
- Header mode trusts the client. A body without `Content-Length` (chunked) gets `411 Length Required`, and a malformed one gets `400`, but a client can still send a false length. The `411` is intended, but some clients and fetch-handler targets (Cloudflare Workers, Deno, Vercel, a proxy) may forward bodies without `Content-Length`; use `mode: "stream"` there.
- Stream mode reads a clone, so validation and the handler still get the original body. It must run before anything else reads the body, which means `onRequest`. If the body was already read, the hook warns once and lets the request through, because measuring then protects nothing.
- Global hooks run before route hooks. A per-route limit in a route's `hooks.ts` can therefore be stricter than the global one, never looser.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [Global Hooks](/docs/hooks/global)
