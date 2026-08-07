---
sidebar_label: Rate Limiter
---

# Rate Limiter

The rate limiter hook limits how many requests a client can make within a time window. Install it with:

```bash
burger-api add rate-limiter
```

## Usage

Compose it in `src/hooks.ts`. It enforces the limit before the handler runs, so it belongs in `beforeRoute`:

```ts title="src/hooks.ts"
import { rateLimit } from "../ecosystem/hooks/rate-limiter/rate-limiter";

export const beforeRoute = [rateLimit()]; // 100 requests per minute per IP
```

## Options

- `windowMs`: time window in milliseconds. Default `60000`.
- `maxRequests`: maximum requests per window. Default `100`.
- `keyGenerator`: custom key per client (API key, user ID, ...). Defaults to the IP address.
- `handler`: custom response when the limit is exceeded. Defaults to `429 Too Many Requests`.
- `skipFailedRequests`, `skipSuccessfulRequests`: which requests count against the limit.

The hook adds `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers, plus `Retry-After` when the limit is exceeded. The store is in-memory, so limits reset on restart and are per server instance.

```ts title="src/hooks.ts"
import { rateLimit } from "../ecosystem/hooks/rate-limiter/rate-limiter";

export const beforeRoute = [
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
