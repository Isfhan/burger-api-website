---
sidebar_label: Rate Limiter
---

# Rate Limiter

This hook limits how many requests a client can make in a time window. Extra requests get `429 Too Many Requests`.

## Install

```bash
burger-api add rate-limiter
```

To update the copy later, run `burger-api add rate-limiter --force`.

## Add it

Add it to `onRequest` in `src/hooks.ts`, so every request counts, including 404s and pages:

```ts title="src/hooks.ts"
import { rateLimit } from "../ecosystem/hooks/rate-limiter/rate-limiter";

export const onRequest = [rateLimit()]; // 100 requests per minute per client
```

A custom limit, keyed by API key:

```ts title="src/hooks.ts"
export const onRequest = [
  rateLimit({
    windowMs: 15 * 60 * 1000,
    maxRequests: 50,
    keyGenerator: (ctx) => ctx.headers.get("X-API-Key") || "anonymous",
  }),
];
```

## Options

- `windowMs`: window length in milliseconds. Default `60000`.
- `maxRequests`: requests allowed per window. Default `100`.
- `keyGenerator`: how to identify a client. Default `ctx.ip`.
- `trustProxy`: read the client IP from `X-Forwarded-For`. Default `false`. Turn it on only behind a proxy you trust.

The full list is in `ecosystem/hooks/rate-limiter/README.md`.

## Good to know

- Responses include `X-RateLimit-*` headers, and `Retry-After` when the limit is hit.
- Counts are kept in memory. They reset on restart and are not shared between servers.

## Related

- [Ecosystem](/docs/ecosystem/introduction)
- [Hook System](/docs/hooks/system)
