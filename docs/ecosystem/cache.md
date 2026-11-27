---
sidebar_label: Cache
---

# Cache Hook

This hook sets the `Cache-Control` header, so browsers and CDNs know how long they may keep a response. It does not store responses itself.

## Install

```bash
burger-api add cache
```

To update the copy later, run `burger-api add cache --force`.

## Add it

Add it to `beforeRoute`, in `src/hooks.ts` or in a route's `hooks.ts`:

```ts title="api/products/hooks.ts"
import { publicCache } from "../../../ecosystem/hooks/cache/cache";

export const beforeRoute = [publicCache(3600)]; // Cache-Control: public, max-age=3600
```

Presets:

- `noCache()`
- `publicCache(maxAge = 3600)`
- `privateCache(maxAge = 300)`
- `immutableCache()`
- `cdnCache(browserMaxAge = 300, cdnMaxAge = 3600)`

## Options

For full control, use `cacheControl()`:

```ts title="src/hooks.ts"
import { cacheControl } from "../ecosystem/hooks/cache/cache";

export const beforeRoute = [
  cacheControl({ directive: "public", maxAge: 300, sMaxAge: 3600, etag: true }),
];
```

- `directive`: `"public"`, `"private"`, `"no-cache"`, `"no-store"` or `"must-revalidate"`. Default `"no-cache"`.
- `maxAge`: browser cache time in seconds.
- `sMaxAge`: CDN cache time in seconds.
- `etag`: add an `ETag` and answer `304` when it matches. Default `false`.
- `vary`: header names to add to `Vary`.

The full list is in `ecosystem/hooks/cache/README.md`.

Set cache headers in one place: global or per route, not both.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [Global Hooks](/docs/hooks/global)
