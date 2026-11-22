---
sidebar_label: Cache
---

# Cache Hook

The cache hook sets `Cache-Control` headers so browsers, CDNs, and proxies know how long they may keep a response. Use it when you want to cache public data, or to turn caching off for private responses.

## Install

```bash
burger-api add cache
```

## Usage

The hook returns a response transform, so compose it in `beforeRoute`. The mapper runs right after the handler returns:

```ts title="src/hooks.ts"
import { publicCache } from "../ecosystem/hooks/cache/cache";

export const beforeRoute = [publicCache(3600)];
```

`publicCache(3600)` sends `Cache-Control: public, max-age=3600`.

The package also ships presets: `noCache()`, `publicCache(maxAge = 3600)`, `privateCache(maxAge = 300)`, `immutableCache()`, and `cdnCache(browserMaxAge = 300, cdnMaxAge = 3600)`.

For full control, use `cacheControl()`:

```ts title="src/hooks.ts"
import { cacheControl } from "../ecosystem/hooks/cache/cache";

export const beforeRoute = [
  cacheControl({
    directive: "public",
    maxAge: 300,
    sMaxAge: 3600,
    mustRevalidate: true,
    vary: ["Accept-Encoding", "Accept"],
  }),
];
```

## Options

- `directive`: `"public"`, `"private"`, `"no-cache"`, `"no-store"`, or `"must-revalidate"`. Default `"no-cache"`.
- `maxAge`: browser cache lifetime in seconds. Default none.
- `sMaxAge`: shared cache (CDN) lifetime in seconds. Default none.
- `mustRevalidate`: add `must-revalidate`. Default `false`.
- `proxyRevalidate`: add `proxy-revalidate`. Default `false`.
- `immutable`: add `immutable`. Default `false`.
- `noTransform`: add `no-transform`. Default `false`.
- `custom`: a full `Cache-Control` value. Overrides every other option above.
- `etag`: compute an `ETag` and answer conditional requests with `304`. Default `false`.
- `vary`: one header name or an array, appended to `Vary`. Default none.

## Good to know

- The hook only writes headers. It does not store responses; a browser or CDN does the caching.
- `etag: true` applies only to `200` responses to `GET` and `HEAD`. The tag is a hash of the response bytes, a handler-set `ETag` is kept, and `If-None-Match` uses weak comparison (`W/` is ignored, `*` matches anything).
- `vary` appends to the existing header instead of replacing it, so tokens set by other hooks survive. Duplicates are dropped case-insensitively and `Vary: *` is left alone.
- A route-level `beforeRoute` mapper runs before a global one, so with both in place the global hook sets the final `Cache-Control`. Pick one place for cache headers.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [Global Hooks](/docs/hooks/global)
