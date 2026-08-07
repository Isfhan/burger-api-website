---
sidebar_label: CORS Hook
---

# CORS Hook

The CORS hook adds the appropriate `Access-Control-*` headers to responses, for example to allow browser cross-origin requests. Install it with:

```bash
burger-api add cors
```

## Usage

CORS belongs in `onRequest`: it runs pre-routing, so it can answer `OPTIONS` preflight requests before route matching. Compose it in `src/hooks.ts`:

```ts title="src/hooks.ts"
import { cors } from "../ecosystem/hooks/cors/cors";

export const onRequest = [
  cors({ origin: ["https://app.example.com"], credentials: true }),
];
```

## Options

- `origin`: `"*"` or a string, array, or function. Default `"*"`. With `credentials: true`, `origin` must be explicit origins.
- `methods`: allowed HTTP methods.
- `allowedHeaders` / `exposedHeaders`: header whitelists.
- `maxAge`: preflight cache in seconds.
- `debug`: verbose logging.
- `enforceHttps`: block insecure origins in production.

The hook handles `OPTIONS` preflight automatically and returns `204 No Content` with the CORS headers. Check the package README in `ecosystem/hooks/cors/` for the full option list.

## Related

- [Ecosystem](/docs/ecosystem/introduction)
- [Hook System](/docs/hooks/system)
