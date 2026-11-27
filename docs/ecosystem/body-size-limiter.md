---
sidebar_label: Body Size Limiter
---

# Body Size Limiter

This hook rejects request bodies that are too large. Use it on any app that accepts uploads or JSON.

## Install

```bash
burger-api add body-size-limiter
```

To update the copy later, run `burger-api add body-size-limiter --force`.

## Add it

Add it to `onRequest`, so it runs before anything reads the body:

```ts title="src/hooks.ts"
import { bodySizeLimiter } from "../ecosystem/hooks/body-size-limiter/body-size-limiter";

export const onRequest = [bodySizeLimiter({ maxSize: 10 * 1024 * 1024 })]; // 10MB
```

With no options the limit is 1MB. A body over the limit gets `413`.

## Options

- `maxSize`: limit in bytes. Default `1048576` (1MB).
- `mode`: `"header"` or `"stream"`. Default `"header"`.
- `onError`: `(size, maxSize) => Response` to build your own `413` response.

The full list is in `ecosystem/hooks/body-size-limiter/README.md`.

## Header mode and stream mode

- `"header"` reads the `Content-Length` header. A body without it (a chunked body) gets `411 Length Required`.
- `"stream"` measures the body itself. Use it if your platform or proxy sends bodies without `Content-Length`.

```ts title="src/hooks.ts"
export const onRequest = [bodySizeLimiter({ mode: "stream" })];
```

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [Global Hooks](/docs/hooks/global)
