---
sidebar_label: CORS Hook
---

# CORS Hook

This hook adds `Access-Control-*` headers, so browsers can call your API from another origin. It also answers `OPTIONS` preflight requests with `204`.

## Install

```bash
burger-api add cors
```

To update the copy later, run `burger-api add cors --force`.

## Add it

Add it to `onRequest` in `src/hooks.ts`, so it runs before routing:

```ts title="src/hooks.ts"
import { cors } from "../ecosystem/hooks/cors/cors";

export const onRequest = [
  cors({ origin: ["https://app.example.com"], credentials: true }),
];
```

## Options

- `origin`: `"*"`, a string, an array or a function. Default `"*"`. With `credentials: true`, list the origins.
- `credentials`: allow cookies and auth headers.
- `methods`: allowed HTTP methods.
- `allowedHeaders`, `exposedHeaders`: header lists.
- `maxAge`: how long browsers cache the preflight, in seconds.

The full list is in `ecosystem/hooks/cors/README.md`.

## Related

- [Ecosystem](/docs/ecosystem/introduction)
- [Hook System](/docs/hooks/system)
