---
sidebar_label: Rate Limiter
---

# Rate Limiter

The rate limiter hook limits how many requests a client can make within a time window. Install it with:

```bash
burger-api add rate-limiter
```

## Usage

Compose it in `src/hooks.ts`. It runs as an `onRequest` hook so unmatched requests (404s), pages, assets, and `/docs` are limited too:

```ts title="src/hooks.ts"
import { rateLimit } from "../ecosystem/hooks/rate-limiter/rate-limiter";

export const onRequest = [rateLimit()]; // 100 requests per minute per client
```

`beforeRoute` also works, but only for matched routes.

## Options

- `windowMs`: time window in milliseconds. Default `60000`.
- `maxRequests`: maximum requests per window. Default `100`.
- `keyGenerator`: custom key per client (API key, user ID, ...). Defaults to `ctx.ip`.
- `trustProxy`: trust `X-Forwarded-For` / `X-Real-IP` headers for client identity. Default `false`. Leave it off unless a trusted proxy sets them; by default the key is `ctx.ip`, the socket peer address, which forwarded headers can never spoof.
- `handler`: custom response when the limit is exceeded. Defaults to `429 Too Many Requests`.
- `skipFailedRequests`, `skipSuccessfulRequests`: which requests count against the limit.

If no client identity is available (`ctx.ip` is `undefined` on WinterCG fetch entries), all such requests share one bucket and the hook warns once.

The hook adds `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers, plus `Retry-After` when the limit is exceeded. The store is in-memory, so limits reset on restart and are per server instance.

```ts title="src/hooks.ts"
import { rateLimit } from "../ecosystem/hooks/rate-limiter/rate-limiter";

export const onRequest = [
  rateLimit({
    windowMs: 15 * 60 * 1000,
    maxRequests: 50,
    keyGenerator: (ctx) => ctx.headers.get("X-API-Key") || "anonymous",
  }),
];
```

Check the package README in `ecosystem/hooks/rate-limiter/` for the full option list.

## Related

- [Ecosystem](/docs/ecosystem/introduction)
- [Hook System](/docs/hooks/system)
